import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Authentication from './pages/Authentication';
import ProfileNav from './pages/ProfileNav';
import { useSelector } from 'react-redux';
import './styles/variables.css';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {!user && <Authentication />}
      {user && <ProfileNav />}
      <ToastContainer
        position='top-right'
        autoClose={2500}
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
