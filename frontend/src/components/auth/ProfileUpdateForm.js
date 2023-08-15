import React from 'react';

export default function ProfileUpdateForm({ profileInfo, setProfileInfo, handleProfileSubmit, setShowProfileForm }) {
  return (
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
        <button className="btn btn-dark" onClick={handleProfileSubmit}>Save</button>
        <button className="btn btn-gray" onClick={() => setShowProfileForm(false)}>Cancel</button>
      </div>
    </div>
  );
}

