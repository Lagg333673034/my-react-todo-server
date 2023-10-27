const Router = require('express');
const router = new Router();
const projectController = require('../controllers/projectController');
const PROJECTS_ROUTE = '/project';

router.post(`${PROJECTS_ROUTE}`,projectController.create);
router.patch(`${PROJECTS_ROUTE}/:id`,projectController.update);
router.delete(`${PROJECTS_ROUTE}/:id`,projectController.delete);
router.get(`${PROJECTS_ROUTE}`,projectController.getAll);
router.get(`${PROJECTS_ROUTE}/:projectId`,projectController.getOne);


module.exports = router;