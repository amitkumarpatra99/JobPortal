import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        description: '',
        salary: '',
        type: 'Full-time',
    });

    const { title, company, location, description, salary, type } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please login to post a job');
                navigate('/login');
                return;
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            };

            await axios.post('http://localhost:5000/api/jobs', formData, config);
            alert('Job Posted Successfully!');
            navigate('/jobs');

        } catch (err) {
            console.error('Error posting job:', err.response?.data || err.message);
            alert('Failed to post job: ' + (err.response?.data?.message || 'Server Error'));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                    <div className="mb-8 border-b border-gray-100 pb-4">
                        <h1 className="text-2xl font-extrabold text-gray-900">Post a New Job</h1>
                        <p className="text-gray-500 mt-1">Reach thousands of job seekers</p>
                    </div>

                    <form className="space-y-6" onSubmit={onSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={title}
                                    onChange={onChange}
                                    required
                                    placeholder="e.g. Senior React Developer"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={company}
                                    onChange={onChange}
                                    required
                                    placeholder="e.g. Acme Corp"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={location}
                                    onChange={onChange}
                                    required
                                    placeholder="e.g. San Francisco, CA (or Remote)"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                                <input
                                    type="text"
                                    name="salary"
                                    value={salary}
                                    onChange={onChange}
                                    required
                                    placeholder="e.g. $100k - $140k"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                            <select
                                name="type"
                                value={type}
                                onChange={onChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                            >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Remote">Remote</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                            <textarea
                                name="description"
                                value={description}
                                onChange={onChange}
                                required
                                rows="5"
                                placeholder="Describe the role, responsibilities, and requirements..."
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                            ></textarea>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Publish Job
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostJob;
