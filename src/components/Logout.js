import React from 'react';
import {  signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

import {  useDispatch } from 'react-redux';
import { clearUser } from '../slices/user/userSlice';

const Logout = () => {
//   const auth = getAuth();
  const dispatch = useDispatch();

  const handleLogout = () => {
    signOut(auth)
      .then(() =>{ dispatch(clearUser());alert('Logged Out')})
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
