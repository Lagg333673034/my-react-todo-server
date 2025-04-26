const Router = require('express');
const router = new Router();
const taskController = require('../controllers/taskController');
const TASKS_ROUTE = '/task';
const authMiddleware = require('../middlewares/authMiddleware');

router.post(`${TASKS_ROUTE}`,authMiddleware, taskController.create);
router.patch(`${TASKS_ROUTE}/:id`,authMiddleware, taskController.update);
router.delete(`${TASKS_ROUTE}/:id`,authMiddleware, taskController.delete);
router.get(`${TASKS_ROUTE}/:projectId`,authMiddleware, taskController.getAll);
router.get(`${TASKS_ROUTE}/:projectId/:taskId`,authMiddleware, taskController.getOne);

module.exports = router;