import Vue from 'vue'

export const state = () => ({
  shop: null,
})

export const mutations = {
  SET_SHOP(state, shop) {
    state.shop = shop;
    
    if (process.client) { 
      Vue.ls.set('shop', shop);
    } else {
      this.$cookiz.set('shop', shop);
    }
  },
}

export const actions = {
  
};

export const getters = {
  isShop(state) {
    if (state.shop === null) {
      return false;
    } else {
      return true;
    }
  },
  currentShopId(state) {
    if (state.shop !== null) {
      return state.shop.id;
    } else {
      return 0
    }
  },
  currentShopLogo(state) {
    if (state.shop !== null) {
      return state.shop.logo_path;
    } else {
      return 0
    }
  },
};