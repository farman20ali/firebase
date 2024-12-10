import React from 'react';
import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';

const LoginWithGithubProvider = () => {
  const auth = getAuth();
  const provider = new GithubAuthProvider();

  const loginWithGithub = () => {
    signInWithPopup(auth, provider)
      .then((r) => alert('Logged In with Github '+r.user.email))
      .catch((error) => alert(error.message));
  };

  return (
    <div>
      <h2>Login with Github</h2>
      <button onClick={loginWithGithub}>Log In with GitHub</button>
    </div>
  );
};

export default LoginWithGithubProvider;
