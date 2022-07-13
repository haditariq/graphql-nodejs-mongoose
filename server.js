require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const { userResolver, taskResolver } = require('./src/resolvers');
const typeDefs = require('./src/typeDefs');
const { verifyUser } = require('./src/helper/context');

const main = async () => {
  const app = express();

  await mongoose
    .connect(process.env.dburi)
    .then((_) => console.log('Database connected...'));

  app.use(express.json());
  app.use(cors());

  const apolloServer = new ApolloServer({
    resolvers: [userResolver, taskResolver],
    typeDefs,
    context: async ({ req }) => {
      await verifyUser(req);
      return { user: req.user };
    },
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  app.listen(process.env.port, () => {
    console.log(`Server listening @ ${process.env.port}`);
    console.log(`graphql available @ ${apolloServer.graphqlPath}`);
  });
};

main();
