const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User_ {
    id: ID
    email: String
    password: String
    userType: String
  }
  type token_ {
    token: String
  }
  type Query {
    getAllPost: [User_]
    getProfileData(token: String): [User_]
  }

  input UserInput {
    email: String
    password: String
  }
  type Mutation {
    createUser(user: UserInput): String
    loginUser(user: UserInput): String
  }
`;

module.exports = typeDefs;
