const express = require('express');
const cors = require('cors'); 
const app = express();
const dotenv =  require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const {connect} = require('./config/db.js');
const route =require('./routes/index.route.js')

dotenv.config();
connect();



app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes
route(app)

app.listen(8000, ()=>{
    console.log("Sever is running");
})