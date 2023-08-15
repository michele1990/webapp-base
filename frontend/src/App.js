import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';

import { handleLogin, handleRegister, handleLogout } from './utils/authFunctions';
import {handleProfileSubmit, fetchProfile, updateProfile} from './utils/handleProfile';



function App() {
  const [username, setUsername] = useState('');
  const [greeting, setGreeting] = useState('');
  const [info, setInfo] = useState('');
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(null);


  return (
    
    
    <div className="container-fluid">
  
    <Header 
            username={username}
            setUsername={setUsername}
            greeting={greeting}
            setGreeting={setGreeting}
            token={token}
            setToken={setToken}
            users={users}
            setUsers={setUsers}
            info={info}
            setInfo={setInfo}
            handleLogin={handleLogin}
            handleRegister={handleRegister}
            handleProfileSubmit={handleProfileSubmit}
            handleLogout={handleLogout}
            fetchProfile={fetchProfile}
            updateProfile={updateProfile}>
            </Header>

    <Body
            username={username}
            setUsername={setUsername}
            greeting={greeting}
            setGreeting={setGreeting}
            token={token}
            setToken={setToken}
            users={users}
            setUsers={setUsers}></Body>

    <Footer></Footer>

    </div>
  );
}

export default App;


