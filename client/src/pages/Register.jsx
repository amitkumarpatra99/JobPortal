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
            navigate('/');
        } catch (err) {
            console.error('Register Error', err.response?.data || err.message);
            alert('Register Failed: ' + (err.response?.data?.message || 'Server Error'));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar />
            <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
                        <p className="mt-2 text-sm text-gray-500">Join thousands of job seekers and employers</p>
                    </div>

                    <form className="space-y-4" onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                placeholder="John Doe"
                                value={name}
                                onChange={onChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                placeholder="you@example.com"
                                value={email}
                                onChange={onChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                                I am a...
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={role}
                                onChange={onChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
                            >
                                <option value="seeker">Job Seeker</option>
                                <option value="employer">Employer</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                placeholder="••••••••"
                                value={password}
                                onChange={onChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={onChange}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-600/20 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all mt-4"
                        >
                            Sign Up
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
