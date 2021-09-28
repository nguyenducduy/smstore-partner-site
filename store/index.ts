export const state = () => ({
    storeId: null,
  })
  
  export const mutations = {
    SET_STORE_ID(state, id) {
      state.storeId = id;
    },
  }
  
  export const actions = {
    
  };
  
  export const getters = {
    isStore(state) {
      if (typeof state.storeId === 'undefined' || state.storeId === null) {
        return false;
      } else {
        return true;
      }
    },
    currentStoreId(state) {
      return state.storeId || null;
    },
  };