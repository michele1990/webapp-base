import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';

export default function Header({
  username,
  password,
  setUsername,
  greeting,
  setGreeting,
  token,
  setToken,
  setUsers,
}) {
  const [form, setForm] = useState(null);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
    about_me: '', // You may also include this field if you plan to use it in the profile update
  });
  




  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', {
        username: username, // Assuming 'username' is from your component state
        password: password, // Assuming 'password' is from your component state
      });
  
      if (response.data.access_token) {
        setToken(response.data.access_token);
        setGreeting(`Hello, ${username}!`);
        setForm(null); // This line closes the login form
      } else {
        setGreeting(response.data.message || "Authentication failed!");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setGreeting(error.response.data.message);
      } else {
        console.error('Error during authentication', error);
        setGreeting("Authentication failed!");
      }
    }
  };
  
  
  

  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/register', registerData); // Assuming 'registerData' contains username, email, and password
  
      if (response.data.access_token) {
        setToken(response.data.access_token);
        setGreeting(`Hello, ${registerData.username}! Registration successful!`);
        setShowProfileForm(true); // Show the profile form
        setForm(null); // Close the registration form
      } else {
        setGreeting(response.data.message || "Registration failed!"); 
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setGreeting(error.response.data.message);
      } else {
        console.error('Error during registration', error);
        setGreeting("Registration failed!");
      }
    }
  };
  
  
  

  const toggleForm = (formType) => {
    if (form === formType) {
      setForm(null);
    } else {
      setForm(formType);
    }
  };

  const handleGetUsers = async () => {
    try {
      const response = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const handleGoogleLogin = async (googleResponse) => {
    const tokenId = googleResponse.tokenId;
  };

  const handleProfileSubmit = async () => {
    try {
      // Create the request body in the format expected by the backend
      const requestData = {
        first_name: profileInfo.Name,
        last_name: profileInfo.LastName,
        phone: profileInfo.phoneNumber,
        address: profileInfo.address,
        about_me: '', // You'll need to add a field for this to your frontend form if you want to include it
      };
  
      // Assuming you have a POST endpoint for the profile at '/api/profile'
      const response = await axios.post('/api/profile', requestData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Check for a successful response from the server
      if (response.data.message === "Profile updated successfully") {
        setGreeting(`Profile updated successfully!`);
        setShowProfileForm(false); // Close the profile form
      } else {
        setGreeting(response.data.message || "Profile update failed!");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setGreeting(error.response.data.message);
      } else {
        console.error('Error during profile update', error);
        setGreeting("Profile update failed!");
      }
    }
  };
  

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">NorthWestWind.org</a>
        <button className="navbar-toggler" type="button" onClick={() => setNavbarOpen(!navbarOpen)}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse justify-content-between ${navbarOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item ml-2 mr-2">
              <button className="btn btn-primary btn-sm btn-dark" onClick={() => toggleForm('login')}>
                Login
              </button>
            </li>
            <li className="nav-item ml-2">
              <button className="btn btn-info btn-sm btn-dark" onClick={() => toggleForm('register')}>
                Register
              </button>
            </li>
            <li className="nav-item ml-2 navbar-text">{greeting}</li>
          </ul>
          <GoogleLogin
            clientId="651236571845-lv9cr9m7cve4mb9hvl92dmc85rqkq2n3.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={response => handleGoogleLogin(response)}
            onFailure={response => console.error('Google Login Failed:', response)}
          />
        </div>
      </nav>

      {showProfileForm && (
        <div className="container mt-3">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              onChange={e => setProfileInfo({ ...profileInfo, Name: e.target.value })}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              onChange={e => setProfileInfo({ ...profileInfo, LastName: e.target.value })}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              onChange={e => setProfileInfo({ ...profileInfo, address: e.target.value })}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Phone Number"
              onChange={e => setProfileInfo({ ...profileInfo, phoneNumber: e.target.value })}
            />
            <button className="btn btn-success" onClick={handleProfileSubmit}>Save</button>
            <button className="btn btn-danger" onClick={() => setShowProfileForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      {form === 'login' && (
        <div className="container mt-3">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              onChange={e => setUsername(e.target.value)}
            />
            <input type="password" className="form-control" placeholder="Password" />
            <button className="btn btn-success" onClick={handleLogin}>Login</button>
            <button className="btn btn-danger" onClick={() => toggleForm(null)}>Cancel</button>
          </div>
        </div>
      )}
      {form === 'register' && (
        <div className="container mt-3">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              onChange={e => setRegisterData({ ...registerData, username: e.target.value })}
            />
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              onChange={e => setRegisterData({ ...registerData, email: e.target.value })}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              onChange={e =>
                setRegisterData({ ...registerData, confirmPassword: e.target.value })
              }
            />
            <button className="btn btn-success" onClick={handleRegister}>Register</button>
            <button className="btn btn-danger" onClick={() => toggleForm(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}