const mongoose = require('mongoose');
const subtaskModel = require('../models/subtaskModel');

class SubtaskController{
    async create(req,res){
        try{
            let {taskId,newSubtask} = req.body;
            const subtask = await subtaskModel.create({
                taskId: taskId,
                description: newSubtask.description,
            });

            return res.json(subtask);
        }catch(e){
            console.log(e);
            res.send({message: "Server ERROR"});
        }
    }
    async update(req,res){
        try{
            const {id} = req.params;
            const subtask = req.body;

            if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No subtask with that ID');

            const updatedSubtask = await subtaskModel.findByIdAndUpdate(id,subtask);

            return res.json(updatedSubtask);
        }catch(e){
            console.log(e);
            res.send({message: "Server ERROR"});
        }
    }
    async delete(req,res){
        try{
            const {id} = req.params;

            if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No subtask with that ID');

            const deleteSubtask = await subtaskModel.findByIdAndRemove(id);

            return res.json({message: "subtask was deleted successfully"});
        }catch(e){
            console.log(e);
            res.send({message: "Server ERROR"});
        }
    }
    async deleteAll(taskId){
        try{
            await subtaskModel.deleteMany({"taskId":taskId});
        }catch(e){
            console.log(e);
        }
    }
    async getAll(req,res){
        let {taskId} = req.params;
        let subtasks = {};

        if(taskId && typeof taskId === "string" && taskId.length>5){
            subtasks = await subtaskModel.find({taskId: taskId}).exec();
        }else{
            return res.status(404).send('No subtasks with that projectId');
        }

        return res.json(subtasks);
    }
    async getOne(req,res){
        let {taskId} = req.params;
        let {subtaskId} = req.params;
        let subtask = {};

        if(
            taskId && typeof taskId === "string" && taskId.length>5 &&
            subtaskId && typeof subtaskId === "string" && subtaskId.length>5
        ){
            subtask = await taskModel.find({_id: subtaskId, taskId: taskId}).exec();
        }else{
            return res.status(404).send('No subtask with that taskId or subtaskId');
        }

        return res.json(subtask);
    }
}

module.exports = new SubtaskController();
