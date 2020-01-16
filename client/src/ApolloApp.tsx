import * as React from 'react';
import App from './App';
import {ApolloClient} from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context';

const httpLink = createUploadLink({
  uri: 'http://localhost:5000/graphql'
});

const authLink = setContext(() => {
  const token = localStorage.getItem('jwttoken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const ApolloApp:React.FC = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default ApolloApp;