import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const EditJob = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        description: '',
        salary: '',
        type: 'Full-time',
    });

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await api.get('/jobs'); // Ideally should handle single job fetching, but filtering local for now if API doesn't support get-one
                // Wait, getJobs returns all. I should rely on getJobs or add getJobById. 
                // Currently API only has getJobs (all). Let's filter client side or add getJobById if strictly needed.
                // Re-checking jobs.js... it only has getJobs (all).
                // I'll filter from all jobs for now to save backend work, or add getJobById.
                // Ideally I should add getJobById. But let's check if the list is small enough.
                // Actually, I can just add GET /api/jobs/:id to backend.
                // Let's assume I can filter from the list for now to be fast, but wait, `getJobs` is /api/jobs
                // It's cleaner to just fetch all and find one, or update backend.
                // Let's update backend to support GET /:id as well?
                // The current specific request from user didn't ask for "View Job Details" but "Edit Job".
                // I will fetch all and find the one matching ID.
                const job = res.data.find(j => j._id === id);
                if (job) {
                    setFormData({
                        title: job.title,
                        company: job.company,
                        location: job.location,
                        description: job.description,
                        salary: job.salary,
                        type: job.type,
                    });
                } else {
                    alert('Job not found');
                    navigate('/jobs');
                }
                setLoading(false);
            } catch (err) {
                console.error(err);
                alert('Error fetching job details');
                navigate('/jobs');
            }
        };
        fetchJob();
    }, [id, navigate]);

    const { title, company, location, description, salary, type } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            };

            await api.put(`/jobs/${id}`, formData, config);
            alert('Job Updated Successfully!');
            navigate('/jobs');

        } catch (err) {
            console.error('Error updating job:', err.response?.data || err.message);
            alert('Failed to update job: ' + (err.response?.data?.message || 'Server Error'));
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-900 font-sans text-gray-100 selection:bg-blue-500/30">
            <Navbar />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24">
                <div className="glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl bg-black/40 backdrop-blur-xl">
                    <div className="mb-8 border-b border-white/10 pb-4">
                        <h1 className="text-2xl font-extrabold text-white">Edit Job</h1>
                    </div>

                    <form className="space-y-6" onSubmit={onSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Job Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={title}
                                    onChange={onChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Company Name</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={company}
                                    onChange={onChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={location}
                                    onChange={onChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Salary Range</label>
                                <input
                                    type="text"
                                    name="salary"
                                    value={salary}
                                    onChange={onChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Job Type</label>
                            <select
                                name="type"
                                value={type}
                                onChange={onChange}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all font-medium bg-gray-900"
                            >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Remote">Remote</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Job Description</label>
                            <textarea
                                name="description"
                                value={description}
                                onChange={onChange}
                                required
                                rows="5"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all font-medium resize-none"
                            ></textarea>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 hover:from-blue-500 hover:to-indigo-500 transition-all transform hover:scale-105"
                            >
                                Update Job
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditJob;
