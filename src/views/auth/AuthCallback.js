import React from 'react';
import { Navigate, useLocation } from 'react-router';

const AuthCallback = () => {
  const location = useLocation();
  localStorage.setItem('bundly-token', location.search.slice(7));
  return <Navigate to="/" />;
};

export default AuthCallback;
