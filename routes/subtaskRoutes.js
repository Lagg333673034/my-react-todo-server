const Router = require('express');
const router = new Router();
const subtaskController = require('../controllers/subtaskController');
const SUBTASKS_ROUTE = '/subtask';
const authMiddleware = require('../middlewares/authMiddleware');

router.post(`${SUBTASKS_ROUTE}`,authMiddleware, subtaskController.create);
router.patch(`${SUBTASKS_ROUTE}/:id`,authMiddleware, subtaskController.update);
router.delete(`${SUBTASKS_ROUTE}/:id`,authMiddleware, subtaskController.delete);
router.get(`${SUBTASKS_ROUTE}/:taskId`,authMiddleware, subtaskController.getAll);
router.get(`${SUBTASKS_ROUTE}/:taskId/:subtaskId`,authMiddleware, subtaskController.getOne);

module.exports = router;