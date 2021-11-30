import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = (children: any) => {
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));

  if (!isLoggedIn) return <Navigate to="/login" />;

  return children;
};
