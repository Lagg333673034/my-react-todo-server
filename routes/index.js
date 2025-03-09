const Router = require('express');
const router = new Router();


const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const taskRoutes = require('./taskRoutes');
const subtaskRoutes = require('./subtaskRoutes');
const commentRoutes = require('./commentRoutes');
const fileRoutes = require('./fileRoutes');


router.use('/api',authRoutes);
router.use('/api',userRoutes);
router.use('/api',projectRoutes);
router.use('/api',taskRoutes);
router.use('/api',subtaskRoutes);
router.use('/api',commentRoutes);
router.use('/api',fileRoutes);

module.exports = router;