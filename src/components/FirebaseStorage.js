import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig'; 

const FirebaseStorage = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Access the first file in the list
    if (selectedFile) {
      console.log("Selected File:", selectedFile); // Debugging log
      setFile(selectedFile); // Set the file in state
    } else {
      console.error("No file selected.");
    }
  };
  

  const handleUpload = () => {
    if (!file) {
      alert('Please choose a file to upload');
      return;
    }

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
      },
      (error) => {
        console.error('Upload error:', error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDownloadURL(url);
        });
      }
    );
  };

  return (
    <div className="firebase-storage">
      <h3>Upload File</h3>
      <input
        type="file"
        onChange={handleFileChange}
        accept="*/*" // Allows all file types; adjust based on your needs
        />
     {file && <p>Selected File: {file.name}</p>} {/* Show selected file name */}
      <button onClick={handleUpload}>Upload</button>
      {progress > 0 && <p>Upload Progress: {progress.toFixed(2)}%</p>}
      {downloadURL && (
        <p>
          File available at: <a href={downloadURL} target="_blank" rel="noopener noreferrer">{downloadURL}</a>
        </p>
      )}
    </div>
  );
};

export default FirebaseStorage;
