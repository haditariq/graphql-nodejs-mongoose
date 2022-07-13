const { TaskModel } = require('../models');

module.exports.getByUserId = async (id) => await TaskModel.find({ user: id });

module.exports.createTask = async ({ name, user }) => {
  return await new TaskModel({ name, user }).save();
};

module.exports.getById = async (id) => await TaskModel.findById(id);
