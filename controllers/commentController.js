const mongoose = require('mongoose');
const commentModel = require('../models/commentModel');

class CommentController{
    async create(req,res){
        try{
            let {taskId,commentId,newComment} = req.body;
            const comment = await commentModel.create({
                taskId: taskId,
                commentId: commentId,
                dateCreate: newComment.dateCreate,
                username: newComment.username,
                message: newComment.message,
            });

            return res.json(comment);
        }catch(e){
            console.log(e);
            res.send({message: "Server ERROR"});
        }
    }
    async update(req,res){
        try{
            const {id} = req.params;
            const comment = req.body;

            if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No comment with that ID');

            const updatedComment = await commentModel.findByIdAndUpdate(id,comment);

            return res.json(updatedComment);
        }catch(e){
            console.log(e);
            res.send({message: "Server ERROR"});
        }
    }
    async delete(req,res){
        try{
            const {id} = req.params;
            if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No comment with that ID');
            /*-------------------------------------------------------------------------------------------*/
            let allComments = await commentModel.find().exec();
            let allSubcomments = [];
            const showSubComments = (comments,comment_id) => {
                let temp_comments = comments;
                return(
                    temp_comments
                        .filter(c => c.commentId === comment_id)
                        .map(c => {allSubcomments.push(String(c._id)), showSubComments(allComments,String(c._id))})
                )
            };
            showSubComments(allComments,id);
            allSubcomments.map(async(comment_id) => await commentModel.findByIdAndRemove(comment_id));
            /*-------------------------------------------------------------------------------------------*/
            const deleteMainComment = await commentModel.findByIdAndRemove(id);

            return res.json({message: "comment was deleted successfully"});
        }catch(e){
            console.log(e);
            res.send({message: "Server ERROR"});
        }
    }
    async deleteAll(taskId){
        try{
            await commentModel.deleteMany({"taskId":taskId});
        }catch(e){
            console.log(e);
        }
    }
    async getAll(req,res){
        let {taskId} = req.params;
        let {commentId} = req.params;
        let comments = null;

        if(!commentId || typeof commentId !== "string" || commentId.length < 5){
            comments = await commentModel.find({
                taskId: (taskId && typeof taskId === "string" && taskId.length > 5) ? taskId : '',
            }).exec();
        }
        if(commentId && typeof commentId === "string" && commentId.length > 5){
            comments = await commentModel.find({
                taskId: (taskId && typeof taskId === "string" && taskId.length > 5) ? taskId : '',
                commentId: (commentId && typeof commentId === "string" && commentId.length > 5) ? commentId : "",
            }).exec();
        }

        return res.json(comments);
    }
    async getOne(req,res){
        let {taskId} = req.params;
        let {commentId} = req.params;
        let {id} = req.params;

        let comments = await commentModel.find({
            taskId: (taskId && typeof taskId === "string" && taskId.length > 5) ? taskId : '',
            commentId: (commentId && typeof commentId === "string" && commentId.length > 5) ? commentId : "",
            _id: (id && typeof id === "string" && id.length > 5) ? id : "",
        }).exec();

        return res.json(comment);
    }
}

module.exports = new CommentController();
