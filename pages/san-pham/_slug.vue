<template>
  <div v-if="product">
    <product-item-detail :product="product" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Getter } from 'vuex-class'
import ProductItemDetail from '@/components/Product/ItemDetail/index.vue'

import fetchProduct from '@/gql/queries/fetchProduct.gql'

@Component({
  layout: 'default',
  components: {
    ProductItemDetail
  }
})
export default class ProductDetailPage extends Vue {
  @Getter('isStore') isStore
  @Getter('currentStoreId') currentStoreId

  product: any = null

  async mounted() {
    const r = await this.$apollo.query({
      query: fetchProduct,
      variables: {
        where: {
          store_id: { _eq: this.currentStoreId },
          slug: { _eq: this.$route.params.slug },
          is_active: { _eq: true }
        }
      }
    })

    if (r.data && r.data.products.length > 0) {      
      this.product = r.data.products[0]
      console.log(this.product);
      
    } else {

    }
  }
}
</script>

