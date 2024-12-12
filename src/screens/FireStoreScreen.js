


import { Link } from 'react-router-dom'; 
import FireStore from '../components/FireStore';
import FirestoreAdvanced from '../components/FireStoreAdvance';
import FireStoreSnap from '../components/FireStoreSnap';

import { useSelector } from 'react-redux';
function FireStoreScreen() { 
  const currentUser = useSelector((state) => state.user.currentUser); // Get user from state


  return (
    <div className="App">
      <div className="App-header">
        <h2>
          <Link className="App-link" to="/">
            Home
          </Link>
        </h2>
        <h1>React Firebase FireStore</h1> 
        <h2>Current User : {currentUser?currentUser.email:'None'}</h2>
      <FireStore/>
      <FireStoreSnap/>
      <FirestoreAdvanced />
      </div>
    </div>
  );
}

export default FireStoreScreen;
