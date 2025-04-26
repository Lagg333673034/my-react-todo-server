const Router = require('express');
const router = new Router();
const commentController = require('../controllers/commentController');
const COMMENT_ROUTE = '/comment';
const authMiddleware = require('../middlewares/authMiddleware');

router.post(`${COMMENT_ROUTE}`,authMiddleware, commentController.create);
router.patch(`${COMMENT_ROUTE}/:id`,authMiddleware, commentController.update);
router.delete(`${COMMENT_ROUTE}/:id`,authMiddleware, commentController.delete);
router.get(`${COMMENT_ROUTE}/:taskId/:commentId`,authMiddleware, commentController.getAll);
router.get(`${COMMENT_ROUTE}/:taskId/:commentId/:id`,authMiddleware, commentController.getOne);

module.exports = router;