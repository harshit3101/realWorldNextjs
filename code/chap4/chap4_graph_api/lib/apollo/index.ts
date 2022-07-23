import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { useMemo } from "react";

let apolloClient: ApolloClient<any>;

let uri = `${process.env.NEXT_PUBLIC_APOLLO_COUNTRIES_URI}`;

let apolloConfigs = {
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({uri}),
    cache: new InMemoryCache()
}

function createApolloClient() {
    return new ApolloClient(apolloConfigs);
}

export function initApollo(initialState: any): ApolloClient<any> {
    const client = apolloClient || createApolloClient();
    if (initialState) {
    client.cache.restore({
      ...client.extract(),
      ...initialState
    });
  }

  if (typeof window === "undefined") {
    return client;
  }
  if (!apolloClient) {
    apolloClient = client;
  }

  return client;
}

export function useApollo(initialState: any) {
    return useMemo(
      () => initApollo(initialState),
      [initialState]
    );  
}