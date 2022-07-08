import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Header from '../components/Header';
import Profile from './Profile';
import EditPost from './EditPost';
import SinglePost from './SinglePost';
import CreatePost from './CreatePost';

export default function ProfileNav() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/edit' element={<EditPost />} />
          <Route path='/post' element={<SinglePost />} />
          <Route path='/create' element={<CreatePost />} />
        </Routes>
      </Router>
    </>
  );
}
