const express = require('express');
// const req = require('express/lib/request');

// // bring in the protect function from the auth middleware
const { protectRoute } = require('../middleware/auth.middleware.js');

// // import controllers
// const controller = require('../controllers/controller.js');
// const userController = require('../controllers/user.controller.js');
// const s3Controller = require('../controllers/s3.controller.js');
const projectsController = require('../controllers/projects.controller.js');
const indicatorsController = require('../controllers/indicators.controller.js');

// start router
const router = express.Router();
// user routes ***********************************************************************
router.route('/user').get((req, res, next) => {
  res.status(200).json({
    success: true,
    data: 'this is a sample user',
  });
});

// project routes ******************************************************
router
  .route('/projects')
  .get(protectRoute(), projectsController.getProjectsByUserId);
router
  .route('/project')
  .post(protectRoute(), projectsController.createProject)
  .put(protectRoute(), projectsController.updateProject);

router
  .route('/project/:id')
  // .delete(projectsController.deleteProject);
  .delete(protectRoute(), projectsController.deleteProject);

// indicator responses routes
router
  .route('/indicators/:session_id')
  .get(protectRoute(), indicatorsController.getIndicatorResponsesBySessionId);
router
  .route('/indicator')
  .post(protectRoute(), indicatorsController.createIndicatorResponse);

// report indicator response
router
  .route('/report/indicators/:session_id')
  .get(indicatorsController.getIndicatorResponsesBySessionId);

router
  .route('/report/project/:session_id')
  .get(projectsController.getProjectBySessionId);

module.exports = router;
