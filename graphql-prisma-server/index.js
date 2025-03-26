const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client');
const { PubSub } = require('graphql-subscriptions');

const prisma = new PrismaClient();
const pubsub = new PubSub();
const app = express();

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
  }

  type Query {
    posts: [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    createPost(title: String!, content: String!): Post!
    updatePost(id: ID!, title: String, content: String): Post!
    deletePost(id: ID!): Post!
  }

  type Subscription {
    postCreated: Post
    postUpdated: Post
    postDeleted: Post
  }
`;

const resolvers = {
  Query: {
    posts: () => prisma.post.findMany(),
    post: (_, { id }) => prisma.post.findUnique({ where: { id: parseInt(id) } }),
  },
  Mutation: {
    createPost: async (_, args) => {
      const post = await prisma.post.create({ data: args });
      pubsub.publish('POST_CREATED', { postCreated: post });
      return post;
    },
    updatePost: async (_, { id, title, content }) => {
      const post = await prisma.post.update({
        where: { id: parseInt(id) },
        data: { title, content },
      });
      pubsub.publish('POST_UPDATED', { postUpdated: post });
      return post;
    },
    deletePost: async (_, { id }) => {
      const post = await prisma.post.delete({ where: { id: parseInt(id) } });
      pubsub.publish('POST_DELETED', { postDeleted: post });
      return post;
    },
  },
  Subscription: {
    postCreated: { subscribe: () => pubsub.asyncIterator('POST_CREATED') },
    postUpdated: { subscribe: () => pubsub.asyncIterator('POST_UPDATED') },
    postDeleted: { subscribe: () => pubsub.asyncIterator('POST_DELETED') },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(4002, () => {
    console.log(`🚀 GraphQL API: http://localhost:4002/graphql`);
  });
}

startServer();
