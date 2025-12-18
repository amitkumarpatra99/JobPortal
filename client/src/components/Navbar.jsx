import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    Menu,
    X,
    User,
    LogOut,
    Briefcase,
    Building2,
    IndianRupee
} from "lucide-react";
import api from '../services/api';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setProfileOpen(false);
        setMenuOpen(false);
        navigate('/login');
    };

    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        const baseUrl = api.defaults.baseURL.replace('/api', '');
        return `${baseUrl}/${path}`;
    };

    const navItem =
        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300";
    const navActive =
        "bg-white/10 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-white/10 checkbox-glow";
    const navInactive =
        "text-gray-400 hover:text-white hover:bg-white/5";

    return (
        <header className="fixed top-4 inset-x-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <nav className="flex items-center justify-between rounded-2xl glass-panel px-6 h-16 border border-white/10 bg-black/20 backdrop-blur-xl">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg"
                    >
                        JobFlow
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-2 bg-black/20 p-1 rounded-full border border-white/5">
                        <NavLink
                            to="/jobs"
                            className={({ isActive }) =>
                                `${navItem} ${isActive ? navActive : navInactive}`
                            }
                        >
                            <span className="flex items-center gap-1">
                                <Briefcase size={16} /> Jobs
                            </span>
                        </NavLink>

                        <NavLink
                            to="/companies"
                            className={({ isActive }) =>
                                `${navItem} ${isActive ? navActive : navInactive}`
                            }
                        >
                            <span className="flex items-center gap-1">
                                <Building2 size={16} /> Companies
                            </span>
                        </NavLink>

                        <NavLink
                            to="/salaries"
                            className={({ isActive }) =>
                                `${navItem} ${isActive ? navActive : navInactive}`
                            }
                        >
                            <span className="flex items-center gap-1">
                                <IndianRupee size={16} /> Salaries
                            </span>
                        </NavLink>
                    </div>

                    {/* Right Section */}
                    <div className="hidden md:flex items-center gap-4 relative">
                        <Link
                            to="/post-job"
                            className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all duration-300 border border-white/10"
                        >
                            Post Job
                        </Link>

                        {/* Profile Dropdown or Login Button */}
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold flex items-center justify-center shadow-lg border border-white/20 hover:scale-105 transition-transform overflow-hidden"
                                >
                                    {user.profilePhoto ? (
                                        <img
                                            src={getImageUrl(user.profilePhoto)}
                                            alt={user.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                        />
                                    ) : (
                                        <span>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
                                    )}
                                    {/* Fallback for image error (hidden by default unless error occurs) */}
                                    <span className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
                                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </span>
                                </button>

                                {profileOpen && (
                                    <div className="absolute right-0 top-14 w-48 rounded-xl bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="px-4 py-3 border-b border-white/10">
                                            <p className="text-sm font-medium text-white truncate">{user.name}</p>
                                            <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                        </div>
                                        <Link
                                            to="/profile"
                                            className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                                            onClick={() => setProfileOpen(false)}
                                        >
                                            <User size={16} /> Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-left"
                                        >
                                            <LogOut size={16} /> Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="px-5 py-2 rounded-full border border-white/10 text-white font-semibold hover:bg-white/5 transition-all duration-300"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-gray-300 hover:text-white transition-colors"
                    >
                        {menuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </nav>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden mt-3 mx-4 rounded-2xl bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden animate-in slide-in-from-top-4 duration-300">
                    <div className="flex flex-col p-4 gap-2">
                        <NavLink to="/jobs" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                            Find Jobs
                        </NavLink>
                        <NavLink to="/companies" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                            Companies
                        </NavLink>
                        <NavLink to="/salaries" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                            Salaries
                        </NavLink>

                        <div className="h-px bg-white/10 my-2" />

                        {user ? (
                            <>
                                <Link to="/profile" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2">
                                    <User size={18} /> Profile
                                </Link>
                                <button onClick={handleLogout} className="w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors flex items-center gap-2 text-left">
                                    <LogOut size={18} /> Sign Out
                                </button>
                            </>
                        ) : (
                            <Link to="/login" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                                Sign In
                            </Link>
                        )}
                        <Link
                            to="/post-job"
                            onClick={() => setMenuOpen(false)}
                            className="mt-2 px-4 py-3 rounded-xl bg-blue-600 text-white text-center font-semibold hover:bg-blue-500 transition-colors shadow-lg"
                        >
                            Post Job
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
