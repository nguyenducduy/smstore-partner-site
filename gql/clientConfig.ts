import {
  ApolloLink,
} from "apollo-boost";
import { onError } from "apollo-link-error";
import fetch from 'isomorphic-fetch';
import { createHttpLink } from "apollo-link-http";

export default function({
  app,
  redirect,
  store,
  $config: {
    NUXT_ENV_GRAPHQL_URI,
    NUXT_ENV_GRAPHQLWS_URI
  }
}) {  
  const errorLink = onError(error => {
    //fix when a media is deleted.
    if (error['graphQLErrors']) {
      console.log("graphQLErrors: " + error);
      console.log(error);

      // if (error['operation']['operationName'] === 'fetchAudio') {
      //   store.commit('player/RESET');
        
      //   return;
      // }

      // message.error(
      //   error['operation']['operationName'] + ': Error ' + error['graphQLErrors'][0]['message'],
      //   5
      // );
    }
  })
  
  // console.log('Current environment is: ', env.NODE_ENV);
  console.info('Connected to GraphQL server at: ', NUXT_ENV_GRAPHQL_URI);

  const shop = app.$cookiz.get('shop');

  return {
    defaultHttpLink: false,
    link: ApolloLink.from([errorLink, createHttpLink({
      credentials: 'include',
      uri: NUXT_ENV_GRAPHQL_URI,
      fetch: (uri, options) => {
        if (typeof shop !== 'undefined') {
          options.headers['X-Hasura-Store-Id'] = shop.id;
        }
        
        return fetch(uri, options)
      },
    })]),
    wsEndpoint: NUXT_ENV_GRAPHQLWS_URI,
    connectToDevTools: true
  } 
}