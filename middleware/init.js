import Vue from 'vue';
import jwtDecode from 'jwt-decode';

export default function({ app, store }) {
  const token = process.server ? app.$cookiz.get('token') : Vue.ls.get('token');
  const domain = process.server ? app.$cookiz.get('domain') : Vue.ls.get('domain');
  
  if (typeof token !== 'undefined' && token !== null) {
    const user = jwtDecode(token);
  
    store.commit('users/SET_AUTH', token);
    store.commit('users/SET_USER', user);
  }
  
  store.commit('SET_DOMAIN', domain);
}

