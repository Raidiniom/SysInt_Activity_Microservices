import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: ["GetPosts"], // Refresh post list after creation
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;
    
    await createPost({ variables: { title, content } });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
      <h3>Create a New Post</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}
