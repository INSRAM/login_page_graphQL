require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const typeDefs = require("./controller/typeDefs.js");
const resolvers = require("./controller/resolvers.js");
const { ApolloServer } = require("apollo-server-express");

const Port = process.env.Port;
const mongeURl = process.env.MONGODB_URL;

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app });
  // connection with MongoDB
  mongoose.connect(
    mongeURl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err;
      console.log("Connected to MongoDB!!!");
    }
  );
  app.listen(Port, () => {
    console.log(`Server is running on port ${Port}.`);
  });
}

startServer();
