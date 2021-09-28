import {
  ApolloLink,
} from "apollo-boost";
import { onError } from "apollo-link-error";
import fetch from 'isomorphic-fetch';
import { createHttpLink } from "apollo-link-http";
import jwtDecode from 'jwt-decode';

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
    console.log(error);
    //fix when a media is deleted.
    if (error['graphQLErrors']) {
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

  let token = app.$cookiz.get('token');

  return {
    defaultHttpLink: false,
    link: ApolloLink.from([errorLink, createHttpLink({
      credentials: 'include',
      uri: NUXT_ENV_GRAPHQL_URI,
      fetch: (uri, options) => {
        return fetch(uri, options)
      },
    })]),
    wsEndpoint: NUXT_ENV_GRAPHQLWS_URI,
    connectToDevTools: true
  } 
}