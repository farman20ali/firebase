import React, { useState, useEffect,useCallback  } from 'react';
import { collection, addDoc, doc,  getDocs, deleteDoc } from 'firebase/firestore';
import { fireStoreDatabase } from '../firebaseConfig';

const FirestoreAdvanced = () => {
  const [parentData, setParentData] = useState({
    name: '',
    age: ''
  });
  const [childData, setChildData] = useState({
    hobby: '',
    skillLevel: ''
  });
  const [parentId, setParentId] = useState(''); // ID for retrieving children
  const [parents, setParents] = useState([]);
  const [children, setChildren] = useState([]);

  const parentsCollectionRef = collection(fireStoreDatabase, 'parents');

  // Handle parent input changes
  const handleParentInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value };
    setParentData({ ...parentData, ...inputs });
  };

  // Handle child input changes
  const handleChildInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value };
    setChildData({ ...childData, ...inputs });
  };

  // Add a parent document
  const addParent = async () => {
    try {
      const docRef = await addDoc(parentsCollectionRef, parentData);
      alert(`Parent added with ID: ${docRef.id}`);
    } catch (error) {
      alert(`Error adding parent: ${error.message}`);
    }
  };

  // Add a child document in a parent's subcollection
  const addChild = async () => {
    try {
      if (!parentId) {
        alert('Please enter a Parent ID to add a child.');
        return;
      }
      const childCollectionRef = collection(fireStoreDatabase, `parents/${parentId}/children`);
      const docRef = await addDoc(childCollectionRef, childData);
      alert(`Child added with ID: ${docRef.id}`);
    } catch (error) {
      alert(`Error adding child: ${error.message}`);
    }
  };
 

  // Memoized function to retrieve all parents
  const getAllParents = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(parentsCollectionRef);
      const parentsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setParents(parentsList);
    } catch (error) {
      alert(`Error retrieving parents: ${error.message}`);
    }
  }, [parentsCollectionRef]);

  // Effect to load parents on mount
  useEffect(() => {
    getAllParents();
  }, [getAllParents]);

  // Retrieve all children for a specific parent
  const getChildren = async () => {
    try {
      if (!parentId) {
        alert('Please enter a Parent ID to retrieve children.');
        return;
      }
      const childCollectionRef = collection(fireStoreDatabase, `parents/${parentId}/children`);
      const querySnapshot = await getDocs(childCollectionRef);
      const childrenList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setChildren(childrenList);
    } catch (error) {
      alert(`Error retrieving children: ${error.message}`);
    }
  };

  // Delete a parent document
  const deleteParent = async (id) => {
    try {
      const docRef = doc(fireStoreDatabase, 'parents', id);
      await deleteDoc(docRef);
      alert('Parent deleted successfully');
    } catch (error) {
      alert(`Error deleting parent: ${error.message}`);
    }
  };


  return (
    <div>
      <h2>Firestore Advanced Relational Example</h2>

      <h3>Add Parent</h3>
      <input
        placeholder="Name"
        name="name"
        onChange={handleParentInputs}
      />
      <input
        placeholder="Age"
        name="age"
        type="number"
        onChange={handleParentInputs}
      />
      <button onClick={addParent}>Add Parent</button>

      <h3>Add Child</h3>
      <input
        placeholder="Parent ID"
        value={parentId}
        onChange={(e) => setParentId(e.target.value)}
      />
      <input
        placeholder="Hobby"
        name="hobby"
        onChange={handleChildInputs}
      />
      <input
        placeholder="Skill Level"
        name="skillLevel"
        onChange={handleChildInputs}
      />
      <button onClick={addChild}>Add Child</button>

      <h3>Parents</h3>
      <button onClick={getAllParents}>Refresh Parents</button>
      <ul>
        {parents.map((parent) => (
          <li key={parent.id}>
            {`ID: ${parent.id}, Name: ${parent.name}, Age: ${parent.age}`}
            <button onClick={() => deleteParent(parent.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Children</h3>
      <button onClick={getChildren}>Get Children for Parent</button>
      <ul>
        {children.map((child) => (
          <li key={child.id}>
            {`ID: ${child.id}, Hobby: ${child.hobby}, Skill Level: ${child.skillLevel}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FirestoreAdvanced;
