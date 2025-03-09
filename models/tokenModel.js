const {Schema,model} = require('mongoose');

const tokenModel = new Schema({
    userId: {type: String,  required: true},
    refreshToken: {type: String, required: true},
});

module.exports = model("token",tokenModel);

