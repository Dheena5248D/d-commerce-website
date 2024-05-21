const dotenv = require("dotenv");
const path = require('path')
dotenv.config({path:path.join(__dirname,"config/config.env")});

const  mongoose = require("mongoose");
const  connectDatabase =()=>{
    mongoose.connect(process.env.mongourl).then(console.log(`db connected on ${process.env.mongourl}`))
}

module.exports = connectDatabase;