import React from 'react';
import { Navigate } from 'react-router-dom';

const Logout: React.FC = () => {
  return <Navigate to="/login" replace />;
};

export default Logout;
