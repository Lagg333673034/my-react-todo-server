const {Schema,model} = require('mongoose');

const commentModel = new Schema({
    taskId: {type: String, required: true, },
    commentId: {type: String, },
    dateCreate: {type: String, },
    username: {type: String, },
    message: {type: String, },
});

module.exports = model("comment",commentModel);