import React, { useState, useEffect } from 'react';
import { reset, register, logout } from '../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import Loader from '../components/Loader';
import AuthLinks from '../components/AuthLinks';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      //toast.error(message);
    }
    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

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

    if (password !== password2) {
      console.log('Passwords dont match');
    } else {
      const userData = {
        name: name,
        email: email,
        password: password,
      };
      dispatch(register(userData));
      dispatch(reset());
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className='container'>
        <AuthLinks />
        <div className='left-col'>
          <h1 className='title'>Start discovering new adventures</h1>
          <h1 className='reg-label'>Register</h1>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='form'>
              <input
                className='form__input'
                type='text'
                name='name'
                value={formData.name}
                onChange={(e) => onChange(e)}
                placeholder=' '
              />
              <label class='form__label'>Name</label>
            </div>
            <div className='form'>
              <input
                className='form__input'
                type='email'
                name='email'
                value={formData.email}
                onChange={(e) => onChange(e)}
                placeholder=' '
              />
              <label class='form__label'>Email</label>
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
              <label class='form__label'>Password</label>
            </div>
            <div className='form'>
              <input
                className='form__input'
                type='password'
                name='password2'
                value={formData.password2}
                onChange={(e) => onChange(e)}
                placeholder=' '
              />
              <label class='form__label'>Confirm Password</label>
            </div>
            <button type='submit' className='register-btn btn'>
              Register
            </button>
          </form>
        </div>
        <div className='right-col'>
          <Spline
            className='spline'
            scene='https://prod.spline.design/X-nHbpqn39env0sx/scene.splinecode'
          />
        </div>
      </div>
    </>
  );
}
