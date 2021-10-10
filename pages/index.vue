<template>
  <div >
    <loading v-show="loading" />
    
    <div class="mb-4 md:mb-8 rounded-xl" v-show="!loading && banners.length > 0">
      <banners :slides="banners" />
    </div>
    
    <div
      v-lazy-container="{ selector: 'img' }"
      class="grid grid-cols-2 gap-2 md:gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 md:grid-cols-4">
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

  loading: boolean = false
  infiniteState: any = null

  //banners
  banners: any = []

  slides: any = [
    {
      title: 'Mountain 1',
      content: 'Slide 1 content.',
      image: 'https://www.w3schools.com/howto/img_nature_wide.jpg',
      link: 'https://www.maxrivephotography.com/index/C0000rU1RKCHdqwI/G0000X57AtIzuRX0/I0000Gvr9HqdtyXk'
    },
    {
      title: 'Mountain 2',
      content: 'Slide 2 content.',
      image: 'https://www.w3schools.com/howto/img_snow_wide.jpg',
      link: 'https://www.maxrivephotography.com/index/C0000rU1RKCHdqwI/G0000X57AtIzuRX0/I0000Gvr9HqdtyXk'
    },
    {
      title: 'Mountain 3',
      content: 'Slide 3 content.',
      image: 'https://www.w3schools.com/howto/img_lights_wide.jpg',
      link: 'https://www.maxrivephotography.com/index/C0000rU1RKCHdqwI/G0000X57AtIzuRX0/I0000Gvr9HqdtyXk'
    },
    {
      title: 'Mountain 3',
      content: 'Slide 3 content.',
      image: 'https://www.w3schools.com/howto/img_mountains_wide.jpg',
      link: 'https://www.maxrivephotography.com/index/C0000rU1RKCHdqwI/G0000X57AtIzuRX0/I0000Gvr9HqdtyXk'
    },

  ]

  async loadMore($state) {
    await this.loadProducts({ infiniteState: $state });
  }

  async created() {
    this.loading = true
    this.resetProducts()

    await this.loadProducts({ infiniteState: null })
    
    this.loading = false
  }

  async mounted() {
    const r = await this.$apollo.query({
      query: fetchBanners,
      variables: {
        where: {
          page: { _eq: 'home' },
          is_active: { _eq: true }
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