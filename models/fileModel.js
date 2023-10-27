const {Schema,model} = require('mongoose');

const fileModel = new Schema({
    taskId: {type: String, required: true,},
    fileName: {type: String, },
    fileNameUuid: {type: String, required: true, unique: true},
});

module.exports = model("file",fileModel);