import React, { useState, useEffect } from 'react';
import { useQuery, useSubscription, gql } from '@apollo/client';
import './App.css';

const get_posts = gql`
  query {
    posts {
      id
      title
      content
    }
  }
`;

const post_created = gql`
  subscription {
    postCreated {
      id
      title
      content
    }
  }
`;

function Posts() {
  const { data, loading } = useQuery(get_posts);
  const { data: newPost } = useSubscription(post_created);
  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    if (data) {
      setPosts(data.posts);
    }
  }, [data]);

  useEffect(() => {
    if (newPost) {
      setPosts(prevPosts => [ newPost.postCreated, ...prevPosts ]);
    }
  }, [newPost]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Posts</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );  
}

function App() {
  return (
    <div className="App">
      <Posts />
    </div>
  );
}

export default App;