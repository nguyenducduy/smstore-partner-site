<template>
  <div v-lazy-container="{ selector: 'img' }" v-if="products">
    <div class="grid grid-cols-2 gap-2 md:gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 md:grid-cols-4">
      <product-item v-for="(product, i) in products" :key="i" :product="product" />
    </div>

    <client-only>
      <infinite-loading spinner="spiral" @infinite="loadMore" v-show="products.length > 0">
        <span slot="no-more"></span>
        <span slot="no-results"></span>
      </infinite-loading>
    </client-only>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Getter, Action, Mutation } from 'vuex-class'
import ProductItem from '@/components/Product/Item/index.vue'

@Component({
  layout: 'default',
  components: {
    ProductItem
  }
})
export default class HomePage extends Vue {
  @Action('category/loadProducts') loadProducts
  @Getter('category/products') products
  @Mutation('category/RESET_PRODUCTS') resetProducts

  loading: boolean = false
  infiniteState: any = null

  async loadMore($state) {
    await this.loadProducts({
      infiniteState: $state,
      slug: this.$route.params.slug
    });
  }

  async mounted() {    
    this.resetProducts()
    
    await this.loadProducts({
      infiniteState: null,
      slug: this.$route.params.slug
    })
  }
}
</script>

