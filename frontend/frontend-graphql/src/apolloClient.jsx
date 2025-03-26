import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4002", // Your GraphQL backend
  cache: new InMemoryCache(),
});

export default client;
