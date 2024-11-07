const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const connectDB = require("./utils/db");

const port = process.env.PORT || 3000;

const app = express();

const authRouter = require("./router/auth-router");

const corsOptions = {
    origin: 'http://localhost:5173', // Update with your React app's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth",authRouter);

connectDB().then( ()=>{
    app.listen(port,(req,res)=>{    
        console.log(`server running on port ${port}`);
    });
});