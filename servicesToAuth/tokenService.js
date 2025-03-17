//const DatabaseConnection = require('../db');
const jwt = require('jsonwebtoken');
const tokenModel = require('../models/tokenModel');
//const config = require('config');
//const JWT_ACCESS_SECRET_KEY = config.get('JWT_ACCESS_SECRET_KEY');
//const JWT_REFRESH_SECRET_KEY = config.get('JWT_REFRESH_SECRET_KEY');
const JWT_ACCESS_SECRET_KEY = process.env.JWT_ACCESS_SECRET_KEY;
const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;




class TokenService {
    generateTokens(payload){
        //return payload;

        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET_KEY, {expiresIn: '1d'});//s,m,h,d
        //return accessToken;

        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET_KEY,{expiresIn: '30d'});
        return {
            accessToken,
            refreshToken
        }
    }
    validateAccessToken(token){
        try{
            const userData = jwt.verify(token, JWT_ACCESS_SECRET_KEY);
            return userData;
        }catch(e){
            return null;
        }
    }
    validateRefreshToken(token){
        try{
            const userData = jwt.verify(token, JWT_REFRESH_SECRET_KEY);
            return userData;
        }catch(e){
            return null;
        }
    }
    async saveToken(userId, refreshToken){
        const tokenData = await tokenModel.find({userId:userId}).exec();
        //return "===" + tokenData;

        let token = [];
        try{
            //esli token est, to nyjno ego obnovit, 

            //return tokenData;
            
            if(tokenData && tokenData.length > 0){
                token = await tokenModel.findOneAndUpdate({
                    userId: userId
                },{
                    $set: {
                        refreshToken: refreshToken
                        },
                },{
                    upsert: true,
                });
            }else{
                //esli net, to sozdat noviy
                token = await tokenModel.create({
                    userId: userId,
                    refreshToken: refreshToken
                });
            }
            //return token;
        }catch(e){
            return "ERROR:"+e;
        }

        return token;
    }
    async removeToken(refreshToken){
        //return "refreshToken="+refreshToken;
        const tokenData = await tokenModel.findOneAndDelete({refreshToken:refreshToken}).exec();
        return tokenData;
    }
    async findToken(refreshToken){
        const tokenData = await tokenModel.find({refreshToken:refreshToken}).exec();

        //return "tokenData="+tokenData;
        return tokenData;
    }
}

module.exports = new TokenService();