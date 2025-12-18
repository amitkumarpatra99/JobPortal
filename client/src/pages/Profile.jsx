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
        profilePhoto: '',
        bio: '',
        skills: [],
        experience: [],
        education: []
    });
    const [skillsInput, setSkillsInput] = useState('');
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

                const res = await api.get('/users/profile');
                setUser({
                    ...res.data,
                    experience: res.data.experience || [],
                    education: res.data.education || []
                });
                setSkillsInput(res.data.skills ? res.data.skills.join(', ') : '');
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

    const handleExperienceChange = (index, field, value) => {
        const newExperience = [...user.experience];
        newExperience[index][field] = value;
        setUser({ ...user, experience: newExperience });
    };

    const addExperience = () => {
        setUser({
            ...user,
            experience: [...user.experience, { title: '', company: '', from: '', to: '', current: false, description: '' }]
        });
    };

    const removeExperience = (index) => {
        const newExperience = user.experience.filter((_, i) => i !== index);
        setUser({ ...user, experience: newExperience });
    };

    const handleEducationChange = (index, field, value) => {
        const newEducation = [...user.education];
        newEducation[index][field] = value;
        setUser({ ...user, education: newEducation });
    };

    const addEducation = () => {
        setUser({
            ...user,
            education: [...user.education, { school: '', degree: '', fieldOfStudy: '', from: '', to: '', current: false }]
        });
    };

    const removeEducation = (index) => {
        const newEducation = user.education.filter((_, i) => i !== index);
        setUser({ ...user, education: newEducation });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', user.name);
            formData.append('email', user.email);
            formData.append('bio', user.bio || '');

            // Handle Skills
            const skillsArray = skillsInput.split(',').map(skill => skill.trim()).filter(skill => skill !== '');
            skillsArray.forEach(skill => formData.append('skills', skill));

            // Handle Complex Arrays (Serialize as JSON)
            formData.append('experience', JSON.stringify(user.experience));
            formData.append('education', JSON.stringify(user.education));

            if (file) {
                formData.append('profilePhoto', file);
            }

            const res = await api.put('/users/profile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setUser(res.data);
            setSkillsInput(res.data.skills ? res.data.skills.join(', ') : '');
            alert('Profile Updated Successfully!');
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Error updating profile';
            alert(errorMessage);
        }
    };

    if (loading) return <div>Loading...</div>;

    const getImageUrl = (path) => {
        if (!path) return 'https://via.placeholder.com/150';
        if (path.startsWith('http')) return path;
        const baseUrl = api.defaults.baseURL.replace('/api', '');
        return `${baseUrl}/${path}`;
    };

    const photoUrl = preview || getImageUrl(user.profilePhoto);

    return (
        <div className="min-h-screen bg-gray-900 font-sans text-gray-100 selection:bg-blue-500/30">
            <Navbar />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24">
                <div className="glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl bg-black/40 backdrop-blur-xl">
                    <h1 className="text-3xl font-extrabold text-white mb-8 border-b border-white/10 pb-4">Profile Settings</h1>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Photo Section */}
                        <div className="flex flex-col items-center gap-4 md:w-1/4">
                            <div className="w-40 h-40 rounded-full border-4 border-white/10 shadow-lg overflow-hidden relative group">
                                <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <span className="text-white font-medium text-sm">Change</span>
                                </div>
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={onFileChange} accept="image/*" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-white">{user.name}</h3>
                                <p className="text-sm text-blue-400 font-medium uppercase tracking-wide">{user.role}</p>
                            </div>
                        </div>

                        {/* Form Section */}
                        <form className="flex-grow w-full md:w-3/4 space-y-8" onSubmit={onSubmit}>

                            {/* Basic Info */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-white border-l-4 border-blue-500 pl-3">Basic Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                                        <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} className="input-field w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                                        <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="input-field w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-blue-500" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Bio</label>
                                    <textarea value={user.bio} onChange={(e) => setUser({ ...user, bio: e.target.value })} rows="3" className="input-field w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-blue-500" placeholder="Tell us about yourself..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Skills (comma separated)</label>
                                    <input type="text" value={skillsInput} onChange={(e) => setSkillsInput(e.target.value)} className="input-field w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-blue-500" placeholder="JavaScript, React, Node.js" />
                                </div>
                            </div>

                            {/* Experience Section */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-l-4 border-blue-500 pl-3">
                                    <h3 className="text-xl font-semibold text-white">Experience</h3>
                                    <button type="button" onClick={addExperience} className="text-sm bg-blue-600/20 text-blue-400 px-3 py-1 rounded-lg hover:bg-blue-600/40 transition">+ Add</button>
                                </div>
                                {user.experience.map((exp, index) => (
                                    <div key={index} className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3 relative group">
                                        <button type="button" onClick={() => removeExperience(index)} className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-300">✕</button>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input type="text" placeholder="Title" value={exp.title} onChange={(e) => handleExperienceChange(index, 'title', e.target.value)} className="bg-transparent border-b border-white/20 px-2 py-1 text-white focus:border-blue-500 outline-none" />
                                            <input type="text" placeholder="Company" value={exp.company} onChange={(e) => handleExperienceChange(index, 'company', e.target.value)} className="bg-transparent border-b border-white/20 px-2 py-1 text-white focus:border-blue-500 outline-none" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <input type="date" value={exp.from ? exp.from.split('T')[0] : ''} onChange={(e) => handleExperienceChange(index, 'from', e.target.value)} className="bg-white/5 rounded px-2 py-1 text-gray-300" />
                                            <div className="flex items-center gap-2">
                                                <input type="checkbox" checked={exp.current} onChange={(e) => handleExperienceChange(index, 'current', e.target.checked)} />
                                                <span className="text-gray-400">Current</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Education Section */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-l-4 border-blue-500 pl-3">
                                    <h3 className="text-xl font-semibold text-white">Education</h3>
                                    <button type="button" onClick={addEducation} className="text-sm bg-blue-600/20 text-blue-400 px-3 py-1 rounded-lg hover:bg-blue-600/40 transition">+ Add</button>
                                </div>
                                {user.education.map((edu, index) => (
                                    <div key={index} className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3 relative group">
                                        <button type="button" onClick={() => removeEducation(index)} className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-300">✕</button>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input type="text" placeholder="School" value={edu.school} onChange={(e) => handleEducationChange(index, 'school', e.target.value)} className="bg-transparent border-b border-white/20 px-2 py-1 text-white focus:border-blue-500 outline-none" />
                                            <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => handleEducationChange(index, 'degree', e.target.value)} className="bg-transparent border-b border-white/20 px-2 py-1 text-white focus:border-blue-500 outline-none" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <input type="date" value={edu.from ? edu.from.split('T')[0] : ''} onChange={(e) => handleEducationChange(index, 'from', e.target.value)} className="bg-white/5 rounded px-2 py-1 text-gray-300" />
                                            <div className="flex items-center gap-2">
                                                <input type="checkbox" checked={edu.current} onChange={(e) => handleEducationChange(index, 'current', e.target.checked)} />
                                                <span className="text-gray-400">Current</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6 border-t border-white/10">
                                <button type="submit" className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 hover:from-blue-500 hover:to-indigo-500 transition-all transform hover:scale-105">
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
