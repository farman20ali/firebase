import './App.css';
import React from 'react'; 
import AuthenticationScreen from './screens/AuthenticationScreen';
import HomeScreen from './screens/HomeScreen';
import FireStoreScreen from './screens/FireStoreScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FirebaseStorageScreen from './screens/FireStorageScreen';
import RealTimeDatabaseScreen from './screens/RealTimeDatabaseScreen';
import NotificationScreen from './screens/NotificationScreen';

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/Authentication" element={<AuthenticationScreen />} />
          <Route path="/FireStore" element={<FireStoreScreen />} />
          <Route path="/FirebaseStorage" element={<FirebaseStorageScreen />} />
          <Route path="/NotificationScreen" element={<NotificationScreen />} />
          <Route
            path="/RealTimeDatabase"
            element={<RealTimeDatabaseScreen />}
          />
        </Routes>
      </div>
    </Router>
  );
}
