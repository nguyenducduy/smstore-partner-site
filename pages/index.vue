<template>
  <div>
    <div class="mb-4 rounded-sm md:mb-8" v-show="!loading && banners.length > 0">
      <banners :slides="banners" />
    </div>
    <div
      v-lazy-container="{ selector: 'img' }"
      class="grid grid-cols-2 gap-2 md:gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 md:grid-cols-4">
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
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { Getter, Action, Mutation } from 'vuex-class'
import ProductItem from '@/components/Product/Item/index.vue'
import Banners from '@/components/Banners/index.vue'

import fetchBanners from '@/gql/queries/fetchBanners.gql'

@Component({
  layout: 'default',
  components: {
    ProductItem,
    Banners
  }
})
export default class HomePage extends Vue {
  @Action('product/loadProducts') loadProducts
  @Getter('product/products') products
  @Mutation('product/RESET_PRODUCTS') resetProducts
  @Getter('currentShopId') currentShopId

  loading: boolean = false
  infiniteState: any = null

  //banners
  banners: any = []

  async loadMore($state) {
    await this.loadProducts({ infiniteState: $state });
  }

  async mounted() {
    this.resetProducts()

    await this.loadProducts({ infiniteState: null })

    const r = await this.$apollo.query({
      query: fetchBanners,
      variables: {
        where: {
          page: { _eq: 'home' },
          is_active: { _eq: true },
          store_id: { _eq: this.currentShopId }
        }
      }
    })

    if (r.data) {
      this.banners = r.data.banners
    }
  }
}
</script>

<style >
.vueperslides__parallax-wrapper {
  border-radius: 0.3rem !important;
}
</style>