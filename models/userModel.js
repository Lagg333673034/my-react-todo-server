const {Schema,model} = require('mongoose');

const userModel = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    passwordNeedRecover: {type: String, default: '0'},
    role: {type: String, required: true, default: 'user'},

});

module.exports = model("user",userModel);

