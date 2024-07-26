import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from '../components/Home'
import RightSider from '../sharedComp/rightSideHomeComp/RightSider'
import DetailComp from '../sharedComp/rightSideHomeComp/detailComp/DetailComp'
import RandomPassCode from '../sharedComp/LeftSideHomeComp/leftSideDownComp/RandomPassCode'
import Login from '../components/authenticationPage/Login'
import Signup from '../components/authenticationPage/Signup'
import ProtectedRoutes from './ProtectedRoutes'
import ProtectedParent from './ProtectedParent'
import UnProtected from './UnProtected'

const Router = createBrowserRouter([
    {
        element: <ProtectedParent />,
        children: [
            {
                element: <UnProtected />,
                children: [
                    {
                        path: '/login',
                        element: <Login />,
                    },

                    {
                        path: '/signup',
                        element: <Signup />
                    },
                ]
            },
            {
                element: <ProtectedRoutes />,
                children: [
                    {
                        path: '/',
                        element: <Home />,
                        children: [
                            {
                                path: '/',
                                element: <RightSider />
                            },
                            {
                                path: '/:detailid',
                                element: <DetailComp />
                            },
                            {
                                path: '/password-generator',
                                element: <RandomPassCode />
                            },
                        ]

                    },
                  
                ]
            },

        ]
    },


])

export default Router