import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedParent = () => {
    const [auth, setAuth] = useState(false);
    const [loginUser, setLoginUser] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const storedUser = localStorage.getItem('token');
        if (storedUser) {
            const decodedToken = jwtDecode(storedUser);
            console.log(decodedToken);
            setAuth(true);
            navigate("/");
            // console.log(auth);
            setLoginUser(decodedToken._id);
        } else {
            setAuth(false);
            navigate("/login");
            // console.log(auth);
        }
    }, [navigate]);

    return (
        <>
            <Outlet context={{auth, setAuth, loginUser, setLoginUser}}/>
        </>
    )
}

export default ProtectedParent;