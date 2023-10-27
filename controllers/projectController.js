const mongoose = require('mongoose');
const projectModel = require('../models/projectModel');
const taskModel = require("../models/taskModel");


class ProjectController{
    async create(req,res){
        try{
            let body = req.body;
            const project = await projectModel.create(body);

            return res.json(project);
        }catch(e){
            console.log(e);
            res.send({message: "Server ERROR"});
        }
    }
    async update(req,res){
        try{
            const {id} = req.params;
            const project = req.body;

            if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No project with that ID');

            //const updatedProject = await projectModel.findByIdAndUpdate(id,project,{new:true});
            const updatedProject = await projectModel.findByIdAndUpdate(id,project);

            return res.json(updatedProject);
        }catch(e){
            console.log(e);
            res.send({message: "Server ERROR"});
        }
    }
    async delete(req,res){
        try{
            const {id} = req.params;

            if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No project with that ID');

            const deleteTasks = await taskModel.deleteMany({"projectId":id});
            const deleteProject = await projectModel.findByIdAndRemove(id);

            return res.json({message: "project was deleted successfully"});
        }catch(e){
            console.log(e);
            res.send({message: "Server ERROR"});
        }
    }
    async getAll(req,res){
        const projects = await projectModel.find();
        return res.json(projects);
    }
    async getOne(req,res){
        let {projectId} = req.params;
        let project = {};

        if(projectId && typeof projectId === "string" && projectId.length>5){
            project = await projectModel.find({_id: projectId}).exec();
        }else{
            return res.status(404).send('No project with that ID');
        }

        return res.json(project);
    }
}

module.exports = new ProjectController();