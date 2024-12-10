import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import {  createUserWithEmailAndPassword } from 'firebase/auth';


const CreateAccount = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  }); 
  // const auth = getAuth();
  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value };
    setData({ ...data, ...inputs });
  };

  const login = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => alert('User Created Successfully'))
      .catch((error) => alert(error.message));
  };

  return (
    <div>
      <h2>Create Account</h2>
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
      <button onClick={login}>Submit</button>
    </div>
  );
};

export default CreateAccount;
