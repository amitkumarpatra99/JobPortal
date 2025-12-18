import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../services/api';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'seeker', // Default role
    });

    const { name, email, password, confirmPassword, role } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const body = { name, email, password, role };
            const res = await api.post('/auth/register', body);

            console.log('Register Success', res.data);
            localStorage.setItem('token', res.data.token);
            navigate('/profile');
        } catch (err) {
            console.error('Register Error', err);
            const msg = err.response?.data?.message || 'Registration Failed. Please try again.';
            alert(msg);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 font-sans text-gray-100 flex flex-col relative overflow-hidden">
            <Navbar />

            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
            </div>

            <div className="flex-grow flex items-center justify-center pt-20 px-4 py-12">
                <div className="max-w-md w-full glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl relative z-10 backdrop-blur-xl bg-black/40">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-extrabold text-white mb-2">Create Account</h1>
                        <p className="text-gray-400">Join thousands of professionals</p>
                    </div>

                    <form className="space-y-5" onSubmit={onSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={onChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all font-medium"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all font-medium"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all font-medium"
                                placeholder="••••••••"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={onChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all font-medium"
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">I am a...</label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className={`cursor-pointer text-center p-3 rounded-xl border transition-all ${role === 'seeker' ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="seeker"
                                        checked={role === 'seeker'}
                                        onChange={onChange}
                                        className="hidden"
                                    />
                                    <span className="font-semibold">Job Seeker</span>
                                </label>
                                <label className={`cursor-pointer text-center p-3 rounded-xl border transition-all ${role === 'employer' ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="employer"
                                        checked={role === 'employer'}
                                        onChange={onChange}
                                        className="hidden"
                                    />
                                    <span className="font-semibold">Employer</span>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 mt-6 border border-transparent rounded-xl shadow-lg shadow-blue-600/30 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-[1.02]"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-400">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300 hover:underline transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
