<template>
  <button class="btn btn-square btn-ghost" @click.prevent="onRemove()">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fd0061" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
    </svg>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Mutation } from 'vuex-class'

@Component({})
export default class ProductRemoveFromWishButton extends Vue {
  @Prop()
  product

  @Mutation('wish/REMOVE_FROM_WISH') removeFromWish
  @Mutation('wish/SAVE_WISH') saveWish
  @Mutation('product/REMOVE_WISH_FROM_PRODUCTS') removeWishFromProduct

  onRemove() {
    this.removeFromWish(this.product)
    this.removeWishFromProduct(this.product)
    this.saveWish()
  }

  mounted() {

  }
}
</script>