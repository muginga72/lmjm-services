// import { useState } from 'react';
// import API from '../utils/api';
// import useAuth from '../hooks/useAuth';

// const AuthForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [mode, setMode] = useState('login');
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post(`/auth/${mode}`, { email, password });
//       login(res.data.token);
//     } catch (err) {
//       console.error('Auth failed:', err.response?.data?.error || err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
//       <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
//       <button type="submit">{mode === 'login' ? 'Login' : 'Register'}</button>
//       <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
//         Switch to {mode === 'login' ? 'Register' : 'Login'}
//       </button>
//     </form>
//   );
// };

// export default AuthForm;

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthForm() {
  const { register, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'register') {
        await register(email, password);
        setMode('login');
      } else {
        await login(email, password);
      }
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
      <h2>{mode === 'login' ? 'Sign In' : 'Register'}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">{mode === 'login' ? 'Sign In' : 'Register'}</button>
      <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
        {mode === 'login' ? 'Need an account? Register' : 'Already registered? Sign In'}
      </button>
    </form>
  );
}