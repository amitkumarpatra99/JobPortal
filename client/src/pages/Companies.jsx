import React from 'react';
import Navbar from '../components/Navbar';
import { Building2, MapPin, Users } from 'lucide-react';

const companies = [
    {
        id: 1,
        name: "TechNova",
        logo: "https://via.placeholder.com/100/3B82F6/FFFFFF?text=TN",
        description: "Leading the way in AI and machine learning solutions for enterprise.",
        location: "San Francisco, CA",
        employees: "1,000-5,000",
        openpositions: 12
    },
    {
        id: 2,
        name: "GreenEnergy Co",
        logo: "https://via.placeholder.com/100/10B981/FFFFFF?text=GE",
        description: "Sustainable energy solutions for a better tomorrow.",
        location: "Austin, TX",
        employees: "500-1,000",
        openpositions: 5
    },
    {
        id: 3,
        name: "Quantum Finance",
        logo: "https://via.placeholder.com/100/6366F1/FFFFFF?text=QF",
        description: "Next-generation financial technology and blockchain infrastructure.",
        location: "New York, NY",
        employees: "200-500",
        openpositions: 8
    },
    {
        id: 4,
        name: "Pixel Studios",
        logo: "https://via.placeholder.com/100/EC4899/FFFFFF?text=PS",
        description: "Award-winning creative agency specializing in digital experiences.",
        location: "London, UK",
        employees: "50-200",
        openpositions: 3
    },
    {
        id: 5,
        name: "HealthConnect",
        logo: "https://via.placeholder.com/100/EF4444/FFFFFF?text=HC",
        description: "Connecting patients with healthcare providers seamlessly.",
        location: "Remote",
        employees: "100-500",
        openpositions: 15
    },
    {
        id: 6,
        name: "CloudScale",
        logo: "https://via.placeholder.com/100/8B5CF6/FFFFFF?text=CS",
        description: "Scalable cloud infrastructure for high-growth startups.",
        location: "Seattle, WA",
        employees: "5,000+",
        openpositions: 42
    }
];

const Companies = () => {
    return (
        <div className="min-h-screen bg-gray-900 font-sans text-gray-100 selection:bg-blue-500/30">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-white mb-4 drop-shadow-md">Top Companies Hiring Now</h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">Discover company cultures, salaries, and benefits before you apply.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {companies.map((company) => (
                        <div key={company.id} className="glass-panel text-left p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/50 transition-all group flex flex-col h-full">
                            <div className="flex items-center gap-4 mb-4">
                                <img src={company.logo} alt={company.name} className="w-16 h-16 rounded-xl shadow-lg" />
                                <div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{company.name}</h3>
                                    <span className="text-sm font-medium text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-md border border-blue-400/20">{company.openpositions} Open Jobs</span>
                                </div>
                            </div>

                            <p className="text-gray-400 text-sm mb-6 flex-grow">{company.description}</p>

                            <div className="flex items-center gap-4 text-xs text-gray-500 font-medium mb-6">
                                <span className="flex items-center gap-1"><MapPin size={14} /> {company.location}</span>
                                <span className="flex items-center gap-1"><Users size={14} /> {company.employees}</span>
                            </div>

                            <button className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-500 text-white font-semibold transition-all shadow-lg">
                                View Profile
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Companies;
