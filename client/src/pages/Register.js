import React, { useState, useEffect } from 'react';
import { reset, register } from '../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

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
    }
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={(e) => onChange(e)}
        />
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={(e) => onChange(e)}
        />
        <input
          type='password'
          name='password'
          value={formData.password}
          onChange={(e) => onChange(e)}
        />
        <input
          type='password'
          name='password2'
          value={formData.password2}
          onChange={(e) => onChange(e)}
        />
        <button type='submit'>Register</button>
      </form>
    </>
  );
}
