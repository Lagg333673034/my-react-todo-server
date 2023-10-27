const {Schema,model} = require('mongoose');

const projectModel = new Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, },
});

module.exports = model("project",projectModel);