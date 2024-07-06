// src/pages/Logout.js
import { useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logoutUser } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    logoutUser();
    navigate('/login');
  }, [logoutUser, navigate]);

  return null;
};

export default Logout;
