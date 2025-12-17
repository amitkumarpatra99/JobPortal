import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';
import { Link } from 'react-router-dom';

const JobBoard = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await api.get('/jobs');
                setJobs(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching jobs:', err);
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Latest Job Openings</h1>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {jobs.length > 0 ? (
                            jobs.map((job) => (
                                <div key={job._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{job.title}</h3>
                                            <p className="text-sm text-gray-500 font-medium">{job.company}</p>
                                        </div>
                                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100">
                                            {job.type}
                                        </span>
                                    </div>

                                    <div className="mb-4 flex-grow">
                                        <p className="text-gray-600 text-sm line-clamp-3 mb-3">
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

                                    <button className="w-full mt-auto py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors text-sm">
                                        Apply Now
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <p className="text-gray-500 text-lg">No jobs found. Be the first to post one!</p>
                                <Link to="/post-job" className="mt-4 inline-block text-blue-600 font-medium hover:underline">Post a Job</Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobBoard;
