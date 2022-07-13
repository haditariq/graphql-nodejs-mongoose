const { skip } = require('graphql-resolvers');
const TaskService = require('../../services/task');
module.exports.isAuthenticated = (_, __, { user }) => {
  const { email } = user;
  if (!email) {
    throw new Error('Access Denied! Please login to continue');
  }
  return skip;
};

module.exports.isTaskOwner = async (_, { id }, { user }) => {
  try {
    const task = await TaskService.getById(id);
    if (task && task.user.toString() == user._id.toString()) return skip;
    throw new Error("You don't have access to delete task.");
  } catch (err) {
    console.log('isTaskOwner', err);
    throw err;
  }
};
