const { UserModel } = require('../models');

exports.register = async (input) => {
  try {
    const { name, email, password } = input;
    const userDoc = new UserModel({
      name,
      email,
      password,
    });
    return await userDoc.save();
  } catch (e) {
    console.log('user signup error');
  }
};

exports.getUserById = async (id) => await UserModel.findById(id);

exports.getAll = async () => await UserModel.find();

exports.login = async ({ email, password }) => {
  return await UserModel.findOne({ email, password });
};

exports.addTaskToList = async (id, taskid) => {
  const user = await UserModel.findById(id);
  user.tasks.push(taskid);
  await user.save();
  return user;
};

exports.emailExsits = async (email) => await UserModel.findOne({ email });
