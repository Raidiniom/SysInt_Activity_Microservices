const { ApolloServer, gql } = require('apollo-server');
const { PubSub } = require('graphql-subscriptions');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const pubsub = new PubSub();

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
`;

const resolvers = {
  Query: {
    posts: () => prisma.post.findMany(),
    post: (_, args) => prisma.post.findUnique({ where: { id: parseInt(args.id) } }),
  },
  Mutation: {
    createPost: async (_, args) => {
      const post = await prisma.post.create({ data: args });
      pubsub.publish('POST_CREATED', { postCreated: post });
      return post;
    },
    updatePost: async (_, args) => {
      const post = await prisma.post.update({ where: { id: parseInt(args.id) }, data: args });
      pubsub.publish('POST_UPDATED', { postUpdated: post });
      return post;
    },
    deletePost: async (_, args) => {
      const post = await prisma.post.delete({ where: { id: parseInt(args.id) } });
      pubsub.publish('POST_DELETED', { postDeleted: post });
      return post;
    },
  },
};

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
});

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`Posts service ready at ${url}`);
});