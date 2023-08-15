import axios from 'axios';

export const handleLogin = async (localUsername, localPassword, setToken, setGreeting, setForm) => {
  try {
    const response = await axios.post('/api/login', {
      username: localUsername,
      password: localPassword,
    });

    if (response.data.access_token) {
      setToken(response.data.access_token);
      setGreeting(`Hello, ${localUsername}!`);
      setForm(null); // This line closes the login form
    } else {
      setGreeting(response.data.message || "Authentication failed!");
    }
  } catch (error) {
    if (error.response && error.response.data.message) {
      setGreeting(error.response.data.message);
    } else {
      console.error('Error during authentication', error);
      setGreeting("Authentication failed!");
    }
  }
};


export const handleRegister = async (registerData, setToken, setGreeting, setShowProfileForm, setForm) => {
    try {
      const response = await axios.post('/api/register', registerData);
  
      if (response.data.access_token) {
        setToken(response.data.access_token);
        setGreeting(`Hello, ${registerData.username}! Registration successful!`);
        setShowProfileForm(true);
        setForm(null);
      } else {
        setGreeting(response.data.message || "Registration failed!");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setGreeting(error.response.data.message);
      } else {
        console.error('Error during registration', error);
        setGreeting("Registration failed!");
      }
    }
  };


  export const handleLogout = (setToken, setGreeting) => {
    setToken(null);
    setGreeting(null);
    // Optionally, clear the token from local storage if it's stored there
    localStorage.removeItem('token');
  };