// // import user model
const { ProjectsModel } = require('../models/projects.model.js');
const { IndicatorsModel } = require('../models/indicators.model.js');

// init projects model
const projectsModel = new ProjectsModel();
const indicatorsModel = new IndicatorsModel();

exports.getProjectsByUserId = async (req, res, next) => {
  const userId = req.payload.sub;
  try {
    const projects = await projectsModel.getProjectsByUserId(userId);
    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getProjectBySessionId = async (req, res, next) => {
  // const userId = req.payload.sub;
  const session_id = req.params.session_id;
  // console.log(session_id);
  try {
    const projects = await projectsModel.getProjectBySessionId(session_id);
    // let projects = 'projects';
    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.createProject = async (req, res, next) => {
  const body = req.body;
  body.userId = req.payload.sub;
  body.user_name = req.payload.name;
  body.email = req.payload.email;
  try {
    const projects = await projectsModel.createProject(body);
    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.updateProject = async (req, res, next) => {
  const body = req.body;
  body.userId = req.payload.sub;
  try {
    const projects = await projectsModel.updateProject(body);
    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.deleteProject = async (req, res, next) => {
  const obj = { id: req.params.id };
  obj.userId = req.payload.sub;
  try {
    const project = await projectsModel.deleteProject(obj);
    res.status(200).json({
      success: true,
      msg: 'you deleted project: ' + obj.id,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
