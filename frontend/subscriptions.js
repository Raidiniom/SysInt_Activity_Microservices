import { gql } from "@apollo/client";

export const New_Posts = gql`
  subscription {
    newpost {
      id
      title
      content
    }
  }
`;