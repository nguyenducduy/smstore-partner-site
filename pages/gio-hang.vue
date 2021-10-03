<template>
  <section class="overflow-hidden text-gray-700 bg-white body-font">
    <div class="container px-5 py-8 mx-auto">
      <h1 class="pb-4 text-2xl font-medium text-gray-700">Giỏ hàng</h1>
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
            <th>Sản phẩm ({{ cartCount }})</th> 
            <th>Số lượng</th> 
            <th>Đơn giá</th> 
            <th>Tổng giá</th>
            <th></th>
          </tr>
        </thead> 
        <tbody>  
          <tr v-for="(product, i) in cart" :key="i">
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
                  <div class="w-20 mask">
                    <nuxt-link :to="`/san-pham/${product.slug}`">
                      <img :src="product.image" :alt="product.name" class="rounded-md">
                    </nuxt-link>
                  </div>
                </div> 
                <div>
                  <div class="text-gray-700 uppercase hover:text-blue-400">
                    <nuxt-link :to="`/san-pham/${product.slug}`" class="break-words">{{ product.name }}</nuxt-link>
                  </div> 
                  <div class="text-sm text-gray-600">
                    <div v-if="product.options.length > 0">
                      <p v-for="(option, i) in product.options" :key="i">
                        {{ option.name }}: {{ option.value.val }}
                        &nbsp;
                        <span v-if="option.value.mode === 'inc'" class="text-green-600">
                          +
                          <span v-if="option.value.price !== ''">{{ +option.value.price | number('0,0') }} &#8363;</span>
                        </span>
                        <span v-if="option.value.mode === 'dec'" class="text-red-600">
                          -
                          <span v-if="option.value.price !== ''">{{ +option.value.price | number('0,0') }} &#8363;</span>
                        </span>
                      </p>
                    </div>
                    <div class="alert alert-warning" v-else>
                      <div class="flex-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current"> 
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>                         
                        </svg> 
                        <label>Không thể thanh toán sản phẩm này</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td> 
            <td class="w-20">
              <cart-input-quantity :quantity="product.quantity" :productKey="product.key" />
            </td> 
            <td>
              {{ product.unitPrice | number('0,0') }} &#8363;
            </td> 
            <th>
              {{ product.totalPrice | number('0,0') }} &#8363;
            </th>
            <th>
              <product-remove-from-cart-button :product="product" />
            </th>
          </tr>
        </tbody>
      </table>
      <hr class="mt-6">
      <cart-checkout-form :sumPrice="sumPrice" />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { Mutation, Getter } from 'vuex-class'
import CartInputQuantity from '@/components/Cart/InputQuantity/index.vue'
import ProductRemoveFromCartButton from '@/components/Cart/DeleteButton/index.vue'
import CartCheckoutForm from '@/components/Cart/CheckoutForm/index.vue'

@Component({
  layout: 'default',
  components: {
    CartInputQuantity,
    CartCheckoutForm,
    ProductRemoveFromCartButton
  }
})
export default class CartPage extends Vue {
  @Getter('cart/cart') cart
  @Getter('cart/cartCount') cartCount
  @Getter('cart/sumPrice') sumPrice
  @Mutation('cart/ADD_TO_CHECKOUT') addToCheckout
  @Mutation('cart/RESET_CHECKOUT') resetCheckout

  selected: any = []
  allSelected: boolean = false
  
  selectAll() {
    this.selected = []

    if (!this.allSelected) {
      this.cart.map(product => {
        this.selected.push(product.key)
      })

      this.allSelected = true
    } else {
      this.allSelected = false
    }
  }

  @Watch('allSelected')
  onSelectAll() {
    this.addToCheckout(this.selected)
  }

  onSelect() {
    this.addToCheckout(this.selected)
  }

  mounted() {
    this.resetCheckout()
  }
}
</script>

<style>
  .table td {
    white-space: inherit !important;
  }
</style>