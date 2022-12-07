// const app = require('./app');
// const dotenv =require('dotenv');
// const connectDatabase = require('./config/dbConfig');

// // config 
// dotenv.config({path:"config/config.env"});

// // Handling uncaught variable error
// process.on("uncaughtException", (err)=>{
//     console.log(`Error: ${err.message}`);
//     console.log(`Shutting down the server due to uncaught Exception`);
//     process.exit(1);
// });

// // Connecting to database 
// connectDatabase();
// // const server = app.listen(process.env.PORT, ()=>{
// //     console.log(`Server is working on http://localhost:${process.env.PORT}`);
// // });

// // handling mongodb connection rejected error
// process.on("unhandledRejection", (err)=>{
//     console.log(`Error: ${err.message}`);
//     console.log(`Shutting down the server due to unhandled promise rejection`);

//     server.close(()=>{
//         process.exit(1);
//     });
// });