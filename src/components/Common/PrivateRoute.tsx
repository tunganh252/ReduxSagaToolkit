import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = (props: any) => {
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));

  if (!isLoggedIn) return <Navigate to="/login" />;

  return <React.Fragment>{props.children}</React.Fragment>;
};
