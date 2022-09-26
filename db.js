//date base se connect hone ke liye
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require('mongoose');
const uri = process.env.db

const connectToMongoose = () => {

    mongoose.connect(uri, () => {
        console.log("connected to mongoose");
    })
}
module.exports = connectToMongoose;