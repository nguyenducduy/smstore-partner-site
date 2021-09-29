import Vue from 'vue';

export default function({ app, store }) {
  const storeId = process.server ? app.$cookiz.get('storeId') : Vue.ls.get('storeId');
  const cart = process.server ? app.$cookiz.get('cart') : Vue.ls.get('cart');
  const cartCount = process.server ? app.$cookiz.get('cartCount') : Vue.ls.get('cartCount');
  
  if (typeof storeId !== 'undefined' && storeId !== null) {
    store.commit('SET_STORE_ID', storeId);
  }

  if (typeof cart !== 'undefined' && cart !== null) {
    store.commit('cart/SET_CART', { cart: cart, cartCount: +cartCount });
  }

}

