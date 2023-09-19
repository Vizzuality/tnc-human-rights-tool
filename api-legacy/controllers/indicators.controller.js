// // import user model
const { IndicatorsModel } = require('../models/indicators.model.js');

// init projects model
const indicatorsModel = new IndicatorsModel();

exports.sum = (a, b) => {
  return a + b;
};

exports.getIndicatorResponsesBySessionId = async (req, res, next) => {
  const session_id = req.params.session_id;
  try {
    const projects = await indicatorsModel.getIndicatorsBySessionId(session_id);
    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createIndicatorResponse = async (req, res, next) => {
  const body = req.body;
  try {
    const indicator = await indicatorsModel.createIndicatorResponse(body);
    console.log(indicator);
    res.status(200).json({
      success: true,
      data: indicator,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
