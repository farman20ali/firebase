import React, { useState } from 'react';
import { collection, addDoc, doc, getDoc, deleteDoc, updateDoc, getDocs,query ,where} from 'firebase/firestore';
import { database } from '../firebaseConfig';

const FireStore = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [docId, setDocId] = useState(''); // For delete/update specific documents
  const [allUsers, setAllUsers] = useState([]); // Store all user documents
  const [filteredUsers,setFilteredUsers]=useState([]);
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
      alert(`Retrieved ${users.length} users.`);
    } catch (error) {
      alert(`Error retrieving users: ${error.message}`);
    }
  };

    // Retrieve all documents
    const getFilteredUsers = async () => {
      try {
        const usersRef=collection(database, 'users');
        const q = query(usersRef, where("email", "==", 'farman')); // Apply filter
        const querySnapshot = await getDocs(q);
        
        const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFilteredUsers(users);
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
        <button onClick={getFilteredUsers}>Get Filtered Users</button>
      </div>

      {allUsers.length > 0 && (
        <div>
          <h3>Get All Users</h3>
          <ul>
            {allUsers.map(user => (
              <li key={user.id}>{`ID: ${user.id}, Email: ${user.email}, Password: ${user.password}`}</li>
            ))}
          </ul>
        </div>
      )}
       {filteredUsers.length > 0 && (
        <div>
          <h3>Get Filtered Users</h3>
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

export default FireStore;
