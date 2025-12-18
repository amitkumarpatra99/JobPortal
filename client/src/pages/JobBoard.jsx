import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';
import { Link } from 'react-router-dom';

const JobBoard = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [jobType, setJobType] = useState('');

    const fetchJobs = async (search = '', type = '') => {
        setLoading(true);
        try {
            const res = await api.get('/jobs', {
                params: { search, type }
            });
            setJobs(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching jobs:', err);
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const res = await api.get('/users/profile');
                    setUser(res.data);
                }
            } catch (err) {
                console.error('Error fetching user:', err);
            }
        };

        fetchJobs();
        fetchUser();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchJobs(searchQuery, jobType);
    };

    const [applyingJobId, setApplyingJobId] = useState(null);
    const fileInputRef = React.useRef(null);

    const handleApplyClick = (jobId) => {
        setApplyingJobId(jobId);
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('resume', file);

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'multipart/form-data'
                }
            };
            await api.post(`/jobs/${applyingJobId}/apply`, formData, config);
            alert('Applied successfully with resume!');
        } catch (err) {
            alert(err.response?.data?.message || 'Error applying for job');
        } finally {
            setApplyingJobId(null);
            e.target.value = null; // Reset input
        }
    };

    const handleDelete = async (jobId) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            try {
                await api.delete(`/jobs/${jobId}`);
                setJobs(jobs.filter(job => job._id !== jobId));
                alert('Job deleted');
            } catch (err) {
                alert(err.response?.data?.message || 'Error deleting job');
            }
        }
    };

    return (
        <div className="min-h-screen font-sans text-gray-100">
            <Navbar />
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <h1 className="text-3xl font-extrabold text-white drop-shadow-md">Latest Job Openings</h1>

                    {/* Search Controls */}
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                        <select
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500"
                        >
                            <option value="">All Types</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Remote">Remote</option>
                        </select>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search jobs..."
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500 w-full"
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {jobs.length > 0 ? (
                            jobs.map((job) => (
                                <div key={job._id} className="glass-panel bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 transition-all hover:bg-white/10 flex flex-col h-full group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-blue-400 transition-colors">{job.title}</h3>
                                            <p className="text-sm text-gray-400 font-medium">{job.company}</p>
                                        </div>
                                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full border border-blue-500/30">
                                            {job.type}
                                        </span>
                                    </div>

                                    <div className="mb-4 flex-grow">
                                        <p className="text-gray-400 text-sm line-clamp-3 mb-3">
                                            {job.description}
                                        </p>
                                        <div className="flex items-center text-sm text-gray-500 gap-4">
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                                {job.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                {job.salary}
                                            </span>
                                        </div>
                                    </div>

                                    {user && user.role === 'seeker' && (
                                        <button
                                            onClick={() => handleApplyClick(job._id)}
                                            className="w-full mt-auto py-2.5 bg-white/5 border border-white/10 text-white font-medium rounded-lg hover:bg-blue-600 hover:border-blue-500 transition-all text-sm"
                                        >
                                            Upload Resume & Apply
                                        </button>
                                    )}

                                    {user && user.role === 'employer' && user._id === job.postedBy && (
                                        <div className="flex gap-2 mt-auto">
                                            <Link
                                                to={`/edit-job/${job._id}`}
                                                className="flex-1 py-2.5 bg-yellow-500/10 border border-yellow-500/20 text-center text-yellow-500 font-medium rounded-lg hover:bg-yellow-500/20 transition-all text-sm"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(job._id)}
                                                className="flex-1 py-2.5 bg-red-500/10 border border-red-500/20 text-red-500 font-medium rounded-lg hover:bg-red-500/20 transition-all text-sm"
                                            >
                                                Delete
                                            </button>
                                            <Link
                                                to={`/jobs/${job._id}/applicants`}
                                                className="flex-1 py-2.5 bg-blue-500/10 border border-blue-500/20 text-center text-blue-400 font-medium rounded-lg hover:bg-blue-500/20 transition-all text-sm"
                                            >
                                                Applicants
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                                <p className="text-gray-400 text-lg">No jobs found. Be the first to post one!</p>
                                <Link to="/post-job" className="mt-4 inline-block text-blue-400 font-medium hover:text-blue-300 hover:underline">Post a Job</Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobBoard;
