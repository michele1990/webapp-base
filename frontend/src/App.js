import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [greeting, setGreeting] = useState('');

  const handleSubmit = async () => {
    const tokenResponse = await axios.post('/api/login', { username });
    const token = tokenResponse.data.access_token;

    await axios.post('/api/user', { username }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const greetingResponse = await axios.get('/api/user', {
      headers: { Authorization: `Bearer ${token}` }
    });

    setGreeting(greetingResponse.data.message);
  };

  return (
    <div>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
      <h1>{greeting}</h1>
    </div>
  );
}

export default App;
