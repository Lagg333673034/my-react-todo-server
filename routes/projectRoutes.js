const Router = require('express');
const router = new Router();
const projectController = require('../controllers/projectController');
const PROJECTS_ROUTE = '/project';
const authMiddleware = require('../middlewares/authMiddleware');

router.post(`${PROJECTS_ROUTE}`,authMiddleware, projectController.create);
router.patch(`${PROJECTS_ROUTE}/:id`,authMiddleware, projectController.update);
router.delete(`${PROJECTS_ROUTE}/:id`,authMiddleware, projectController.delete);
router.get(`${PROJECTS_ROUTE}`,authMiddleware, projectController.getAll);
router.get(`${PROJECTS_ROUTE}/:projectId`,authMiddleware, projectController.getOne);


module.exports = router;