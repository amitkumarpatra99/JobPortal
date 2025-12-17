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
            alert('Error updating profile');
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
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-32 md:h-48"></div>
                    <div className="px-8 pb-8">
                        <div className="relative flex justify-between items-end -mt-12 mb-6">
                            <div className="relative">
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg">
                                    <img
                                        src={photoUrl}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <label htmlFor="photo-upload" className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-50 transition-colors text-gray-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    <input
                                        id="photo-upload"
                                        type="file"
                                        className="hidden"
                                        onChange={onFileChange}
                                        accept="image/*"
                                    />
                                </label>
                            </div>
                            <div className="mb-2 hidden md:block">
                                <span className="px-4 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold capitalize inline-block">
                                    {user.role} Account
                                </span>
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-1">{user.name}</h1>
                        <p className="text-gray-500 mb-8">{user.email}</p>

                        <form onSubmit={onSubmit} className="space-y-6 max-w-lg">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={user.name}
                                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
