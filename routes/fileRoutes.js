const Router = require('express');
const router = new Router();
const fileController = require('../controllers/fileController');
const FILE_ROUTE = '/file';
const authMiddleware = require('../middlewares/authMiddleware');

router.post(`${FILE_ROUTE}`,authMiddleware, fileController.create);
router.delete(`${FILE_ROUTE}/:taskId/:fileNameUuid`,authMiddleware, fileController.delete);
router.get(`${FILE_ROUTE}/:taskId`,authMiddleware, fileController.getAll);
router.get(`${FILE_ROUTE}/:taskId/:fileNameUuid`,authMiddleware, fileController.getOne);

module.exports = router;