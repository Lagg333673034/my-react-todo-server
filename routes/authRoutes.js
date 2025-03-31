const Router = require('express');
const router = new Router();
const authController = require('../controllers/authController');
const {body} = require('express-validator');
const AUTH_ROUTE = '/auth';


router.post(`${AUTH_ROUTE}/registration`,
    //body('email').isEmail(),
    //body('password').isLength({min: 3, max: 32}),
    authController.registration
);
router.post(`${AUTH_ROUTE}/login`,authController.login);
router.post(`${AUTH_ROUTE}/logout`,authController.logout);
router.get(`${AUTH_ROUTE}/refresh`,authController.refresh);
router.post(`${AUTH_ROUTE}/recoverPasswordEmail`,authController.recoverPasswordEmail);
router.post(`${AUTH_ROUTE}/recoverPassword`,authController.recoverPassword);


module.exports = router;
