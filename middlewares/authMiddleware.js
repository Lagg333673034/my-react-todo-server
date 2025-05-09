const ApiError = require('../exceptions/apiError');
const tokenService = require('../servicesToAuth/tokenService');

module.exports = function (req, res, next){
    try{
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader){
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken){
            return next(ApiError.UnauthorizedError());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if(!userData){
            return next(ApiError.UnauthorizedError());
        }

        req.user = userData;
        
        //console.log("req.cookies==")
        //console.log(req.cookies)


        next();
    }catch(e){
        return next(ApiError.UnauthorizedError());
    }

};



