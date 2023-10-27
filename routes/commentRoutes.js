const Router = require('express');
const router = new Router();
const commentController = require('../controllers/commentController');
const COMMENT_ROUTE = '/comment';

router.post(`${COMMENT_ROUTE}`,commentController.create);
router.patch(`${COMMENT_ROUTE}/:id`,commentController.update);
router.delete(`${COMMENT_ROUTE}/:id`,commentController.delete);
router.get(`${COMMENT_ROUTE}/:taskId/:commentId`,commentController.getAll);
router.get(`${COMMENT_ROUTE}/:taskId/:commentId/:id`,commentController.getOne);

module.exports = router;