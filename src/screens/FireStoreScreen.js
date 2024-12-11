


import { Link } from 'react-router-dom'; 
import FireStore from '../components/FireStore';
import FirestoreAdvanced from '../components/FireStoreAdvance';
function FireStoreScreen() { 


  return (
    <div>
    <div className="App-header">
    <h2> <Link to="/">Home</Link></h2>  
      <h1>React Firebase FireStore</h1> 
      <FireStore/>
      <FirestoreAdvanced />
    </div>
    </div>
  );
}

export default FireStoreScreen;
