```
import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8">
            Find your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">dream job</span> <br />
            without the hassle.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 mb-10">
            Connecting top talent with the world's best companies. Browse thousands of job listings and find the perfect match for your skills.
          </p>
          
          {/* Search Bar Placeholder */}
          <div className="max-w-3xl mx-auto mb-12">
             <div className="p-2 bg-white rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-2 border border-gray-100">
                <div className="flex-1 w-full flex items-center px-4 h-14 bg-gray-50 rounded-xl">
                   <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                   <input type="text" placeholder="Job title or keyword" className="bg-transparent w-full focus:outline-none text-gray-700 placeholder-gray-400 font-medium" />
                </div>
                <div className="flex-1 w-full flex items-center px-4 h-14 bg-gray-50 rounded-xl">
                   <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                   <input type="text" placeholder="Location" className="bg-transparent w-full focus:outline-none text-gray-700 placeholder-gray-400 font-medium" />
                </div>
                <button className="w-full md:w-auto px-8 h-14 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
                   Search
                </button>
             </div>
          </div>

          <div className="flex justify-center gap-4 text-sm text-gray-500 font-medium">
             <span>Popular:</span>
             <Link to="/" className="text-blue-600 hover:underline">Remote</Link>
             <Link to="/" className="text-blue-600 hover:underline">Engineering</Link>
             <Link to="/" className="text-blue-600 hover:underline">Design</Link>
             <Link to="/" className="text-blue-600 hover:underline">Product</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
```
