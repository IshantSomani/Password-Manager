const mongoose = require('mongoose');

const connectDb = async ()=>{
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("Database is connected");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb;