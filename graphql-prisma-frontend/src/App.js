// src/App.js
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_POSTS, CREATE_POST, POST_CREATED } from './graphql';
import { useSubscription } from '@apollo/client';

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
    <div>
      <h1>Posts</h1>
      <ul>
        {data.posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
