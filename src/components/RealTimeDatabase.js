import React, { useState } from "react";
import { realTimeDatabase } from "../firebaseConfig";
import {
  ref,
  set, 
  update,
  remove,
  push,
  get,
  query,
  orderByChild,
  equalTo
} from "firebase/database";

const RealtimeDatabase = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [allUsers, setAllUsers] = useState({}); // Store all user data
  const [userId, setUserId] = useState(""); // For specific user operations
  const [filteredUsers, setFilteredUsers] = useState([]); // Store filtered users
  const [filterValue, setFilterValue] = useState(""); // Value for filtering users
  const [message, setMessage] = useState(""); // Success/Error messages

  // Handle input changes
  const handleInputs = (event) => {
    const inputs = { [event.target.name]: event.target.value };
    setData({ ...data, ...inputs });
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
  };

  // Add user to Realtime Database
  const addUser = async () => {
    try {
      const usersRef = ref(realTimeDatabase, "users");
      const newUserRef = push(usersRef);
      await set(newUserRef, data);
      showMessage("User added successfully");
    } catch (error) {
      showMessage(`Error adding user: ${error.message}`);
    }
  };

  // Update user in Realtime Database
  const updateUser = async () => {
    if (!userId) {
      showMessage("Please provide a User ID for updating");
      return;
    }

    try {
      const userRef = ref(realTimeDatabase, `users/${userId}`);
      await update(userRef, data);
      showMessage("User updated successfully");
    } catch (error) {
      showMessage(`Error updating user: ${error.message}`);
    }
  };

  // Delete user from Realtime Database
  const deleteUser = async () => {
    if (!userId) {
      showMessage("Please provide a User ID for deleting");
      return;
    }

    try {
      const userRef = ref(realTimeDatabase, `users/${userId}`);
      await remove(userRef);
      showMessage("User deleted successfully");
    } catch (error) {
      showMessage(`Error deleting user: ${error.message}`);
    }
  };

  // Get a specific user by ID
  const getUserById = async () => {
    if (!userId) {
      showMessage("Please provide a User ID to retrieve");
      return;
    }

    try {
      const userRef = ref(realTimeDatabase, `users/${userId}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        showMessage(`User data: ${JSON.stringify(snapshot.val())}`);
      } else {
        showMessage("No user found with the provided ID");
      }
    } catch (error) {
      showMessage(`Error fetching user: ${error.message}`);
    }
  };
  // Retrieve all users (triggered by button click)
  const getAllUsers = async () => {
    try {
      const usersRef = ref(realTimeDatabase, "users");
      const snapshot = await get(usersRef); // Fetch data once

      if (snapshot.exists()) {
        const data = snapshot.val();
        setAllUsers(data || {});
        showMessage("Fetched all users");
      } else {
        showMessage("No users found");
      }
    } catch (error) {
      showMessage(`Error fetching users: ${error.message}`);
    }
  };

  // Get filtered users (triggered by button click)
  const getFilteredUsers = async () => {
    try {
      const usersRef = ref(realTimeDatabase, "users");
      const snapshot = await get(usersRef); // Fetch data once

      if (snapshot.exists()) {
        const data = snapshot.val();
        const filtered = Object.entries(data).filter(([id, user]) =>
          user.email.includes(filterValue)
        );

        setFilteredUsers(filtered);
        showMessage(`Found ${filtered.length} matching users`);
      } else {
        showMessage("No users found");
      }
    } catch (error) {
      showMessage(`Error filtering users: ${error.message}`);
    }
  };

  // Add a function to fetch users by email
  const getFilteredUsersByEmail = async () => {
    if (!filterValue) {
      showMessage("Please provide a value to filter by email.");
      return;
    }

    try {
      const usersRef = ref(realTimeDatabase, "users");
      const emailQuery = query(
        usersRef,
        orderByChild("email"),
        equalTo(filterValue)
      );
      const snapshot = await get(emailQuery);

      if (snapshot.exists()) {
        const data = snapshot.val();
        setFilteredUsers(Object.entries(data)); // Convert object to an array
        showMessage(`Found ${Object.keys(data).length} matching users`);
      } else {
        setFilteredUsers([]);
        showMessage("No users found with the provided email.");
      }
    } catch (error) {
      showMessage(`Error fetching users: ${error.message}`);
    }
  };


  return (
    <div>
      <h2>Realtime Database CRUD Operations</h2>

      {/* Input Fields */}
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
        placeholder="User ID (for Update/Delete/Get)"
        name="userId"
        type="text"
        onChange={(e) => setUserId(e.target.value)}
      />

      <input
        placeholder="Filter Value (e.g., email)"
        name="filterValue"
        type="text"
        onChange={(e) => setFilterValue(e.target.value)}
      />

      {/* Buttons */}
      <div>
        <button onClick={addUser}>Add User</button>
        <button onClick={getAllUsers}>Get All Users</button>
        <button onClick={getUserById}>Get User by ID</button>
        <button onClick={getFilteredUsers}>Get Filtered Users</button>
        <button onClick={updateUser}>Update User by Id</button>
        <button onClick={deleteUser}>Delete User by Id</button>
        <button onClick={getFilteredUsersByEmail}>  Get Users by Email (Server Side) </button>
        ;
      </div>

      {/* Display Message */}
      {message && <p style={{ color: "green" }}>{message}</p>}

      {/* Display All Users */}
      {Object.keys(allUsers).length > 0 && (
        <div>
          <h3>All Users</h3>
          <ul>
            {Object.entries(allUsers).map(([id, user]) => (
              <li key={id}>
                {`ID: ${id}, Email: ${user.email}, Password: ${user.password}`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display Filtered Users */}
      {filteredUsers.length > 0 && (
        <div>
          <h3>Filtered Users</h3>
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

export default RealtimeDatabase;
