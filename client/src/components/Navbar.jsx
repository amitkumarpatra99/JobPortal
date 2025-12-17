import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center cursor-pointer">
                        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            JobFlow
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/jobs" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                            Find Jobs
                        </Link>
                        <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                            Companies
                        </Link>
                        <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                            Salaries
                        </Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            to="/login"
                            className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/post-job"
                            className="px-5 py-2.5 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                        >
                            Post a Job
                        </Link>
                    </div>

                    {/* Mobile menu button (Placeholder) */}
                    <div className="md:hidden flex items-center">
                        <button className="text-gray-600 hover:text-blue-600 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
