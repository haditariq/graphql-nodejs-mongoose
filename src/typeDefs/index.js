const { gql } = require('apollo-server-express');

const userTypeDef = require('./user');
const taskTypeDef = require('./task');

const typeDefs = gql`
  scalar Date
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`;

module.exports = [
  typeDefs,
  userTypeDef,
  taskTypeDef,
];
