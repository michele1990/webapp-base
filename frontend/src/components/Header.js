// Header.js

import React, { useState } from 'react';
import axios from 'axios';

import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';
import ProfileUpdateForm from './auth/ProfileUpdateForm';


export default function Header({
  greeting,
  setGreeting,
  info,
  setInfo,
  token,
  setToken,
  handleLogin,
  handleRegister,
  handleProfileSubmit,
  handleLogout,
  fetchProfile,
  updateProfile
}) {
  const [form, setForm] = useState(null);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [localUsername, setLocalUsername] = useState('');
  const [localPassword, setLocalPassword] = useState('');
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showProfileUpdateForm, setShowProfileUpdateForm] = useState(false);

  const [profileInfo, setProfileInfo] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
    about_me: '', // You may also include this field if you plan to use it in the profile update
  });
  
  const toggleForm = (formType) => {
    if (form === formType) {
      setForm(null);
    } else {
      setForm(formType);
    }
  };

  const handleShowProfileForm = async (username) => {
    try {
      const response = await fetchProfile(token, username);
      setProfileInfo({
        first_name: response.first_name,
        last_name: response.last_name,
        phone: response.phone,
        address: response.address,
        about_me: response.about_me,
      });
      setShowProfileUpdateForm(true); // Set the new state variable to true
    } catch (error) {
      console.error('Error fetching profile', error);
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
          {!token && (
            <>
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
            </>
          )}
          {token && (
            <div>
              <button className="btn btn-info btn-sm btn-dark" onClick={() => handleLogout(setToken, setGreeting)}>Logout</button>
            </div>
          )}
          {token && (
            <li className="nav-item ml-2">
              <button className="btn btn-warning btn-sm btn-dark" onClick={() => handleShowProfileForm(localUsername)}>
                Update Profile
              </button>
            </li>
          )}
          <li className="nav-item ml-2 navbar-text">{greeting}</li>
          <li className="nav-item ml-2 navbar-text">{info}</li>
        </ul>
      </div>
    </nav>     {form === 'login' && <LoginForm 
      localUsername={localUsername} 
      localPassword={localPassword} 
      setLocalUsername={setLocalUsername} 
      setLocalPassword={setLocalPassword} 
      handleLogin={() => handleLogin(localUsername, localPassword, setToken, setGreeting, setForm)} 
      toggleForm={toggleForm}
    />}

    {form === 'register' && <RegisterForm 
      registerData={registerData} 
      setRegisterData={setRegisterData} 
      handleRegister={() => handleRegister(registerData, setToken, setGreeting, setShowProfileForm, setForm)} 
      toggleForm={toggleForm}
    />}

    {showProfileForm && <ProfileUpdateForm 
      profileInfo={profileInfo} 
      setProfileInfo={setProfileInfo} 
      handleProfileSubmit={() => handleProfileSubmit(profileInfo, token, setInfo, setShowProfileForm)} 
      setShowProfileForm={setShowProfileForm} 
    />}

    {showProfileUpdateForm && <ProfileUpdateForm 
      profileInfo={profileInfo} 
      setProfileInfo={setProfileInfo} 
      handleProfileSubmit={() => handleProfileSubmit(profileInfo, token, setInfo, setShowProfileUpdateForm)} 
      setShowProfileForm={setShowProfileUpdateForm} // Update this to setShowProfileUpdateForm
    />}


  </div>
  );
}