// LoginForm.js


import React from 'react';



export default function LoginForm({ localUsername, localPassword, setLocalUsername, setLocalPassword, handleLogin, toggleForm }) {
  return (
    <div className="container mt-3">
      <div className="form-group">
      <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={localUsername} // Bind value to localUsername state
              onChange={e => setLocalUsername(e.target.value)} // Update localUsername state
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={localPassword} // Bind value to localPassword state
              onChange={e => setLocalPassword(e.target.value)} // Update localPassword state
            />
            <button className="btn btn-dark" onClick={handleLogin}>Login</button>
            <button className="btn  btn-gray" onClick={() => toggleForm(null)}>Cancel</button>
          </div>
        </div>

  );
}
