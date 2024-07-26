import React, { useState } from 'react'
import { FaArrowRight } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const api = `${import.meta.env.VITE_API_URL}/userData`

export default function Signup() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  // console.log(formData);
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api}/signup`, formData);
      // console.log(response.data);
      navigate('/login')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className='bg-zinc-950 '>
      <div className="flex items-center h-screen  justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-16">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
              width="100" height="100" viewBox="0 0 246.000000 217.000000"
              preserveAspectRatio="xMidYMid meet">
              <g transform="translate(0.000000,217.000000) scale(0.100000,-0.100000)"
                fill="#fff" stroke="none">
                <path d="M886 1721 c-158 -49 -292 -94 -297 -102 -5 -8 -9 -165 -9 -349 0
                -371 4 -400 62 -497 73 -122 283 -292 478 -388 l76 -37 90 45 c228 115 410
                271 480 411 l39 80 3 350 c2 193 1 360 -2 372 -3 12 -14 25 -23 29 -46 18
                -578 175 -592 174 -9 0 -146 -40 -305 -88z m371 -260 c62 -29 93 -82 100 -173
                6 -73 6 -75 37 -84 52 -15 66 -58 66 -207 0 -135 -10 -176 -49 -197 -12 -6
                -105 -10 -230 -10 l-209 0 -31 26 -31 26 0 155 0 155 29 29 c16 16 38 29 49
                29 17 0 19 7 19 68 -1 154 119 242 250 183z"/>
                <path d="M1112 1382 c-31 -29 -48 -90 -40 -143 3 -23 5 -24 111 -27 l107 -3 0
                51 c0 95 -41 150 -111 150 -27 0 -45 -8 -67 -28z"/>
                <path d="M1137 1032 c-48 -53 9 -122 78 -96 37 15 38 82 1 106 -20 14 -63 8
                -79 -10z"/></g></svg>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-white/80">Sign up to create account</h2>
          <p className="mt-2 text-center text-base text-gray-400">Already have an account?{' '}
            <Link to={'/login'} title="" className="font-medium text-white/90 transition-all duration-200 hover:underline" >Login</Link>
          </p>
          <form onSubmit={handleSubmit} method="POST" className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="text-base font-medium text-gray-200">
                  {' '}Full Name{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="text-base font-medium text-gray-200">
                  {' '}Email address{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                    type="email"
                    placeholder="Email"
                    name="loginEmail"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium text-gray-200">
                    {' '}Password{' '}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                    type="password"
                    placeholder="Password"
                    name="loginPassword"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-white/90 px-3.5 py-2.5 font-semibold leading-7 text-black hover:bg-white/80"
                  >Create Account <FaArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
