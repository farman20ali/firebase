import React, { useEffect, useState } from "react";
import { messaging } from "../firebaseConfig";
import { getToken, onMessage } from "firebase/messaging";
import toast, { Toaster } from "react-hot-toast";
const CloudNotification = () => {
  const [notificationData, setNotificationData] = useState("");
  const [token, setToken] = useState("");
  const [copyStatus, setCopyStatus] = useState("Copy Token");
  const [refreshedTime,setRefreshedTime]=useState("");
  async function requestNotificationPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      toast.success("successfully granted");
      // Generate Token
      const token = await getToken(messaging, {
        vapidKey: process.env.REACT_APP_V_API_D_KEY,
      });
      console.log("Token Gen", token);
      setToken(token);
      setRefreshedTime(new Date().toLocaleString());
      // Send this token to the server (e.g., save to database)
    } else if (permission === "denied") {
      toast.success("You denied the notification permission");
    }
  }

   useEffect(() => {
     requestNotificationPermission();
     onMessage(messaging,(payload)=>{
        console.log(`foreground notifications: ${payload} `);
        setNotificationData(payload?payload.notification.body:'');
        toast(payload.notification.body);
     });
   }, []);

 

  // Function to copy the token to clipboard
  const copyToken = () => {
    navigator.clipboard.writeText(token).then(
      () => {
        console.log("Token copied to clipboard!");
        setCopyStatus("Copied!"); // Update the button text to "Copied!"
        setTimeout(() => setCopyStatus("Copy Token"), 5000); // Reset after 2 seconds
      },
      (err) => console.error("Could not copy token:", err)
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Notification -- Cloud Messaging</h2>
      <Toaster position="top-right" />
      {notificationData ? <h2>Notification Data: {notificationData}</h2>:'No Notification'}
      {token && (
        <div style={{ marginTop: "20px" }}>
          <h3>
            Token refreshed {refreshedTime}
          </h3>
          <p
            style={{
              wordWrap: "break-word", // Ensure the token wraps
              overflowWrap: "break-word",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
              maxWidth: "100%",
              color: "black",
            }}
          >
            {token}
          </p>
          <button
            onClick={copyToken}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
            }}
          >
            {copyStatus}
          </button>
        </div>
      )}
    </div>
  );
};

export default CloudNotification;
