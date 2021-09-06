import Vue from "vue";

export const state = () => ({
    domain: null,
  })
  
  export const mutations = {
    SET_DOMAIN(state, domain) {
      state.domain = domain;
    },
  }
  
  export const actions = {
    
  };
  
  export const getters = {
    isDomain(state) {
      if (typeof state.domain === 'undefined' || state.domain === null) {
        return false;
      } else {
        return true;
      }
    },
    currentDomain(state) {
      return state.domain || null;
    },
  };