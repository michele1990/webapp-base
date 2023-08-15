// RegisterForm.js

import React from 'react';

export default function RegisterForm({ registerData, setRegisterData, handleRegister, toggleForm }) {
  return (
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
        <button className="btn btn-dark" onClick={handleRegister}>Register</button>
        <button className="btn btn-gray" onClick={() => toggleForm(null)}>Cancel</button>
      </div>
    </div>
  );
}