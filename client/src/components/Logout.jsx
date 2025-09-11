import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await logout();
      console.log('User logged out');
      navigate('/login');
    })();
  }, [logout, navigate]);

  return <p>Logging you out...</p>;
};

export default Logout;