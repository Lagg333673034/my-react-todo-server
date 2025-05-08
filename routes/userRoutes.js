const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const USERS_ROUTE = '/user';

router.post(`${USERS_ROUTE}`, authMiddleware, userController.create);
router.patch(`${USERS_ROUTE}/:id`, authMiddleware, userController.update);
router.delete(`${USERS_ROUTE}/:id`, authMiddleware, userController.delete);
router.get(`${USERS_ROUTE}`, authMiddleware, userController.getAll);
router.get(`${USERS_ROUTE}/:userId`, authMiddleware, userController.getOne);


module.exports = router;

