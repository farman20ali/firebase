import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const LoginWithProvider = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((r) => alert('Logged In with Google '+r.user.email))
      .catch((error) => alert(error.message));
  };

  return (
    <div>
      <h2>Login with Google</h2>
      <button onClick={loginWithGoogle}>Log In with Google</button>
    </div>
  );
};

export default LoginWithProvider;
