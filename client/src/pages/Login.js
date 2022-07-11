import React, { useState, useEffect } from 'react';
import { reset, login } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password } = formData;
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  function onChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    if (userData) {
      dispatch(login(userData));
      navigate('/');
    }
  }

  useEffect(() => {
    if (isSuccess || user) {
      navigate('/');
    }
    if (isError) {
      //toast.error(message);
      toast.error('Invalid Credentials');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className='container'>
        <div className='left-col'>
          <h1 className='title'>Start discovering new adventures</h1>
          <h1 className='reg-label'>LOGIN</h1>
          <form onSubmit={(e) => onSubmit(e)} className='login-form'>
            <div className='form'>
              <input
                className='form__input'
                type='email'
                name='email'
                value={formData.email}
                onChange={(e) => onChange(e)}
                placeholder=' '
              />
              <label className='form__label'>Email</label>
            </div>
            <div className='form'>
              <input
                className='form__input'
                type='password'
                name='password'
                value={formData.password}
                onChange={(e) => onChange(e)}
                placeholder=' '
              />
              <label className='form__label'>Password</label>
            </div>
            <button className='btn login-btn'>
              LOGIN<span></span>
            </button>
          </form>
          <div className='register-message message'>
            Don't have an account yet?{' '}
            <Link to='/register' className='register-link'>
              Register
            </Link>
          </div>
        </div>
        <div className='right-col'></div>
      </div>
    </>
  );
}
