import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';

function App() {
  const [username, setUsername] = useState('');
  const [greeting, setGreeting] = useState('');
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(null);


  const handleAuthenticateAndGreet = async () => {
    try {
      const response = await axios.post('/api/login', { username });
  
      if (response.data.access_token) {
        setToken(response.data.access_token);
        // You might want to set the greeting here too based on the response
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
              // You can add additional error handling here if needed
            }
          };
          
  const handleGoogleLogin = async (googleResponse) => {
            const tokenId = googleResponse.tokenId;
            // Qui puoi inviare il tokenId al tuo server backend
          };

  return (
    
    
    <div className="container-fluid">
    <link rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
    crossorigin="anonymous" />

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">NorthWestWind.org</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
          <li className="nav-item ml-2 navbar-text">{greeting}</li>
          <GoogleLogin
          clientId="651236571845-lv9cr9m7cve4mb9hvl92dmc85rqkq2n3.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={response => handleGoogleLogin(response)}
          onFailure={response => console.error('Google Login Failed:', response)}/> 
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
      <div className="container mt-4">
  {users.length > 0 && (
      <div className="mb-4">
        <h3>List of Users:</h3>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </div>
    )}
    </div>
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


