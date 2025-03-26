// src/graphql.js
import { gql } from '@apollo/client';

// Query to fetch posts
export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      content
    }
  }
`;

// Mutation to create a post
export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

// Subscription to listen for post updates
export const POST_CREATED = gql`
  subscription OnPostCreated {
    postCreated {
      id
      title
      content
    }
  }
`;
