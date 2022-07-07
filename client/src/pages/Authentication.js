import React from 'react';

export default function Authentication() {
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
