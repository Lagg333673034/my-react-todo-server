const Router = require('express');
const router = new Router();
const fileController = require('../controllers/fileController');
const FILE_ROUTE = '/file';

router.post(`${FILE_ROUTE}`,fileController.create);
router.delete(`${FILE_ROUTE}/:taskId/:fileNameUuid`,fileController.delete);
router.get(`${FILE_ROUTE}/:taskId`,fileController.getAll);
router.get(`${FILE_ROUTE}/:taskId/:fileNameUuid`,fileController.getOne);

module.exports = router;