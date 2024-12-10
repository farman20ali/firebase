import React from 'react';
import {  signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Logout = () => {
//   const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => alert('Logged Out'))
      .catch((error) => alert(error.message));
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Logout;
