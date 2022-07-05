import React, { useState, useEffect } from 'react';
import { reset, login } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
    }
    if (user) {
      navigate('/');
    }
  }

  useEffect(() => {
    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={(e) => onSubmit(e)}>
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
        <button>Login</button>
      </form>
    </>
  );
}
