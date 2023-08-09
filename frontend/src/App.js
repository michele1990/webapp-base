import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// const API_BASE_URL = 'http://localhost:5001/api';


function App() {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [greeting, setGreeting] = useState('');

  const handleAuthenticate = async () => {
    const tokenResponse = await axios.post('/api/login', { username });
    setToken(tokenResponse.data.access_token);
  };

  const handleGetGreeting = async () => {
    if (!token) {
      console.log('Not authenticated');
      return;
    }

    const greetingResponse = await axios.get('/api/user', {
      headers: { Authorization: `Bearer ${token}` }
    });

    setGreeting(greetingResponse.data.message);
  };

  return (
    <div className="container-fluid">

<nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">NorthWestWind</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
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
              <button className="btn btn-primary btn-sm" onClick={handleAuthenticate}>
                Authenticate
              </button>
            </li>
            <li className="nav-item ml-2">
              <button className="btn btn-success btn-sm" onClick={handleGetGreeting}>
                Get Greeting
              </button>
            </li>
            <li className="nav-item ml-2 navbar-text">{greeting}</li>
          </ul>
        </div>
      </nav>
      <div className="container mt-4">
        <div className="row">
          <section className="col-md-4">
            <h2>Section 1</h2>
            <p>Content for section 1. You can replace this with your database data.</p>
          </section>
          <section className="col-md-4">
            <h2>Section 2</h2>
            <p>Content for section 2. You can replace this with your database data.</p>
          </section>
          <section className="col-md-4">
            <h2>Section 3</h2>
            <p>Content for section 3. You can replace this with your database data.</p>
          </section>
        </div>
      </div>
      <footer className="bg-light text-center py-4 mt-4">
        <p>Footer content here. You can add links, copyright notice, or any other information.</p>
      </footer>
    </div>
  );
}

export default App;