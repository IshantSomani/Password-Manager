import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import Input from './Input'; // Assuming Input is correctly implemented and imported
import axios from 'axios';
import { fetchData, STATUS } from '../../../redux/slice/passwordSlice';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

const api = `${import.meta.env.VITE_API_URL}/userData`;

const DetailComp = () => {
    const context = useOutletContext();
    const { detailid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products, status } = useSelector((state) => state.passwordList);
    // console.log(detailid)
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [detailData, setDetailData] = useState({});
    const [user, setUser] = useState(false);
    const storedUser = localStorage.getItem('token');
    const decodedToken = jwtDecode(storedUser);

    useEffect(() => {
        // const storedUser = JSON.parse(localStorage.getItem('token'));
        if (decodedToken) {
            setUser(decodedToken);
        }
    }, [])

    useEffect(() => {
        dispatch(fetchData(context.loginUser));
    }, [dispatch, detailid]);

    useEffect(() => {
        const foundDetailData = products.find((item) => item._id === detailid);
        // console.log("foundDetailData", foundDetailData);
        if (foundDetailData) {
            setDetailData(foundDetailData);
        } else {
            // console.log(`User with detailid ${detailid} not found.`);
            navigate(`/${detailid}`);
            // navigate(`/`);
        }
    }, [products, detailid, navigate]);

    const handleChange = (name, value) => {
        setDetailData((prevState) => ({
            ...prevState,
            [name]: value,
            loginEmail: user.loginEmail,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${api}/updateUserData/${detailid}`, detailData);
            // console.log("response", response);
            dispatch(fetchData(context.loginUser))
            toggleEdit()
        } catch (error) {
            console.log(error);
        }
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    if (status === STATUS.LOADING) {
        return (
            <div className="flex justify-center items-center h-[89vh] bg-gray-900">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="h-[88vh] bg-zinc-950 flex flex-col justify-center py-10 sm:px-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-400">
                    Social ID PassCode
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {status === STATUS.FAILED ? (
                        <div className="text-center text-red-500">Error: Failed to load data.</div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 ">
                            <Input
                                type="text"
                                name="Name"
                                value={detailData.appName}
                                onChange={(value) => handleChange('appName', value)}
                                disabled={true}
                                placeholder="Enter your name"
                                icon={<svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>}
                            />
                            <Input
                                type="text"
                                name="Username"
                                value={detailData.userName}
                                onChange={(value) => handleChange('userName', value)}
                                disabled={!isEditing}
                                placeholder="Enter your username"
                                icon={<svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>}
                            />
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    name="Password"
                                    value={detailData.password}
                                    onChange={(value) => handleChange('password', value)}
                                    disabled={!isEditing}
                                    placeholder="Enter your password"
                                    icon={<svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>}
                                    rightIcon={
                                        detailData.password && (
                                            <button
                                                type="button"
                                                onClick={toggleShowPassword}
                                                className="text-gray-300 hover:text-gray-200 focus:outline-none"
                                            >
                                                {showPassword ? (
                                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                ) : (
                                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                    </svg>
                                                )}
                                            </button>
                                        )
                                    }
                                />

                            </div>
                            <div>
                                {isEditing ? (
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={toggleEdit}
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        Edit
                                    </button>
                                )}
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailComp;