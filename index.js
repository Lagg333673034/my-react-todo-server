const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const router = require('./routes/index');
const fileUpload = require('express-fileupload');
const path = require('path');
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

//app.use(express.static(path.join(__dirname, '../client/build')));
/*app.get('/', (req, res) => {
    res.send('<h1>Home page</h1>');
});*/
/*app.all('*', (req, res) => {

});*/

app.use('/', router);

const start = async () => {
    try{
        await mongoose.connect(config.get('dbURL'));
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        });
    }catch(e){
        console.log(e);
    }
};
start();
