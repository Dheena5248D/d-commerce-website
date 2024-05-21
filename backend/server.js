const dotenv = require("dotenv");
const app = require("./app");
const path = require("path");
const connectDatabase = require('./config/database')
dotenv.config({path:path.join(__dirname,"config/config.env")});
connectDatabase();

const server = app.listen(process.env.port, ()=>{
    console.log(`the app is listening on ${process.env.port} on ${process.env.node_env}`);
})

process.on('unhandledRejection', (err)=>{
    console.log(`error ${err.message}`);
    console.log(`shutting down due to unhandled rejection`);
    server.close(()=>{
        process.exit(1)
    })
} )

process.on('uncaughtException', (err)=>{
    console.log(`error ${err.message}`);
    console.log(`shutting down due to unhandled rejection`);
    server.close(()=>{
        process.exit(1)
    })
} )