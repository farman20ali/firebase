import React, { useState,useEffect } from 'react';
import { collection, addDoc, doc, getDoc, deleteDoc, updateDoc, getDocs ,onSnapshot} from 'firebase/firestore';
import { database } from '../firebaseConfig';

const FireStore = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [docId, setDocId] = useState(''); // For delete/update specific documents
  const [allUsers, setAllUsers] = useState([]); // Store all user documents
  const [lastUpdated, setLastUpdated] = useState(null); // State to track the timestamp
  // Handle input changes
  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value };
    setData({ ...data, ...inputs });
  };

  // Add document to Firestore
  const addUser = async () => {
    try {
      const docRef = await addDoc(collection(database, 'users'), data);
      alert(`Document added with ID: ${docRef.id}`);
    } catch (error) {
      alert(`Error adding document: ${error.message}`);
    }
  };

  // Retrieve a document by ID
  const getUser = async () => {
    try {
      const docRef = doc(database, 'users', docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        alert(`Document data: ${JSON.stringify(docSnap.data())}`);
      } else {
        alert('No such document!');
      }
    } catch (error) {
      alert(`Error retrieving document: ${error.message}`);
    }
  };

  // Retrieve all documents
  const getAllUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(database, 'users'));
      const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAllUsers(users);
      setLastUpdated(new Date().toLocaleString()); // Set the timestamp when users are updated
      alert(`Retrieved ${users.length} users.`);
    } catch (error) {
      alert(`Error retrieving users: ${error.message}`);
    }
  };

  // Update a document by ID
  const updateUser = async () => {
    try {
      const docRef = doc(database, 'users', docId);
      await updateDoc(docRef, data);
      alert('Document updated successfully');
    } catch (error) {
      alert(`Error updating document: ${error.message}`);
    }
  };

  // Delete a document by ID
  const deleteUser = async () => {
    try {
      const docRef = doc(database, 'users', docId);
      await deleteDoc(docRef);
      alert('Document deleted successfully');
    } catch (error) {
      alert(`Error deleting document: ${error.message}`);
    }
  };

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

  return (
    <div>
      <h2>Firestore CRUD Operations</h2>

      <input
        placeholder="Email"
        name="email"
        type="email"
        onChange={handleInputs}
      />
      <input
        placeholder="Password"
        name="password"
        type="password"
        onChange={handleInputs}
      />

      <input
        placeholder="Document ID (for Get, Update, Delete)"
        name="docId"
        type="text"
        onChange={(e) => setDocId(e.target.value)}
      />

      <div>
        <button onClick={addUser}>Add User</button>
        <button onClick={getUser}>Get User</button>
        <button onClick={updateUser}>Update User</button>
        <button onClick={deleteUser}>Delete User</button>
        <button onClick={getAllUsers}>Get All Users</button>
      </div>

      {allUsers.length > 0 && (
        <div>
          <h3>All Users </h3>
          <p>Last Updated: {lastUpdated}</p>
          <ul>
            {allUsers.map(user => (
              <li key={user.id}>{`ID: ${user.id}, Email: ${user.email}, Password: ${user.password}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FireStore;
