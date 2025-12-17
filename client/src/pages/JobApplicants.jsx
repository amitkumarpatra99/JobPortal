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
                                            <th className="px-6 py-3">Applied At</th>
                                            <th className="px-6 py-3">Status</th>
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
                                                <td className="px-6 py-4">{new Date(app.appliedAt).toLocaleDateString()}</td>
                                                <td className="px-6 py-4 capitalize">{app.status}</td>
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
