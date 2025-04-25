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


const cors = require('cors');


const corsOptions = {
    optionsSuccessStatus: 200, // For legacy browser support
    credentials: true, // This is important.
    origin: "https://silver-cucurucho-d41282.netlify.app",
    //origin: "http://localhost:3000",
};
app.use(cors(corsOptions));



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
job.start();
