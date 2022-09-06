import React, { useState, createContext, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Authentication from './pages/Authentication';
import ProfileNav from './pages/ProfileNav';
import { useSelector } from 'react-redux';
import './styles/variables.css';
import Logo from './assets/logo.png';
export const ThemeContext = createContext(null);

function App() {
  const { user } = useSelector((state) => state.auth);
  //const [theme, setTheme] = useState('light');
  const [theme, setTheme] = useState(
    () => JSON.parse(localStorage.getItem('theme')) || 'light'
  );

  useEffect(() => {
    //JSON.parse(localStorage.getItem('theme'));
  }, []);

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    localStorage.setItem('theme', JSON.stringify(theme));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme}>
        <img src={Logo} alt='logo' className='logo' />
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
      </div>
    </ThemeContext.Provider>
  );
}
export default App;
