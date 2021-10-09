import fetchProducts from '@/gql/queries/fetchProducts.gql'

export const state = () => ({
  products: [],
  offset: 0,
  limit: 12,
  infiniteState: null,
})

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = state.products.concat(products)
    state.offset += state.limit
  },

  REMOVE_WISH_FROM_PRODUCTS(state, wishProduct) {
    let product = state.products.find(product => product.id === wishProduct.id);
    if (product) {
      product.is_wished = false
    }
  },

  RESET_PRODUCTS(state) {
    state.products = []
    state.offset = 0
  }
}

export const actions = {
  async loadProducts({ state, commit, rootState }, payload) {
    try {
      console.log(rootState.shop);
      
      const r = await this.app.apolloProvider.defaultClient.query({
        query: fetchProducts,
        variables: {
          where: {
            store_id: { _eq: rootState.shop.id },
            is_active: { _eq: true }
          },
          offset: state.offset,
          limit: state.limit
        }
      })

      if (r.data.products.length > 0) {
        // modify response to mark wished item
        let products = []

        r.data.products.map(product => {
          const isWishedIndex = rootState.wish.wish.findIndex(wishProduct => wishProduct.id === product.id)

          product['is_wished'] = isWishedIndex !== -1 ? true : false
          products.push(product)
        })

        commit('SET_PRODUCTS', products)

        if (payload.infiniteState !== null) {
          payload.infiniteState.loaded()
        }        
      } else {
        if (payload.infiniteState !== null) {
          payload.infiniteState.complete()
        }
      }
    } catch (error) {
      throw error
    }
  },
};

export const getters = {
  products(state) {
    return state.products || []
  },
};