const {Schema,model} = require('mongoose');

const subtaskModel = new Schema({
    taskId: {type: String, },
    description: {type: String, },
    done: {type: String, },
});

module.exports = model("subtask",subtaskModel);