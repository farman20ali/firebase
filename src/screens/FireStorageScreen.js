import { Link } from 'react-router-dom';
import FirebaseStorage from '../components/FirebaseStorage'; 

function FirebaseStorageScreen() {
  return (
    <div className="App">
      <div className="App-header">
        <h2>
          <Link className="App-link" to="/">
            Home
          </Link>
        </h2>
        <h1>React Firebase Storage</h1>
        <FirebaseStorage />
      </div>
    </div>
  );
}

export default FirebaseStorageScreen;
