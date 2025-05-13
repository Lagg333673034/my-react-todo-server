require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const fileUpload = require('express-fileupload');
const path = require('path');


const SERVER_PORT = process.env.SERVER_PORT;
const DB_URL = process.env.DB_URL;
const CLIENT_HOST = process.env.CLIENT_HOST;



const app = express();
const cookieParser = require('cookie-parser');
const job = require('./cron');
const errorMiddleware = require('./middlewares/errorMiddleware');



/*
const cors = require('cors');
const corsOptions = {
    optionsSuccessStatus: 200, // For legacy browser support
    credentials: true, // This is important.
    origin: "https://silver-cucurucho-d41282.netlify.app",
    //origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
*/

//v2
app.use(function(req, res, next) {
    //const allowedOrigins = ['http://localhost:3000'];
    const allowedOrigins = ['https://silver-cucurucho-d41282.netlify.app'];

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
         res.setHeader('Access-Control-Allow-Origin', origin);
         res.setHeader("Cross-Origin-Opener-Policy", origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE, PATCH");
    next();
});




app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static(path.resolve(__dirname, 'static')));

app.use('/', router);

app.use(errorMiddleware);

const start = async () => {
    try{
        await mongoose.connect(DB_URL);
        app.listen(SERVER_PORT, () => {
            console.log(`Server started on port ${SERVER_PORT}`)
        });
    }catch(e){
        console.log(e);
    }
};
start();

//job.start();

