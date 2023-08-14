import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';

export default function Header({ username, setUsername, greeting, setGreeting, token, setToken, users, setUsers }) {


  const handleAuthenticateAndGreet = async () => {
    try {
      const response = await axios.post('/api/login', { username });

      if (response.data.access_token) {
        setToken(response.data.access_token);
        setGreeting(`Hello, ${username}!`);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setGreeting(error.response.data.message);
      } else {
        console.error('Error during authentication', error);
      }
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

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">NorthWestWind.org</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item ml-2 navbar-text">{greeting}</li>
          <GoogleLogin
            clientId="651236571845-lv9cr9m7cve4mb9hvl92dmc85rqkq2n3.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={response => handleGoogleLogin(response)}
            onFailure={response => console.error('Google Login Failed:', response)}
          />
          <li className="nav-item">
            <input
              type="text"
              className="form-control form-control-sm"
              style={{ width: '150px' }}
              placeholder="Enter username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </li>
          <li className="nav-item ml-2">
            <button className="btn btn-primary btn-sm" onClick={handleAuthenticateAndGreet}>
              Authenticate
            </button>
          </li>
          <li className="nav-item ml-2">
            <button className="btn btn-info btn-sm" onClick={handleGetUsers}>
              Get Users
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
