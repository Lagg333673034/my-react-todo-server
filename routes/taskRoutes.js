const Router = require('express');
const router = new Router();
const taskController = require('../controllers/taskController');
const TASKS_ROUTE = '/task';

router.post(`${TASKS_ROUTE}`,taskController.create);
router.patch(`${TASKS_ROUTE}/:id`,taskController.update);
router.delete(`${TASKS_ROUTE}/:id`,taskController.delete);
router.get(`${TASKS_ROUTE}/:projectId`,taskController.getAll);
router.get(`${TASKS_ROUTE}/:projectId/:taskId`,taskController.getOne);

module.exports = router;