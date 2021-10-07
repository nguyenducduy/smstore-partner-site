<template>
  <section class="overflow-hidden text-gray-700 bg-white body-font">
    <div class="container py-8 mx-auto px-auto md:px-5" v-if="wishCount > 0">
      <h1 class="pb-4 text-2xl font-medium text-gray-700">Muốn mua</h1>
      <table class="table w-full">
        <thead>
          <tr>
            <th>
              <label>
                <input
                  type="checkbox"
                  class="checkbox"
                  @click.prevent="selectAll"
                  v-model="allSelected"
                />
              </label>
            </th> 
            <th>Sản phẩm ({{ wishCount }})</th> 
            <th>Đơn giá</th> 
            <th></th>
          </tr>
        </thead> 
        <tbody>  
          <tr v-for="(product, i) in wish" :key="i">
            <th>
              <label>
                <input
                  type="checkbox"
                  class="checkbox"
                  v-model="selected"
                  :value="product.key"
                  @change="onSelect"
                />
              </label>
            </th> 
            <td>
              <div class="flex items-center space-x-3">
                <div class="avatar">
                  <div class="w-16 mask">
                    <nuxt-link :to="`/san-pham/${product.slug}`">
                      <img :src="product.image" :alt="product.name" class="rounded-md">
                    </nuxt-link>
                  </div>
                </div> 
                <div>
                  <div class="text-gray-700 uppercase hover:text-blue-400">
                    <nuxt-link :to="`/san-pham/${product.slug}`" class="break-words">{{ product.name }}</nuxt-link>
                  </div> 
                </div>
              </div>
            </td>
            <td>
              {{ product.unitPrice | number('0,0') }} &#8363;
            </td>  
            <th>
              <!-- <product-remove-from-cart-button :product="product" /> -->
            </th>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="container py-8 mx-auto text-center px-auto md:px-5" v-else>
      Yêu thích trống
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { Mutation, Getter } from 'vuex-class'
// import ProductRemoveFromCartButton from '@/components/Cart/DeleteButton/index.vue'

@Component({
  layout: 'default',
  components: {
    // ProductRemoveFromCartButton
  }
})
export default class WishPage extends Vue {
  @Getter('wish/wish') wish
  @Getter('wish/wishCount') wishCount

  selected: any = []
  allSelected: boolean = false
  
  selectAll() {
    this.selected = []

    if (!this.allSelected) {
      this.wish.map(product => {
        this.selected.push(product.key)
      })

      this.allSelected = true
    } else {
      this.allSelected = false
    }
  }

  @Watch('allSelected')
  onSelectAll() {
    // this.addToCheckout(this.selected)
  }

  onSelect() {
    // this.addToCheckout(this.selected)
  }

  mounted() {

  }
}
</script>

<style>
  .table td {
    white-space: inherit !important;
  }
</style>