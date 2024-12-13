


import { Link } from 'react-router-dom';  

import { useSelector } from 'react-redux';
import CloudNotification from "../components/CloudNotification";
function NotificationScreen() { 
  const currentUser = useSelector((state) => state.user.currentUser); // Get user from state


  return (
    <div className="App">
      <div className="App-header">
        <h2>
          <Link className="App-link" to="/">
            Home
          </Link>
        </h2>
        <h1>React Firebase Notification (cloud messaging)</h1>
        <h2>Current User : {currentUser ? currentUser.email : "None"}</h2>
        <CloudNotification />
      </div>
    </div>
  );
}

export default NotificationScreen;
