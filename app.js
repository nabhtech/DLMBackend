const express = require('express');
const dotenv =require('dotenv');
const connectDatabase = require('./config/dbConfig');
const cors = require('cors');

// Route imports
const classRoute = require('./routes/classRoute');
const subjectRoute = require('./routes/subjectRoute');
const chapterRoute = require('./routes/chapterRoute');
const topicRoute = require('./routes/topicRoute');
const questionRoute = require('./routes/questionRoute');
const userRoute = require('./routes/userRoute');
const paytmRoute = require('./routes/paytmRoute');
const testDetailRoute = require('./routes/testDetailRoute');
const studentRoute = require('./routes/studentRoute');
const studentTestRoute = require('./routes/studentTestRoute');
const schoolSessionRoute = require('./routes/schoolSessionRoute')
const cookieParser = require('cookie-parser');
const cron = require('node-cron');
const studentModel = require('./models/studentModel');


const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Import middleware
const errorMiddleware = require('./middleware/error');

// config 
dotenv.config({path:"config/config.env"});

// Handling uncaught variable error
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught Exception`);
    process.exit(1);
});

// Connecting to database 
connectDatabase();
// const server = app.listen(process.env.PORT, ()=>{
//     console.log(`Server is working on http://localhost:${process.env.PORT}`);
// });

// handling mongodb connection rejected error
// process.on("unhandledRejection", (err)=>{
//     console.log(`Error: ${err.message}`);
//     console.log(`Shutting down the server due to unhandled promise rejection`);

//     server.close(()=>{
//         process.exit(1);
//     });
// });

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Nabh D.L.M API',
            version: '1.0.0'
        },
        servers: [
            {
                url:'http://localhost:8080/'
            },
            {
                url:'https://nabh-dlm-backend.herokuapp.com/'
            },
            {
                url:'https://wh3dpzvf74.execute-api.us-east-2.amazonaws.com/production/'
            }

        ]
    },
    apis: [
        './routes/classRoute.js',
        './routes/subjectRoute.js',
        './routes/chapterRoute.js',
        './routes/topicRoute.js',
        './routes/questionRoute.js',
        './routes/testDetailRoute.js',
        './routes/userRoute.js',
        './routes/studentTestRoute.js',
        './routes/studentRoute.js',
        './routes/schoolSessionRoute.js'
    ]
}

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Routes for class api
app.use('', classRoute);
app.use('', subjectRoute);
app.use('', chapterRoute);
app.use('', topicRoute);
app.use('', questionRoute);
app.use('', userRoute);
app.use('',studentRoute);
app.use('',studentTestRoute);
app.use('', paytmRoute);
app.use('', testDetailRoute);
app.use('',schoolSessionRoute)

// Middleware for error
app.use(errorMiddleware);

// This is cron job for making student subscription inactive when subscription ends
cron.schedule('50 59 23 * * *', async () => {

    const student = await studentModel.find({
        $and: [
            {
                subscriptionStatus: {$eq: 'active'}
            },
            {
                subscriptionEndDate: {$lte: new Date()}
            }
        ]
    },
    { _id: 1, subscriptionStatus: 1, subscriptionEndDate: 1 })

    student = await studentModel.bulkWrite(
        student.map((data) => (
            {
                updateOne: {
                    filter: { _id: data._id },
                    update: { $set: { subscriptionStatus: 'inactive' } }
                }
            })
        )
    )
},
{
    timezone: 'Asia/Kolkata'
})

module.exports = app;
// module.exports.handler = serverless(app);