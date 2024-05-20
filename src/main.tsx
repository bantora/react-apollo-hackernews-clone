import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import './styles/index.css'
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import { AUTH_TOKEN } from './constants';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});


const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
