import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = JSON.stringify({ email, password });
            const res = await api.post('/auth/login', body);

            console.log('Login Success', res.data);
            // Store token (later use Context/Redux)
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (err) {
            console.error('Login Error', err.response?.data || err.message);
            alert('Login Failed: ' + (err.response?.data?.message || 'Server Error'));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar />
            <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
                        <p className="mt-2 text-sm text-gray-500">Sign in to your account to continue</p>
                    </div>

                    <form className="space-y-6" onSubmit={onSubmit}>
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

                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-gray-700">
                                    Remember me
                                </label>
                            </div>
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-600/20 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
