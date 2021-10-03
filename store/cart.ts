import Vue from 'vue'

export const state = () => ({
  cart: [],
  cartCount: 0,
  checkout: [],
  sumPrice: 0
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
    let index = state.cart.findIndex(product => product.key === item.key)
    
    if (index > -1) {
      state.cartCount--
      state.cart.splice(index, 1)
    }
  },

  INCREASE_QUANTITY(state, productKey) {
    const product = state.cart.find(product => product.key === productKey)
    product.quantity++
    product.totalPrice = product.quantity * product.unitPrice

    // check if in checkout, increase sumPrice
    const inCheckout = state.checkout.find(product => product.key === productKey)
    if (inCheckout) {
      state.sumPrice += product.unitPrice
    }
  },

  DECREASE_QUANTITY(state, productKey) {
    const product = state.cart.find(product => product.key === productKey)
    product.quantity--
    product.totalPrice = product.quantity * product.unitPrice

    // check if in checkout, increase sumPrice
    const inCheckout = state.checkout.find(product => product.key === productKey)
    if (inCheckout) {
      state.sumPrice -= product.unitPrice
    }
  },

  ADD_TO_CHECKOUT(state, selectedProductKeys) {
    let checkoutArr = []
    let price = 0
    
    selectedProductKeys.map(productKey => {
      const product = state.cart.find(product => product.key === productKey)
      price += product.totalPrice
      checkoutArr.push(product)
    })
    
    state.checkout = checkoutArr
    state.sumPrice = price
  },

  CHECKOUT_DONE(state) {
    state.checkout.map(product => {
      let index = state.cart.findIndex(cartProduct => cartProduct.key === product.key)

      if (index > -1) {
        state.cartCount--
        state.cart.splice(index, 1)
        state.sumPrice -= product.totalPrice
      }
    })

    state.checkout = []
  },

  SAVE_CART(state) {
    Vue.ls.set('cart', state.cart);
    Vue.ls.set('cartCount', state.cartCount);
    this.$cookiz.set('cart', state.cart);
    this.$cookiz.set('cartCount', state.cartCount);
  },

  RESET_CHECKOUT(state) {
    state.checkout = []
    state.sumPrice = 0
  }
}

export const actions = {

};

export const getters = {
  cartCount(state) {
    return state.cartCount || 0
  },

  cart(state) {
    return state.cart || []
  },

  sumPrice(state) {
    return state.sumPrice || 0
  },

  checkout(state) {
    return state.checkout || []
  }
};