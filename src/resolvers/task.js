const TaskService = require('../services/task');
const UserService = require('../services/user');
const { combineResolvers } = require('graphql-resolvers');
const { isAuthenticated, isTaskOwner } = require('./middleware');
module.exports = {
  Query: {
    tasks: combineResolvers(isAuthenticated, async (_, __, { user }) => {
      try {
        return await TaskService.getByUserId(user._id);
      } catch (err) {
        console.log('Query get tasks', err);
      }
    }),
    task: combineResolvers(isAuthenticated, isTaskOwner, async (_, { id }) => {
      try {
        return await TaskService.getById(id);
      } catch (err) {
        console.log('Get task errot');
        throw err;
      }
    }),
  },
  Mutation: {
    createTask: combineResolvers(
      isAuthenticated,
      async (_, { input }, { user }) => {
        const { name } = input;
        try {
          const task = await TaskService.createTask({
            name,
            user: user._id,
          });
          await UserService.addTaskToList(user._id, task._id);
          return task;
        } catch (err) {
          console.log('CreateTask Mutate Error', err);
          throw err;
        }
      }
    ),
  },
  Task: {
    user: async ({ user }) => {
      return await UserService.getUserById(user);
    },
  },
};
