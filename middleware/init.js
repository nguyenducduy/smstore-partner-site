import Vue from 'vue';

export default function({ app, store, redirect }) {
  const shop = process.server ? app.$cookiz.get('shop') : Vue.ls.get('shop');
  const cart = process.server ? app.$cookiz.get('cart') : Vue.ls.get('cart');
  const cartCount = process.server ? app.$cookiz.get('cartCount') : Vue.ls.get('cartCount');
  const wish = process.server ? app.$cookiz.get('wish') : Vue.ls.get('wish');
  const wishCount = process.server ? app.$cookiz.get('wishCount') : Vue.ls.get('wishCount');

  if (typeof shop === 'undefined') {
    return redirect('/setup')
  }

  if (typeof shop !== 'undefined' && shop !== null) {
    store.commit('SET_SHOP', shop);
  }

  if (typeof cart !== 'undefined' && cart !== null) {
    store.commit('cart/SET_CART', { cart: cart, cartCount: +cartCount });
  }

  if (typeof wish !== 'undefined' && wish !== null) {
    store.commit('wish/SET_WISH', { wish: wish, wishCount: +wishCount });
  }

}

