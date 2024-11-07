require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

const connectDB = async(req,res) => {
    try{
        await mongoose.connect(URI);
        console.log("successfully connected to database");
    }catch(error){
        console.log("database connection failed");
        process.exit(0);
    }   
};

module.exports = connectDB;