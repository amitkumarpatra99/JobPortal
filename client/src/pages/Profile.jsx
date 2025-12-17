import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        email: '',
        role: '',
        profilePhoto: ''
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const res = await api.get('/users/profile', {
                    headers: { 'x-auth-token': token }
                });

                setUser(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                if (err.response && err.response.status === 401) {
                    navigate('/login');
                }
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('name', user.name);
            formData.append('email', user.email);
            if (file) {
                formData.append('profilePhoto', file);
            }

            const res = await api.put('/users/profile', formData, {
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setUser(res.data);
            alert('Profile Updated Successfully!');
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Error updating profile';
            alert(errorMessage);
        }
    };

    if (loading) return <div>Loading...</div>;

    // Helper to get full image URL (handles relative paths from server)
    const getImageUrl = (path) => {
        if (!path) return 'https://via.placeholder.com/150';
        if (path.startsWith('http')) return path;
        // Use api.defaults.baseURL to resolve relative path, stripping '/api'
        const baseUrl = api.defaults.baseURL.replace('/api', '');
        return `${baseUrl}/${path}`;
    };

    const photoUrl = preview || getImageUrl(user.profilePhoto);

    return (
        <div className="min-h-screen bg-gray-900 font-sans text-gray-100 selection:bg-blue-500/30">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24">
                <div className="glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl bg-black/40 backdrop-blur-xl">
                    <h1 className="text-3xl font-extrabold text-white mb-8 border-b border-white/10 pb-4">Profile Settings</h1>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Photo Section */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-40 h-40 rounded-full border-4 border-white/10 shadow-lg overflow-hidden relative group">
                                <img
                                    src={photoUrl}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <span className="text-white font-medium text-sm">Change</span>
                                </div>
                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={onFileChange}
                                    accept="image/*"
                                />
                            </div>
                            <p className="text-xs text-gray-400">Click image to update</p>
                        </div>

                        {/* Form Section */}
                        <form className="flex-grow w-full space-y-6" onSubmit={onSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={user.name}
                                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Role</label>
                                <div className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 font-medium cursor-not-allowed">
                                    {user.role === 'seeker' ? 'Job Seeker' : 'Employer'}
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 hover:from-blue-500 hover:to-indigo-500 transition-all transform hover:scale-105"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
