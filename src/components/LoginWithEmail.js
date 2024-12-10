import React, { useState } from 'react';
import {  signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../firebaseConfig';
const LoginWithEmail = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
//   const auth = getAuth();

  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value };
    setData({ ...data, ...inputs });
  };

  const login = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => alert('Logged In'))
      .catch((error) => alert(error.message));
  };

  return (
    <div>
      <h2>Login with Email</h2>
      <input
        placeholder="Email"
        name="email"
        type="email"
        onChange={handleInputs}
      />
      <input
        placeholder="Password"
        name="password"
        type="password"
        onChange={handleInputs}
      />
      <button onClick={login}>Log In</button>
    </div>
  );
};

export default LoginWithEmail;
