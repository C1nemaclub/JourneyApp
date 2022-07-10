import React from 'react';
import { ToastContainer } from 'react-toastify';
import Authentication from './pages/Authentication';
import ProfileNav from './pages/ProfileNav';
import { useSelector } from 'react-redux';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {!user && <Authentication />}
      {user && <ProfileNav />}
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
