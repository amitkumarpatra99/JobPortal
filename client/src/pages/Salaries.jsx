import React from 'react';
import Navbar from '../components/Navbar';
import { Search, TrendingUp, DollarSign, MapPin } from 'lucide-react';

const popularSalaries = [
    { id: 1, role: "Software Engineer", salary: "$120,000 - $180,000", change: "+12%" },
    { id: 2, role: "Product Manager", salary: "$110,000 - $170,000", change: "+8%" },
    { id: 3, role: "Data Scientist", salary: "$130,000 - $190,000", change: "+15%" },
    { id: 4, role: "UI/UX Designer", salary: "$90,000 - $140,000", change: "+5%" },
    { id: 5, role: "DevOps Engineer", salary: "$125,000 - $185,000", change: "+10%" },
    { id: 6, role: "Marketing Manager", salary: "$85,000 - $135,000", change: "+6%" },
];

const Salaries = () => {
    return (
        <div className="min-h-screen bg-gray-900 font-sans text-gray-100 selection:bg-blue-500/30">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24">

                {/* Header & Search */}
                <div className="text-center mb-16 relative">
                    {/* Background Glows */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-500/20 rounded-full blur-[100px] -z-10"></div>

                    <h1 className="text-4xl font-extrabold text-white mb-4 drop-shadow-md">Are you paid fairly?</h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">Get detailed salary insights by job title and location.</p>

                    <div className="max-w-2xl mx-auto glass-panel p-2 rounded-2xl border border-white/10 flex items-center bg-black/40">
                        <div className="flex-1 flex items-center px-4 h-12 border-r border-white/10">
                            <Search className="text-gray-500 w-5 h-5 mr-3" />
                            <input
                                type="text"
                                placeholder="Job Title"
                                className="bg-transparent w-full text-white placeholder-gray-500 focus:outline-none"
                            />
                        </div>
                        <div className="flex-1 flex items-center px-4 h-12">
                            <MapPin className="text-gray-500 w-5 h-5 mr-3" />
                            <input
                                type="text"
                                placeholder="Location"
                                className="bg-transparent w-full text-white placeholder-gray-500 focus:outline-none"
                            />
                        </div>
                        <button className="h-12 px-8 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20">
                            Search
                        </button>
                    </div>
                </div>

                {/* Popular Salaries Grid */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <TrendingUp className="text-blue-400" /> Trending Salaries
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {popularSalaries.map((item) => (
                            <div key={item.id} className="glass-panel p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/50 transition-all cursor-pointer group">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{item.role}</h3>
                                    <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-1 rounded-full border border-green-400/20">{item.change}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300">
                                    <DollarSign className="w-5 h-5 text-gray-500" />
                                    <span className="text-xl font-medium">{item.salary}</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-4">Average base salary per year</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Salaries;
