// export default SignOut;

import React from 'react';
import useAuth from '../hooks/useAuth'; // ✅ default import

export default function SignOut() {
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log('Signed out successfully');
    } catch (err) {
      console.error('Sign out failed:', err);
    }
  };

  return (
    <div>
      <h2>Sign Out</h2>
      {user && <p>Signed in as {user.name}</p>}
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}