import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, AlertCircle, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/jobs`);
            setJobs(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch jobs');
            setLoading(false);
        }
    };

    const handleDelete = async (jobId) => {
        if (!window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            };

            await axios.delete(`${import.meta.env.VITE_API_URL}/jobs/${jobId}`, config);
            setSuccessMessage('Job deleted successfully');
            setJobs(jobs.filter(job => job._id !== jobId));

            // Clear success message after 3 seconds
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to delete job');
            setTimeout(() => setError(''), 3000);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                    Admin Dashboard
                </h1>

                {error && (
                    <div className="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-lg flex items-center gap-2 text-red-200">
                        <AlertCircle size={20} />
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="mb-4 p-4 bg-green-500/20 border border-green-500 rounded-lg flex items-center gap-2 text-green-200">
                        <CheckCircle size={20} />
                        {successMessage}
                    </div>
                )}

                <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700/50 overflow-hidden">
                    <div className="p-6 border-b border-slate-700/50">
                        <h2 className="text-xl font-semibold">All Posted Jobs ({jobs.length})</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-800 text-slate-400 text-sm uppercase tracking-wider">
                                    <th className="p-4 border-b border-slate-700">Title</th>
                                    <th className="p-4 border-b border-slate-700">Company</th>
                                    <th className="p-4 border-b border-slate-700">Posted By</th>
                                    <th className="p-4 border-b border-slate-700">Date</th>
                                    <th className="p-4 border-b border-slate-700 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {jobs.map((job) => (
                                    <tr key={job._id} className="hover:bg-slate-700/30 transition-colors">
                                        <td className="p-4 font-medium text-white">{job.title}</td>
                                        <td className="p-4 text-slate-300">{job.company}</td>
                                        <td className="p-4 text-slate-400 text-sm">
                                            {job.postedBy ? job.postedBy.name : 'Unknown'}
                                        </td>
                                        <td className="p-4 text-slate-400 text-sm">
                                            {new Date(job.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() => handleDelete(job._id)}
                                                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                                                title="Delete Job"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {jobs.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-slate-400">
                                            No jobs found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
