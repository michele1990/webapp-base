import React, { useState } from 'react';

export default function Header({ username, setUsername, greeting, setGreeting, token, setToken, users, setUsers }) {
  const [activeSection, setActiveSection] = useState(1); // default to section 1

  return (
    <div className="container mt-4 text-dark">
      {users.length > 0 && (
        <div className="mb-4">
          <h3>List of Users:</h3>
          <ul className="list-group">
            {users.map((user, index) => (
              <li key={index} className="list-group-item">{user}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="row text-center mb-3">
        <nav>
          <button onClick={() => setActiveSection(1)} className={`btn ${activeSection === 1 ? 'btn-dark' : 'btn-secondary'} mx-2`}>Enchanted Forest</button>
          <button onClick={() => setActiveSection(2)} className={`btn ${activeSection === 2 ? 'btn-dark' : 'btn-secondary'} mx-2`}>Mystic Mountains</button>
          <button onClick={() => setActiveSection(3)} className={`btn ${activeSection === 3 ? 'btn-dark' : 'btn-secondary'} mx-2`}>Hidden Caves</button>
        </nav>
      </div>
      <div className="row justify-content-center">
        {activeSection === 1 && (
          <section className="col-md-6 bg-light p-3 rounded text-center">
            <h2>Enchanted Forest</h2>
            <p>Explore a world filled with ancient trees, magical creatures, and hidden treasures.</p>
            <img src="https://picsum.photos/200" alt="Enchanted Forest" className="img-fluid rounded"/>
          </section>
        )}
        {activeSection === 2 && (
          <section className="col-md-6 bg-light p-3 rounded text-center">
            <h2>Mystic Mountains</h2>
            <p>Travel through towering peaks, discovering secret passages and the wisdom of the mountain spirits.</p>
            <img src="https://picsum.photos/200" alt="Mystic Mountains" className="img-fluid rounded"/>
          </section>
        )}
        {activeSection === 3 && (
          <section className="col-md-6 bg-light p-3 rounded text-center">
            <h2>Hidden Caves</h2>
            <p>Unearth the secrets hidden within the dark caves, guarded by mysterious forces and legendary creatures.</p>
            <img src="https://picsum.photos/200" alt="Hidden Caves" className="img-fluid rounded"/>
          </section>
        )}
      </div>
    </div>
  );
};
