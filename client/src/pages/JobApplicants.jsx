import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../services/api';

const JobApplicants = () => {
    const { id } = useParams();
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const res = await api.get(`/jobs/${id}/applicants`);
                setApplicants(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching applicants:', err);
                setLoading(false);
            }
        };

        fetchApplicants();
    }, [id]);

    const getResumeUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        const baseUrl = api.defaults.baseURL.replace('/api', '');
        return `${baseUrl}/${path}`;
    };

    const handleStatusUpdate = async (appId, newStatus) => {
        try {
            await api.put(`/jobs/applications/${appId}/status`, { status: newStatus });
            setApplicants(applicants.map(app =>
                app._id === appId ? { ...app, status: newStatus } : app
            ));
            alert(`Application ${newStatus}`);
        } catch (err) {
            alert(err.response?.data?.message || 'Error updating status');
        }
    };

    return (
        <div className="min-h-screen font-sans text-gray-100 bg-gray-900">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24">
                <h1 className="text-3xl font-extrabold text-white mb-8 drop-shadow-md">Job Applicants</h1>

                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="glass-panel bg-white/5 rounded-2xl p-6 border border-white/10">
                        {applicants.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-gray-300">
                                    <thead className="text-xs uppercase bg-white/5 text-gray-400">
                                        <tr>
                                            <th className="px-6 py-3">Applicant</th>
                                            <th className="px-6 py-3">Email</th>
                                            <th className="px-6 py-3">Resume</th>
                                            <th className="px-6 py-3">Applied At</th>
                                            <th className="px-6 py-3">Status</th>
                                            <th className="px-6 py-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {applicants.map((app) => (
                                            <tr key={app._id} className="border-b border-white/10 hover:bg-white/5">
                                                <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
                                                        {app.applicant.profilePhoto ? (
                                                            <img src={app.applicant.profilePhoto} alt="" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-xs">
                                                                {app.applicant.name.charAt(0)}
                                                            </div>
                                                        )}
                                                    </div>
                                                    {app.applicant.name}
                                                </td>
                                                <td className="px-6 py-4">{app.applicant.email}</td>
                                                <td className="px-6 py-4">
                                                    {app.resume ? (
                                                        <a
                                                            href={getResumeUrl(app.resume)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-400 hover:underline"
                                                        >
                                                            View Resume
                                                        </a>
                                                    ) : (
                                                        <span className="text-gray-500">N/A</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">{new Date(app.appliedAt).toLocaleDateString()}</td>
                                                <td className="px-6 py-4 capitalize">
                                                    <span className={`px-2 py-1 rounded text-xs font-semibold
                                                        ${app.status === 'accepted' ? 'bg-green-500/20 text-green-300' :
                                                            app.status === 'rejected' ? 'bg-red-500/20 text-red-300' :
                                                                'bg-blue-500/20 text-blue-300'}`}>
                                                        {app.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 flex gap-2">
                                                    <button
                                                        onClick={() => handleStatusUpdate(app._id, 'accepted')}
                                                        className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded hover:bg-green-500/20 text-xs"
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(app._id, 'rejected')}
                                                        className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded hover:bg-red-500/20 text-xs"
                                                    >
                                                        Reject
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-400 text-center py-8">No applicants yet.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobApplicants;
