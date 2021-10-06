import Vue from 'vue';

export default function({ app, store, redirect }) {
  const storeId = process.server ? app.$cookiz.get('storeId') : Vue.ls.get('storeId');
  const cart = process.server ? app.$cookiz.get('cart') : Vue.ls.get('cart');
  const cartCount = process.server ? app.$cookiz.get('cartCount') : Vue.ls.get('cartCount');
  const wish = process.server ? app.$cookiz.get('wish') : Vue.ls.get('wish');
  const wishCount = process.server ? app.$cookiz.get('wishCount') : Vue.ls.get('wishCount');
  
  if (typeof storeId === 'undefined') {
    return redirect('/waiting')
  }

  if (typeof storeId !== 'undefined' && storeId !== null) {
    store.commit('SET_STORE_ID', storeId);
  }

  if (typeof cart !== 'undefined' && cart !== null) {
    store.commit('cart/SET_CART', { cart: cart, cartCount: +cartCount });
  }

  if (typeof wish !== 'undefined' && wish !== null) {
    store.commit('wish/SET_WISH', { wish: wish, wishCount: +wishCount });
  }

}

