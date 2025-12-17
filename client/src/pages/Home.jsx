import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen font-sans text-gray-100 selection:bg-blue-500/30 selection:text-blue-200">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-2000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 drop-shadow-lg">
            Find your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">dream job</span> <br />
            without the hassle.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300 mb-10 leading-relaxed">
            Connecting top talent with the world's best companies. Browse thousands of job listings and find the perfect match for your skills.
          </p>

          {/* Search Bar Placeholder */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="p-2 glass-panel rounded-2xl flex flex-col md:flex-row items-center gap-2 border border-white/10 bg-black/30 backdrop-blur-xl shadow-2xl">
              <div className="flex-1 w-full flex items-center px-4 h-14 bg-white/5 rounded-xl border border-white/5 focus-within:border-blue-500/50 focus-within:bg-white/10 transition-all">
                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <input type="text" placeholder="Job title or keyword" className="bg-transparent w-full focus:outline-none text-white placeholder-gray-500 font-medium" />
              </div>
              <div className="flex-1 w-full flex items-center px-4 h-14 bg-white/5 rounded-xl border border-white/5 focus-within:border-blue-500/50 focus-within:bg-white/10 transition-all">
                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <input type="text" placeholder="Location" className="bg-transparent w-full focus:outline-none text-white placeholder-gray-500 font-medium" />
              </div>
              <button className="w-full md:w-auto px-8 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(37,99,235,0.6)] transition-all transform hover:scale-105 border border-white/10">
                Search
              </button>
            </div>
          </div>

          <div className="flex justify-center gap-4 text-sm text-gray-400 font-medium">
            <span className="text-gray-500">Popular:</span>
            <Link to="/" className="hover:text-blue-400 hover:underline transition-colors">Remote</Link>
            <Link to="/" className="hover:text-blue-400 hover:underline transition-colors">Engineering</Link>
            <Link to="/" className="hover:text-blue-400 hover:underline transition-colors">Design</Link>
            <Link to="/" className="hover:text-blue-400 hover:underline transition-colors">Product</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
