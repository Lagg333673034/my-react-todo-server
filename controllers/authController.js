const authService = require('../servicesToAuth/authService');
const {validationResult} = require('express-validator');
//const ApiError = require('../exceptions/apiError');

class AuthController{
    async registration(req,res,next){
        try{
            const errors = validationResult(req);
            //console.log(errors.errors[0].msg); // good
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
            }

            const {email,password} = req.body;
            const userData = await authService.registration(email,password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
            return res.json(userData);
        }catch (e){
            next(e);
        }
    }
    async login(req,res,next){
        try{
            const {email,password} = req.body;
            //console.log("email="+email+"=password="+password);
            
            const userData = await authService.login(email,password);
            if(userData && userData.refreshToken && userData.refreshToken != "undefined"){
                res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
                return res.json(userData);
            }else{
                return res.json(null);
            }

        }catch (e){
            next(e);
        }
    }
    async logout(req,res,next){
        try{
            //return res.json("123");
            //return res.json(req.cookies);
            const {refreshToken} = req.cookies;
            //return res.json(refreshToken);

            const token = await authService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        }catch (e){
            next(e);
        }
    }

    //logout rabotaet, berem sledyshyy fynkciy. --- a ety stroky mojno ydalit ili zakomentit

    async refresh(req,res,next){
        try{
            const {refreshToken} = req.cookies;
            const userData = await authService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
            return res.json(userData);
        }catch (e){
            next(e);
        }
    }


    //dve nijnie fynkcii poka chto ne trogaem

    async recoverPasswordEmail(req,res,next){
        try{
            const {email} = req.body;
            const userEmail = await authService.recoverPasswordEmail(email);
            return res.json(userEmail);
        }catch (e){
            next(e);
        }
    }
    async recoverPassword(req,res,next){
        try{
            const {randomUuid,password} = req.body;
            const userData = await authService.recoverPassword(randomUuid,password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
            return res.json(userData);
        }catch (e){
            next(e);
        }
    }
}

module.exports = new AuthController();