import Vue from 'vue'

export const state = () => ({
  cart: [],
  cartCount: 0
})

export const mutations = {
  SET_CART(state, payload) {
    state.cart = payload.cart
    state.cartCount = payload.cartCount
  },

  ADD_TO_CART(state, item) {
    const existedProduct = state.cart.find(product => product.key === item.key)

    if (existedProduct) {
      existedProduct.quantity++
      existedProduct.totalPrice = existedProduct.quantity * existedProduct.unitPrice
    } else {
      state.cart.push(item)
      state.cartCount++
    }
  },

  REMOVE_FROM_CART(state, item) {
    let index = state.cart.indexOf(item);
    console.log(index);
    
    // if (index > -1) {
    //   let product = state.cart[index];
    //   state.cartCount -= product.quantity;

    //   state.cart.splice(index, 1);
    // }
  },

  SAVE_CART(state) {
    Vue.ls.set('cart', state.cart);
    Vue.ls.set('cartCount', state.cartCount);
    this.$cookiz.set('cart', state.cart);
    this.$cookiz.set('cartCount', state.cartCount);
  }
}

export const actions = {

};

export const getters = {
  cartCount(state) {
    return state.cartCount
  }
};