import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import RealtimeDatabase from "../components/RealTimeDatabase";
import RealTimeDatabaseChanges from "../components/RealTimeDatabaseChanges";

function RealTimeDatabaseScreen() {
  const currentUser = useSelector((state) => state.user.currentUser); // Get user from state
  return (
    <div className="App">
      <div className="App-header">
        <h2>
          <Link className="App-link" to="/">
            Home
          </Link>
        </h2>
        <h1>React Firebase Real Time Database</h1>
        <h2>Current User : {currentUser ? currentUser.email : "None"}</h2>
        <RealtimeDatabase />
        <RealTimeDatabaseChanges/>
      </div>
    </div>
  );
}

export default RealTimeDatabaseScreen;
