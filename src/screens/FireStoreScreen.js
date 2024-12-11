


import { Link } from 'react-router-dom'; 
import FireStore from '../components/FireStore';
import FirestoreAdvanced from '../components/FireStoreAdvance';
import FireStoreSnap from '../components/FireStoreSnap';
function FireStoreScreen() { 


  return (
    <div className="App">
      <div className="App-header">
        <h2>
          <Link className="App-link" to="/">
            Home
          </Link>
        </h2>
        <h1>React Firebase FireStore</h1> 
      <FireStore/>
      <FireStoreSnap/>
      <FirestoreAdvanced />
      </div>
    </div>
  );
}

export default FireStoreScreen;
