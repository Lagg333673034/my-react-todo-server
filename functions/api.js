const express = require('express');
const mongoose = require('mongoose');
const router = require('../routes/index');
const fileUpload = require('express-fileupload');
const path = require('path');
const serverless= require('serverless-http');
const config = require('config');
const PORT = config.get('serverPort');
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin: http://localhost:3000");
    res.header("Access-Control-Allow-Origin: http://localhost:5000");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers: *");
    next();
});
app.use(express.json());
app.use(fileUpload());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/',router);
mongoose.connect(config.get('dbURL'));

module.exports.handler = serverless(app);