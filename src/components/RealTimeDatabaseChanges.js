import React, { useState, useEffect } from "react";
import { realTimeDatabase } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";

const RealTimeDatabaseChanges = () => {
  const [allUsers, setAllUsers] = useState([]); // Store all user documents as an array
  const [lastUpdated, setLastUpdated] = useState(null); // State to track the timestamp

  const [filteredUsers, setFilteredUsers] = useState([]); // Store filtered users 
  const [message, setMessage] = useState(""); // Success/Error messages

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
  };

  // Retrieve all users in real time
  useEffect(() => {
    const usersRef = ref(realTimeDatabase, "users"); // Reference to 'users' node

    // Attach real-time listener
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      // Convert object data to an array of users with keys
      const usersArray = data
        ? Object.entries(data).map(([key, value]) => ({ id: key, ...value }))
        : [];
      setAllUsers(usersArray); // Update state with the users array
      setLastUpdated(new Date().toLocaleString()); // Set the timestamp when users are updated
      showMessage("Fetched all users");
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  // Get filtered users (e.g., by email)
   useEffect(() => {
     const usersRef = ref(realTimeDatabase, "users"); // Reference to 'users' node

     // Attach real-time listener
     const unsubscribe = onValue(usersRef, (snapshot) => {
       const data = snapshot.val();

       if (data) {
         const filtered = Object.entries(data).filter(([id, user]) =>
           user.email.includes('')
         );

         setFilteredUsers(filtered);
         showMessage(`Found ${filtered.length} matching users`);
       } else {
         showMessage("No users found");
       }
     });

     // Cleanup listener on component unmount
     return () => unsubscribe();
   }, []);
   
 
  return (
    <div>
      <h2>Real Time Update</h2>
      {/* Display Message */}
      {message && <p style={{ color: "green" }}>{message}</p>}

      {allUsers.length > 0 ? (
        <div>
          <h3>All RealTime Records</h3>
          <p>Last Updated: {lastUpdated}</p>
          <ul>
            {allUsers.map((user) => (
              <li
                key={user.id}
              >{`ID: ${user.id}, Email: ${user.email}, Password: ${user.password}`}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No users found.</p>
      )}

      {/* Display Filtered Users */}
      {filteredUsers.length > 0 && (
        <div>
          <h3>Filtered Users</h3>
          <p>Last Updated: {lastUpdated}</p>
          <ul>
            {filteredUsers.map(([id, user]) => (
              <li key={id}>
                {`ID: ${id}, Email: ${user.email}, Password: ${user.password}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RealTimeDatabaseChanges;
