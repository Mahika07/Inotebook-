//date base se connect hone ke liye
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require('mongoose');
const uri = process.env.DB

const connectToMongoose = async () => {

    await mongoose.connect(uri, () => {
        console.log("connected to mongoose");
    })
}
module.exports = connectToMongoose;