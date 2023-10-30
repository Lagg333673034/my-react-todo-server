const mongoose = require('mongoose');
const taskModel = require('../models/taskModel');
const subtaskController = require('./subtaskController');
const commentController = require('./commentController');
const fileController = require('./fileController');

class TaskController{
    async create(req,res){
        try{
            let {projectId,newTask,description} = req.body;
            const task = await taskModel.create({
                projectId: projectId,
                number: newTask.number,
                title: newTask.title,
                description: newTask.description,
                dateCreate: newTask.dateCreate,
                timeInWork: newTask.timeInWork,
                dateFinish: newTask.dateFinish,
                priority: newTask.priority,
                status: newTask.status,
            });

            return res.json(task);
        }catch(e){
            console.log(e);
            res.send({message: "Server ERROR"});
        }
    }
    async update(req,res){
        try{
            const {id} = req.params;
            const task = req.body;

            if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No task with that ID');

            //const updatedTask = await taskModel.findByIdAndUpdate(id,task,{new:true});
            const updatedTask = await taskModel.findByIdAndUpdate(id,task);

            return res.json(updatedTask);
        }catch(e){
            console.log(e);
            res.send({message: "Server ERROR"});
        }
    }
    async delete(req,res){
        try{
            const {id} = req.params;
            if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No task with that ID');
            /*----------------------------------------------------------------------*/
            //delete children records
            subtaskController.deleteAll(id);
            commentController.deleteAll(id);
            fileController.deleteAll(id);
            /*----------------------------------------------------------------------*/
            const deleteTask = await taskModel.findByIdAndRemove(id);
            return res.json({message: "task was deleted successfully"});
        }catch(e){
            console.log(e);
            res.send({message: "Server ERROR"});
        }
    }
    async deleteAll(projectId){
        try{
            const tasks = await taskModel.find({projectId: projectId}).exec();
            tasks &&
            tasks.length>0 &&
            tasks.map(async(task) => {
                /*----------------------------------------------------------------------*/
                //delete children records
                subtaskController.deleteAll(task._id);
                commentController.deleteAll(task._id);
                fileController.deleteAll(task._id);
                /*----------------------------------------------------------------------*/
                const deleteTask = await taskModel.findByIdAndRemove(task._id);
            });
        }catch(e){
            console.log(e);
        }
    }
    async getAll(req,res){
        let {projectId} = req.params;
        let tasks = {};

        if(projectId && typeof projectId === "string" && projectId.length>5){
            tasks = await taskModel.find({projectId: projectId}).exec();
        }else{
            return res.status(404).send('No task with that projectId');
        }

        return res.json(tasks);
    }
    async getOne(req,res){
        let {projectId} = req.params;
        let {taskId} = req.params;
        let task = {};

        if(
            projectId && typeof projectId === "string" && projectId.length>5 &&
            taskId && typeof taskId === "string" && taskId.length>5
        ){
            task = await taskModel.find({_id: taskId, projectId: projectId}).exec();
        }else{
            return res.status(404).send('No task with that projectId or taskId');
        }

        return res.json(task);
    }
}

module.exports = new TaskController();
