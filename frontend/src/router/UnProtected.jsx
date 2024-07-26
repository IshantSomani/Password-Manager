import React, { useEffect } from 'react'
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';

const UnProtected = () => {
  const context = useOutletContext();
  const navigate = useNavigate();
  // console.log("context: ", context);
  // console.log("context.auth: ", context.auth);

  useEffect(()=>{
      if(context.auth){
          return navigate("/")
      }
  },[])

  return (
    <>
        <Outlet context={context} />
    </>
  )
}

export default UnProtected