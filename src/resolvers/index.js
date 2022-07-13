const userResolver = require('./user');
const taskResolver = require('./task');
const { GraphQlDateTime } = require('apollo-server-express');

const customDateScalarResolver = {
  Date: GraphQlDateTime,
};
module.exports = {
  userResolver,
  taskResolver,
  customDateScalarResolver,
};
