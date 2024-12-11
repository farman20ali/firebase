import React, { useState,useEffect } from 'react';
import { collection ,onSnapshot,query,where} from 'firebase/firestore';
import { database } from '../firebaseConfig';

const FireStoreSnap = () => {
  
  const [allUsers, setAllUsers] = useState([]); // Store all user documents
  const [lastUpdated, setLastUpdated] = useState(null); // State to track the timestamp

  const [filteredUsers,setFilteredUsers]=useState([]);
   // Real-time listener for all documents
   useEffect(() => {
    const colRef = collection(database, 'users');

    // Subscribe to snapshot updates
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setAllUsers(users);
      setLastUpdated(new Date().toLocaleString()); // Set the timestamp when users are updated
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);


   // Real-time listener for filtered users
   useEffect(() => { 
    const usersRef=collection(database, 'users');
    const q = query(usersRef, where("email", "==", 'farman')); // Apply filter 
    // Subscribe to snapshot updates
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setFilteredUsers(users);
      setLastUpdated(new Date().toLocaleString()); // Set the timestamp when users are updated
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);


  return (
    <div>
      <h2>SnapShot and Query</h2>


      {allUsers.length > 0 && (
        <div>
          <h3>All SnapShots </h3>
          <p>Last Updated: {lastUpdated}</p>
          <ul>
            {allUsers.map(user => (
              <li key={user.id}>{`ID: ${user.id}, Email: ${user.email}, Password: ${user.password}`}</li>
            ))}
          </ul>
        </div>
      )}
      {filteredUsers.length > 0 && (
        <div>
          <h3>SnapShot filteredUsers </h3>
          <p>Last Updated: {lastUpdated}</p>
          <ul>
            {filteredUsers.map(user => (
              <li key={user.id}>{`ID: ${user.id}, Email: ${user.email}, Password: ${user.password}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FireStoreSnap;
