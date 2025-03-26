import { gql, useQuery } from "@apollo/client";

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      content
    }
  }
`;

export default function PostList() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error fetching posts!</p>;

  return (
    <div>
      <h2>All Posts</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid grey", padding: "10px" }}>ID</th>
            <th style={{ border: "1px solid grey", padding: "10px" }}>Title</th>
            <th style={{ border: "1px solid grey", padding: "10px" }}>Content</th>
          </tr>
        </thead>
        <tbody>
          {data.posts.map((post) => (
            <tr key={post.id}>
              <td style={{ border: "1px solid grey", padding: "10px" }}>{post.id}</td>
              <td style={{ border: "1px solid grey", padding: "10px" }}>{post.title}</td>
              <td style={{ border: "1px solid grey", padding: "10px" }}>{post.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}
