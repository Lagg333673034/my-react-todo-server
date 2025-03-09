const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

class UserController{
    async create(req,res){
        try{
            //let body = req.body;
            //const user = await userModel.create(body);

            const {email} = req.body;
            const {password} = req.body;
            const {passwordNeedRecover} = req.body;
            const {role} = req.body;
            
            const candidate = await userModel.find({email:email}).exec();
            if(candidate && candidate.length>0){
                return res.send({message: "user with this email already exists"});
            }

            const hashPassword = await bcrypt.hash(password, 3);

            const user = await userModel.create({
                email: email,
                password: hashPassword,
                passwordNeedRecover: passwordNeedRecover,
                role: role,
            });

            return res.json(user);
        }catch(e){
            console.log(e);
            res.send({message: "Cannot create user. Server ERROR"});
        }
    }
    async update(req,res){
        try{
            const {id} = req.params;
            const {email} = req.body;
            let {password} = req.body;
            const {passwordNeedRecover} = req.body;
            const {role} = req.body;

        
            
            //return res.json("" + email + password);

            const candidate = await userModel.find({
                email:email,
                _id: { $ne: id } 
            }).exec();
            if(candidate && candidate.length>0){
                return res.send({message: "user with this email already exists"});
            }

            
            let user = [];
            if(!password || password.length==0 || password == "********"){
                //return res.json("1" + email + password);
                user = await userModel.findByIdAndUpdate(id,{
                    email: email,
                    role: role,
                });
            }
            if(password && password.length>0 && password != "********"){
                const hashPassword = await bcrypt.hash(password, 3);

                /*const isPasswordEquals = await bcrypt.compare("1234", hashPassword);
                if(isPasswordEquals){
                    return res.json("the password is correct");
                }else{
                    return res.json("the password is incorrect");
                }*/

                //return res.json("2" + email + password + hashPassword);
                user = await userModel.findByIdAndUpdate(id,{
                    email: email,
                    password: hashPassword,
                    role: role,
                });
            }


            return res.json(user);
        }catch(e){
            console.log(e);
            res.send({message: "Server ERROR"});
        }
    }
    async delete(req,res){
        try{
            const {id} = req.params;
            if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user with that ID');

            const deleteUser = await userModel.findByIdAndRemove(id);
            return res.json({message: "user was deleted successfully"});
        }catch(e){
            console.log(e);
            res.send({message: "Server ERROR"});
        }
    }
    async getAll(req,res){
        const users = await userModel.find();
        return res.json(users);
    }
    async getOne(req,res){
        let {userId} = req.params;
        let user = {};

        if(userId && typeof userId === "string" && userId.length>5){
            user = await userModel.find({_id: userId}).exec();
        }else{
            return res.status(404).send('No user with that ID');
        }

        return res.json(user);
    }

}

module.exports = new UserController();