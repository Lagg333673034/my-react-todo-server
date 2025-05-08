//const DatabaseConnection = require('../db');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const mailService = require('./mailService');
const tokenService = require('./tokenService');
const UserView1 = require('../dataViews/userView1');
const ApiError = require('../exceptions/apiError');
const uuid = require('uuid');

class UserService {
    async registration(email,password,role){

        const candidate = await userModel.find({email:email}).exec();
        if(candidate && candidate.length>0){
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует1`);
        }

        const hashPassword = await bcrypt.hash(password, 3);

        const user = await userModel.create({
            email: email,
            password: hashPassword,
            role: role,
        });

        //await mailService.sendUserCreateMail(email);

        const userView1 = new UserView1(user); //email, id
        const tokens = tokenService.generateTokens({...userView1});
        const newUser = await tokenService.saveToken(userView1.id,tokens.refreshToken);

        return {...tokens, user: userView1}
    }
    async login(email,password){
        const user = await userModel.find({email:email}).exec();

        //console.log("user="+user+"=user.email="+user.email+"=user.password="+user.password);
        //console.log("===polzovatel ne naiden1");

        if(!user || user=="" || user.length<=0){
            //console.log("===polzovatel ne naiden2");
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} не найден`);
        }

        //console.log("password="+password+"=user[0].password="+user.password);

        const isPasswordEquals = await bcrypt.compare(password, user[0].password);
        if(!isPasswordEquals){
            throw ApiError.BadRequest(`Неверный пароль`);
        }

        const userView1 = new UserView1(user[0]);
        const tokens = tokenService.generateTokens({...userView1});
        const token = await tokenService.saveToken(userView1.id,tokens.refreshToken);

        return {...tokens, user: userView1}
    }
    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
    async refresh(refreshToken){

        if(!refreshToken){
            throw ApiError.UnauthorizedError();
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken);
        if(!userData || !tokenFromDB){
            throw ApiError.UnauthorizedError();
        }

        const user = await userModel.find({_id:userData.id}).exec();
        const userView1 = new UserView1(user[0]);
        
        const tokens = tokenService.generateTokens({...userView1});
        await tokenService.saveToken(userView1.id,tokens.refreshToken);
        return {...tokens, user: userView1}
    }


    async recoverPasswordEmail(email){
        const randomUuid = uuid.v4();

        /*const connection1 = new DatabaseConnection();
        connection1.open;
        const user = await userModel(connection1).update(
            {passwordNeedRecover: randomUuid},
            {where: {udln:null,email:email}
        });
        connection1.close;
        */

        const user = await userModel.findOneAndUpdate({
            email: email
        },{
            $set: {
                passwordNeedRecover: randomUuid
            },
        },{
            upsert: false,
        });

        await mailService.sendUserRecoverPasswordMail(email,randomUuid);
        
        return email;
    }

    
    async recoverPassword(randomUuid,password){
        if(randomUuid.length > 30){

            /*const connection1 = new DatabaseConnection();
            connection1.open;
            const user = await userModel(connection1).findOne({where: {udln:null,passwordNeedRecover:randomUuid}});
            connection1.close;*/

            const user = await userModel.find({passwordNeedRecover:randomUuid}).exec();
            if(!user){
                throw ApiError.BadRequest(`Пользователь не найден`);
            }

            const hashPassword = await bcrypt.hash(password, 3);

            /*const connection2 = new DatabaseConnection();
            connection2.open;
            await userModel(connection2).update(
                {password: hashPassword},
                {where: {udln:null,id:user.id}});
            connection2.close;*/


            const userUpdate = await userModel.findOneAndUpdate({
                passwordNeedRecover: randomUuid
            },{
                $set: {
                    password: hashPassword,
                    passwordNeedRecover: ""
                },
            },{
                upsert: false,
            });

            const userDto = new UserDto(userUpdate);
            const tokens = tokenService.generateTokens({...userDto});
            await tokenService.saveToken(userDto.id,tokens.refreshToken);
            return {...tokens, user: userDto}
        }
    }


}

module.exports = new UserService();






