import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";

import * as SecureStore from "expo-secure-store";

const httpLink = new HttpLink({
  uri: "https://d9b04a600b97.ngrok-free.app",
});

const authLink = new SetContextLink(async (_, { headers }) => {
  // Ambil token dari SecureStore
  const token = await SecureStore.getItemAsync("accessToken");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
