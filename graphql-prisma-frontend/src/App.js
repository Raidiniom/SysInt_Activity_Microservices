// src/App.js
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_POSTS, CREATE_POST, POST_CREATED } from './graphql';
import { useSubscription } from '@apollo/client';
import './styles/PostsTable.css';

function App() {
  const { loading, error, data } = useQuery(GET_POSTS);
  const [createPost] = useMutation(CREATE_POST);
  const { data: subscriptionData } = useSubscription(POST_CREATED);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleCreatePost = async () => {
    await createPost({ variables: { title, content } });
    setTitle('');
    setContent('');
  };

  return (
    <div className="table-container">
      <h1>Posts</h1>
      <table className="posts-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {data.posts.map((post) => (
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
};

export default App;
