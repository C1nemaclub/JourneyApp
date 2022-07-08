import React from 'react';

import Authentication from './pages/Authentication';
import ProfileNav from './pages/ProfileNav';
import { useSelector } from 'react-redux';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {!user && <Authentication />}
      {user && <ProfileNav />}
    </>
  );
}

export default App;
