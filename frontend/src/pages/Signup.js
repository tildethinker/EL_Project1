// signup page

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const data = await apiService.post('/auth/register', { username, email, password });
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setError('Error registering user');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <p>{error}</p>}
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Signup;
