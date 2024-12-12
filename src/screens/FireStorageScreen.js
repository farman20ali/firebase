import { Link } from 'react-router-dom';
import FirebaseStorage from '../components/FirebaseStorage'; 

import { useSelector } from 'react-redux';

function FirebaseStorageScreen() {
  const currentUser = useSelector((state) => state.user.currentUser); // Get user from state
  return (
    <div className="App">
      <div className="App-header">
        <h2>
          <Link className="App-link" to="/">
            Home
          </Link>
        </h2>
        <h1>React Firebase Storage</h1>
        <h2>Current User : {currentUser?currentUser.email:'None'}</h2>
        <FirebaseStorage />
      </div>
    </div>
  );
}

export default FirebaseStorageScreen;
