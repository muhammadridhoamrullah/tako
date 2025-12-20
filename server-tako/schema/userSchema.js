// TypeDefs

import { User } from "../models/users.js";

export const userTypeDefs = `#graphql

type User {
    _id: ID!
    name: String!
    email: String!
    createdAt: String!
}

input RegisterUserInput {
    name: String!
    email: String!
    password: String!

}

type ResponseMessage {
    message: String!
}

type Query {
    users: [User!]!
}

type Mutation {
    registerUser(input: RegisterUserInput!) : ResponseMessage!
}

`;

export const userResolvers = {
  Query: {
    users: async (_, __, context) => {
      const { db } = context;

      const user = await User.getAll(db);

      return user;
    },
  },
  Mutation: {
    registerUser: async (_, args, context) => {
      const { db } = context;
      const { input } = args;

      const regisUser = await User.register(db, input);

      return regisUser;
    },
  },
};
