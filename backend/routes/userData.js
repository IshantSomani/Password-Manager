const express = require('express');
const { 
    getAllUserData, 
    createUserData, 
    signup, login, 
    updateUserData, 
    deleteUserData, 
    updatePassword, 
} = require('../controller/userData');

const routes = express.Router();

routes.get('/getAllUserData/:id', getAllUserData);  // http://localhost:3000/userData/getAllUserData
routes.post('/createUserData', createUserData); // http://localhost:3000/userData/createUserData
routes.put('/updateUserData/:id', updateUserData);  // http://localhost:3000/userData/updateUserData/
routes.post('/signup', signup); // http://localhost:3000/userData/signup
routes.post('/login', login);   // http://localhost:3000/userData/login
routes.delete('/deleteUserData/:id', deleteUserData);   // http://localhost:3000/userData/deleteUserData/
routes.put('/updatePassword/:id', updatePassword);  // http://localhost:3000/userData/updatePassword/

module.exports = routes;


// {
//     "name": "john_doe",
//     "loginPassword": "myPassword",
//     "loginEmail": "john@example.com"
// }
  
// {
//     "appName": "myApp4",
//     "userName": "john_doe",
//     "password": "myPassword",
//     "loginEmail": "john@example.com"
// }