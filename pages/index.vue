<template>
  <div v-if="products">
    <div class="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <product-item v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Getter } from 'vuex-class'
import ProductItem from '@/components/Product/Item/index.vue'

import fetchProducts from '@/gql/queries/fetchProducts.gql'

@Component({
  layout: 'default',
  components: {
    ProductItem
  },
  apollo: {
    products: {
      query: fetchProducts,
      prefetch: true,
      variables() {
        return {
          where: {
            store_id: { _eq: this.currentStoreId },
            is_active: { _eq: true }
          }
        }
      }
    }
    
  }
})
export default class HomePage extends Vue {
  @Getter('isStore') isStore
  @Getter('currentStoreId') currentStoreId

  products: any = null

  mounted() {
    console.log(this.products);
    
  }
}
</script>

