const {Schema,model} = require('mongoose');

const taskModel = new Schema({
    projectId: {type: String, },
    number: {type: String, },
    title: {type: String, },
    description: {type: String, },
    dateCreate: {type: String, },
    timeInWorkStart: {type: String, },
    timeInWorkFinish: {type: String, },
    timeInWork: {type: String, },
    dateFinish: {type: String, },
    priority: {type: String, },
    status: {type: String, },
});

module.exports = model("task",taskModel);