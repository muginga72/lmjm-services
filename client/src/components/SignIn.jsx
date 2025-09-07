// import React, { useState } from 'react';
// import useAuth from '../hooks/useAuth'; // default import, no curly braces

// export default function SignIn() {
//   const { signIn } = useAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await signIn(email, password);
//       console.log('Signed in successfully');
//     } catch (err) {
//       console.error('Sign in failed:', err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button 
//       type="submit"
//       style={{
//           borderRadius: '8px',
//           fontWeight: 'bold',
//           color: "secondary",
//           marginLeft: "8px"
//         }}

//       >Sign In</button>
//     </form>
//   );
// }

import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';

export default function SignIn() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Sign in failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
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
      <button
        type="submit"
        style={{
          borderRadius: '8px',
          fontWeight: 'bold',
          backgroundColor: '#ccc',
          padding: '10px',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Sign In
      </button>
    </form>
  );
}