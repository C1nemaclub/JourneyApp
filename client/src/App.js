import React, { useState, createContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Authentication from './pages/Authentication';
import ProfileNav from './pages/ProfileNav';
import { useSelector } from 'react-redux';
import './styles/variables.css';
export const ThemeContext = createContext(null);

function App() {
  const { user } = useSelector((state) => state.auth);
  const [theme, setTheme] = useState('light');

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme}>
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
