import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const valid = false;
export default function AuthLinks() {
  const [putLogin, setPutLogin] = useState(null);

  if (window.location.href.includes('/login')) {
    console.log('We are in login');
  } else {
    console.log('Not login');
  }

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='/register'>Register</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
