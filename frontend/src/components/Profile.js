import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Profile({ token }) {
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(null);

  // Fetch the profile data when the component mounts
  useEffect(() => {
    // Assuming an endpoint "/api/profile" to get the profile info
    axios.get('/api/profile', { headers: { Authorization: `Bearer ${token}` } })
      .then(response => setProfileData(response.data))
      .catch(error => console.error('Error fetching profile data', error));
  }, [token]);

  const handleUpdateField = (field) => {
    setIsEditing(field);
  };

  const handleSaveField = (field, value) => {
    // Update the backend with the new value
    axios.put('/api/profile', { [field]: value }, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        setIsEditing(null);
        setProfileData({ ...profileData, [field]: value });
      })
      .catch(error => console.error('Error updating profile data', error));
  };

  return (
    <div className="container mt-3">
      {Object.keys(profileData).map((key) => (
        <div className="form-group" key={key}>
          <label>{key}</label>
          {isEditing === key ? (
            <div>
              <input
                type="text"
                value={profileData[key]}
                onChange={e => setProfileData({ ...profileData, [key]: e.target.value })}
              />
              <button onClick={() => handleSaveField(key, profileData[key])}>Save</button>
              <button onClick={() => setIsEditing(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <span>{profileData[key]}</span>
              <button onClick={() => handleUpdateField(key)}>Edit</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
