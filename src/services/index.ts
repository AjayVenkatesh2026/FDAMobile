import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import {API_URL} from 'config';
import {getToken} from 'src/utils/helpers';

const authLink = new ApolloLink((operation, forward) => {
  const token = getToken();
  operation.setContext({headers: {authorization: token}});

  return forward(operation);
});

const httpLink = new HttpLink({uri: API_URL});
const link = from([authLink, httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  headers: {
    authorization: getToken(),
  },
});

export default client;
