import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import JobBoard from './pages/JobBoard';
import PostJob from './pages/PostJob';
import Profile from './pages/Profile';
import Companies from './pages/Companies';
import Salaries from './pages/Salaries';
import AdminDashboard from './pages/AdminDashboard';

import JobApplicants from './pages/JobApplicants';

import EditJob from './pages/EditJob';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<JobBoard />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/edit-job/:id" element={<EditJob />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/salaries" element={<Salaries />} />
        <Route path="/jobs/:id/applicants" element={<JobApplicants />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
