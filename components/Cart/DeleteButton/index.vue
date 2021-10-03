<template>
  <button class="btn btn-xs btn-error" @click.prevent="onRemove()">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-4 h-4 stroke-current">   
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>                       
    </svg>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Mutation } from 'vuex-class'

@Component({})
export default class ProductRemoveFromCartButton extends Vue {
  @Prop()
  product

  @Mutation('cart/REMOVE_FROM_CART') removeFromCart
  @Mutation('cart/SAVE_CART') saveCart

  onRemove() {
    this.removeFromCart(this.product)
    this.saveCart()
  }
}
</script>