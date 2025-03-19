import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client";
import { WebSocketLink } from "subscriptions-transport-ws";

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4002/subscriptions`,
  options: {
    reconnect: true,
  },
});

const client = new ApolloClient({
  link: ApolloLink.from([wsLink]),
  cache: new InMemoryCache(),
});

export default client;