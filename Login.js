import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleLogin = async () => {
    try {
      const res = await axios.post('/api/login', form);
      localStorage.setItem('token', res.data.token);
      onLogin();
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div>
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
