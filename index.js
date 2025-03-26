require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const fileUpload = require('express-fileupload');
const path = require('path');

//const config = require('config');
//const PORT = config.get('serverPort');
const SERVER_PORT = process.env.SERVER_PORT;
const DB_URL = process.env.DB_URL;
const CLIENT_HOST = process.env.CLIENT_HOST;

const app = express();
const cookieParser = require('cookie-parser');
const job = require('./cron');
const errorMiddleware = require('./middlewares/errorMiddleware');



/*const cors = require('cors');
app.use(cors({
    credentials: true,
    //origin: "http://localhost:3000"
    origin: `http://${HOST}:3000`
}));*/

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://'+CLIENT_HOST);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});




app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static(path.resolve(__dirname, 'static')));
//app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/', router);

app.use(errorMiddleware);

const start = async () => {
    try{
        /*await mongoose.connect(config.get('dbURL'));
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        });*/
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


