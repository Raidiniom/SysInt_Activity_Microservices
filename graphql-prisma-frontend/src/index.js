import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ApolloWrapper from './ApolloProvider'; // Import ApolloWrapper

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloWrapper>
      <App />
    </ApolloWrapper>
  </React.StrictMode>
);
