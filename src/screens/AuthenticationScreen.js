
import { useEffect } from 'react';
import {  onAuthStateChanged,getAuth } from 'firebase/auth';
import LoginWithEmail from '../components/LoginWithEmail';
import Logout from '../components/Logout';
import LoginWithProvider from '../components/LoginWithProvider';
import app from '../firebaseConfig';
import CreateAccount from '../components/CreateAccount';
import LoginWithGithubProvider from '../components/LoginWithGithubProvider';

import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../slices/user/userSlice';

import { Link } from 'react-router-dom'; 
function AuthenticationScreen() { 
  const currentUser = useSelector((state) => state.user.currentUser); // Get user from state
  const dispatch = useDispatch();

  const auth = getAuth(app); 
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User Logged In:', user.email);
        dispatch(setUser(user)); 
      } else {
        console.log('User Not Logged In');
      }
    });
  }, [auth,dispatch]);


  return (
    <div className="App">
      <div className="App-header">
        <h2>
          <Link className="App-link" to="/">
            Home
          </Link>
        </h2>
        <h1>React Firebase Authentication</h1>
      <h3> {'User Logged In Email : '+(currentUser?currentUser.email:' None')}</h3>
      <CreateAccount />
      <LoginWithEmail /> 
      <LoginWithProvider />
      <LoginWithGithubProvider />
      <Logout />
      </div>
    </div>
  );
}

export default AuthenticationScreen;
