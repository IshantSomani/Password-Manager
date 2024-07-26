// ProtectedRoutes.js
import React, { useEffect } from 'react';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';

const ProtectedRoutes = () => {
  const context = useOutletContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!context.auth) {
      console.log("User authenticated...");
      navigate("/");
    }
  }, [context.auth, navigate]);

  // if (!context.auth) {
  //   return null; 
  // }

  return <Outlet context={context} />;
}

export default ProtectedRoutes;