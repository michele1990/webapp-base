// handleProfile.js

import axios from 'axios';

export const handleProfileSubmit = async (profileInfo, token, setInfo, setShowProfileForm) => {
    try {
      const requestData = {
        first_name: profileInfo.Name,
        last_name: profileInfo.LastName,
        phone: profileInfo.phoneNumber,
        address: profileInfo.address,
        about_me: '', // If needed, add a field for this to your frontend form
      };
  
      const response = await axios.post('/api/profile', requestData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      let message;
      if (response.data.message === "  Profile updated successfully") {
        message = `Profile updated successfully!`;
        setShowProfileForm(false);
      } else {
        message = response.data.message || "Profile update failed!";
      }
      
      setInfo(message);
      setTimeout(() => setInfo(''), 10000); // Clears the message after 10 seconds
  
      if (response.data.message === "  Profile updated successfully") {
        setShowProfileForm(false);
      }
  
    } catch (error) {
      if (error.response && error.response.data.message) {
        setInfo(error.response.data.message);
      } else {
        console.error('Error during profile update', error);
        setInfo("Profile update failed!");
      }
  
      setTimeout(() => setInfo(''), 10000); // Clears the message after 10 seconds
    }
  };

  export const fetchProfile = async (token, username) => {
    try {
      const response = await fetch(`/api/profile/${username}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };
  
  export const updateProfile = async (token, username, profileData) => {
    try {
      const response = await fetch(`/api/profile/${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };
  
  