
import { useEffect, useState } from 'react';
import {  onAuthStateChanged,getAuth } from 'firebase/auth';
import LoginWithEmail from '../components/LoginWithEmail';
import Logout from '../components/Logout';
import LoginWithProvider from '../components/LoginWithProvider';
import app from '../firebaseConfig';
import CreateAccount from '../components/CreateAccount';
import LoginWithGithubProvider from '../components/LoginWithGithubProvider';

import { Link } from 'react-router-dom'; 
function AuthenticationScreen() { 
  const auth = getAuth(app);
  const [email,setEmail]=useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User Logged In:', user.email);
      } else {
        console.log('User Not Logged In');
      }
    });
  }, [auth]);

  useEffect(()=>{
    if(auth && auth.currentUser){
      setEmail(auth.currentUser.email?'Logged in user: '+auth.currentUser.email:'')
    }
    
  },[auth,auth.currentUser]);


  return (
    <div className='App'>
       
    <div className="App-header">  
        <h2> <Link to="/">Home</Link></h2>
      <h1>React Firebase Authentication</h1>
      <h3> {email}</h3>
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
