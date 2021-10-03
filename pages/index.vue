<template>
  <div v-lazy-container="{ selector: 'img' }">
    <loading v-show="loading" />
    
    <div class="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <product-item v-for="(product, i) in products" :key="i" :product="product" />
    </div>

    <infinite-loading spinner="spiral" @infinite="loadMore" v-show="products.length > 0">
      <span slot="no-more"></span>
      <span slot="no-results"></span>
    </infinite-loading>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { Getter, Action, Mutation } from 'vuex-class'
import ProductItem from '@/components/Product/Item/index.vue'

@Component({
  layout: 'default',
  components: {
    ProductItem,
  }
})
export default class HomePage extends Vue {
  @Action('product/loadProducts') loadProducts
  @Getter('product/products') products
  @Mutation('product/RESET_PRODUCTS') resetProducts

  loading: boolean = false
  infiniteState: any = null

  async loadMore($state) {
    await this.loadProducts({ infiniteState: $state });
  }

  async created() {
    this.loading = true
    this.resetProducts()

    await this.loadProducts({ infiniteState: null })
    
    this.loading = false
  }
}
</script>

