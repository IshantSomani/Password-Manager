import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { IoAdd, IoRemoveCircleSharp, IoSend } from "react-icons/io5";
import { Box, Fab, Modal, Typography, Button } from '@mui/material';
import { jwtDecode } from 'jwt-decode';

const api = `${import.meta.env.VITE_API_URL}/userData`;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
};

const RightSider = () => {
    const context = useOutletContext();
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({});
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        // Check for user in local storage
        const storedUser = localStorage.getItem('token');
        if (storedUser) {
            const decodedToken = jwtDecode(storedUser);
            // console.log(decodedToken);
            setUser(decodedToken);
        }
    }, [])

    const fetchData = async () => {
        if (!user) return;

        try {
            const response = await axios.get(`${api}/getAllUserData/${context.loginUser}`);
            const userData = response.data.map((item, i) => {
                return { ...item, id: i + 1 }
            });
            setData(userData)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData((prevFormData) => ({ ...prevFormData, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;

        try {
            const response = await axios.post(`${api}/createUserData`, {
                ...formData,
                loginEmail: user.loginEmail
            });
            handleClose();
            fetchData();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleDelete = async (id) => {
        if (!user) return;

        try {
            await axios.delete(`${api}/deleteUserData/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <div className='mx-auto overflow-auto h-[89vh]'>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-3 gap-6">
                    {data.map((item) => (
                        <div
                            key={item._id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link to={`${item._id}`} className="block h-full">
                                <div className="bg-purple-800 rounded-lg shadow-md overflow-hidden h-full transition-all duration-300 hover:shadow-xl">
                                    <div className="p-6 relative">
                                        <button
                                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors duration-300"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleDelete(item._id);
                                            }}
                                        >
                                            <IoRemoveCircleSharp className="text-2xl" />
                                        </button>
                                        <div className="flex items-center justify-center mb-4">
                                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                                <span className="text-2xl font-bold text-gray-600">
                                                    {item.appName.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                        <h2 className="text-xl font-semibold text-center text-white mb-2 capitalize">
                                            {item.appName}
                                        </h2>
                                        <p className="text-sm text-gray-200 text-center">
                                            Click to view details
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>


            {/* Add Button */}
            <div className='absolute bottom-5 right-5'>
                <Box sx={{ '& > :not(style)': { m: 1 } }} onClick={handleOpen}>
                    <Fab color='secondary' aria-label='add'>
                        <IoAdd className='text-3xl' />
                    </Fab>
                </Box>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='flex flex-col gap-6 border-0'>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Details
                    </Typography>
                    <section className='flex justify-center'>
                        <form className="w-72 flex justify-center items-center flex-col gap-5" onSubmit={handleSubmit}>
                            <div className="relative w-full min-w-[200px] h-10">
                                <input
                                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                    placeholder=" "
                                    name="appName"
                                    onChange={handleChange}
                                />
                                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                                    App Name
                                </label>
                            </div>
                            <div className="relative w-full min-w-[200px] h-10">
                                <input
                                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                    placeholder=" "
                                    name="userName"
                                    onChange={handleChange}
                                />
                                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                                    Username
                                </label>
                            </div>
                            <div className="relative w-full min-w-[200px] h-10">
                                <input
                                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                    placeholder=" "
                                    name="password"
                                    type="password"
                                    onChange={handleChange}
                                />
                                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                                    Password
                                </label>
                            </div>
                            <Button
                                variant="contained"
                                type='submit'
                                color='secondary'
                                endIcon={<IoSend />}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                Submit
                            </Button>
                        </form>
                    </section>
                </Box>
            </Modal>
        </>
    )
}

export default RightSider;
