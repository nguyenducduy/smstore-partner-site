import Vue from 'vue';

export default function({ app, store }) {
  const storeId = process.server ? app.$cookiz.get('storeId') : Vue.ls.get('storeId');
  
  store.commit('SET_STORE_ID', storeId);
}

