const express = require('express');
const connectDb = require('./config/db');
const cors = require('cors');
const routes = require('./routes/userData');
require("dotenv").config();

const app = express();


const port = 3000;
app.use(express.json());
app.use(cors());
connectDb();

app.use('/userData', routes)
app.listen(port, '0.0.0.0', ()=>{
    console.log(`Server is running on ${port}`);
})