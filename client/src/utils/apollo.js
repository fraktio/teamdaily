import { ApolloClient, createNetworkInterface } from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri: `${process.env.API}/graphql`,
});

export const createClient = () => {
  return new ApolloClient({
    networkInterface: networkInterface,
  });
};
