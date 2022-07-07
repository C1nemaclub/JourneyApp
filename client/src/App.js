import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import EditPost from './pages/EditPost';
import SinglePost from './pages/SinglePost';
import CreatePost from './pages/CreatePost';
import AuthLinks from './components/AuthLinks';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
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

export default App;
