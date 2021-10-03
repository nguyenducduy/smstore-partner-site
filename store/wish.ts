import Vue from 'vue'

export const state = () => ({
  wish: [],
  wishCount: 0,
})

export const mutations = {
  SET_WISH(state, payload) {
    state.wish = payload.wish
    state.wishCount = payload.wishCount
  },

  ADD_TO_WISH(state, item) {
    const existedProduct = state.wish.find(product => product.id === item.id)

    if (!existedProduct) {
      state.wish.push(item)
      state.wishCount++
    }
  },

  REMOVE_FROM_WISH(state, item) {
    let index = state.wish.findIndex(product => product.id === item.id);
    
    if (index > -1) {
      state.wishCount--
      state.wish.splice(index, 1)
    }
  },

  SAVE_WISH(state) {
    Vue.ls.set('wish', state.wish);
    Vue.ls.set('wishCount', state.wishCount);
    this.$cookiz.set('wish', state.wish);
    this.$cookiz.set('wishCount', state.wishCount);
  },
}

export const actions = {
  
};

export const getters = {
  wishCount(state) {
    return state.wishCount || 0
  },

  wish(state) {
    return state.wish || []
  }
};