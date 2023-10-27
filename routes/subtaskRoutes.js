const Router = require('express');
const router = new Router();
const subtaskController = require('../controllers/subtaskController');
const SUBTASKS_ROUTE = '/subtask';

router.post(`${SUBTASKS_ROUTE}`,subtaskController.create);
router.patch(`${SUBTASKS_ROUTE}/:id`,subtaskController.update);
router.delete(`${SUBTASKS_ROUTE}/:id`,subtaskController.delete);
router.get(`${SUBTASKS_ROUTE}/:taskId`,subtaskController.getAll);
router.get(`${SUBTASKS_ROUTE}/:taskId/:subtaskId`,subtaskController.getOne);

module.exports = router;