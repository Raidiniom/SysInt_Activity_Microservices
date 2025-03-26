import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import PostList from "./components/PostList";

function App() {
  return (
    <ApolloProvider client={client}>
      <div style={{ padding: "20px" }}>
        <h1>Posts Blog</h1>
        <PostList />
      </div>
    </ApolloProvider>
  );
}

export default App;
