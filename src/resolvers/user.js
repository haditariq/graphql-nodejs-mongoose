const UserService = require('../services/user');
const TaskService = require('../services/task');
const jwt = require('jsonwebtoken');

const { combineResolvers } = require('graphql-resolvers');
const { isAuthenticated } = require('../resolvers/middleware');

module.exports = {
  Query: {
    users: async () => await UserService.getAll(),
    user: combineResolvers(isAuthenticated, async (_, __, { user }) => {
      try {
        return await UserService.getUserById(user._id);
      } catch (err) {
        console.log('Fetch user by id error!');
        throw err;
      }
    }),
  },
  Mutation: {
    signup: async (_, { input }) => {
      const { email } = input;
      try {
        let exists = await UserService.emailExsits(email);
        if (exists) throw new Error('Email already in use.');
        const user = await UserService.register(input);
        return user;
      } catch (err) {
        console.log('User sign up error:', err.message);
        throw err;
      }
    },
    login: async (_, { input }) => {
      const { email, password } = input;
      try {
        let exists = await UserService.emailExsits(email);
        if (!exists) throw new Error('Invalid user ema il.');
        const user = await UserService.login({ email, password });
        const token = jwt.sign({ user }, process.env.jwtSecret, {
          expiresIn: '1d',
        });
        return { token };
      } catch (err) {
        console.log('User login error:', err.message);
        throw err;
      }
    },
  },
  User: {
    tasks: async ({ id }) => await TaskService.getByUserId(id),
  },
};
