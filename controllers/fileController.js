const mongoose = require('mongoose');
const fileModel = require('../models/fileModel');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

class FileController{
    async create(req,res){
        try{
            let {taskId} = req.body;
            let {file} = req.files;

            let fileExtension = file.name.split('.').pop();
            let fileName = Buffer.from(file.name, 'latin1').toString('utf8');
            let fileNameUuid = uuid.v4() + '.' + fileExtension;

            file.mv(path.resolve(__dirname, '..', 'static', fileNameUuid));

            const uploadFile = await fileModel.create({
                taskId: taskId,
                fileName: fileName,
                fileNameUuid: fileNameUuid,
            });

            return res.json(uploadFile);
        }catch(e){
            console.log(e);
            res.send({message: "Server ERROR"});
        }
    }
    async delete(req,res){
        try{
            let {taskId} = req.params;
            const {fileNameUuid} = req.params;

            let fullPath = String(path.resolve(__dirname, '..', 'static', fileNameUuid));
            fs.unlink(fullPath, ()=>{});

            await fileModel.findOneAndRemove({ taskId:taskId, fileNameUuid:fileNameUuid });
            //console.log(fileNameUuid);
            return res.json({message: "file was deleted successfully"});
        }catch(e){
            console.log(e);
            res.send({message: "Server ERROR"});
        }
    }
    async getAll(req,res){
        let {taskId} = req.params;

        let files = await fileModel.find({
            taskId: (taskId && typeof taskId === "string" && taskId.length > 5) ? taskId : 'null',
        }).exec();

        return res.json(files);
    }
    async getOne(req,res){
        let {taskId} = req.params;
        let {fileNameUuid} = req.params;

        let fullPath = String(path.resolve(__dirname, '..', 'static', fileNameUuid));
        //console.log("=="+fullPath);

        if(fs.existsSync(fullPath)){
            return res.download(fullPath,fileNameUuid)
        }
        return res.status(400).json({message:'download error'});
    }
}

module.exports = new FileController();
