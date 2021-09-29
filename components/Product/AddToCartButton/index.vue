<template>
  <div class="flex py-2 ml-auto tooltip tooltip-left" data-tip="Thêm vào giỏ hàng">
    <button class="btn btn-square btn-ghost" @click.prevent="onAdd()">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00b341" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="6" cy="19" r="2" />
        <circle cx="17" cy="19" r="2" />
        <path d="M17 17h-11v-14h-2" />
        <path d="M6 5l6.005 .429m7.138 6.573l-.143 .998h-13" />
        <path d="M15 6h6m-3 -3v6" />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Mutation } from 'vuex-class'
const slugify = require('slugify');

@Component({})
export default class ProductAddToCartButton extends Vue {
  @Prop()
  product

  @Prop()
  optionsSelected

  @Prop()
  totalPrice

  @Mutation('cart/ADD_TO_CART') addToCart
  @Mutation('cart/SAVE_CART') saveCart

  onAdd() {
    let myProduct: any = {
      key: `${this.product.id}-`,
      id: this.product.id,
      name: this.product.name,
      options: [],
      unitPrice: this.totalPrice,
      dateCreated: this.$helper.getNow(),
      quantity: 1,
      totalPrice: this.product.price * 1
    }

    if (this.optionsSelected.length > 0 && this.optionsSelected.length === this.product.options.length) {      
      this.optionsSelected.map((option, k) => {
        // console.log(this.product.options[k]['name']);
        myProduct.key += `${k}-${this._getSlug(option.val)}-`
        myProduct.options.push(
          `${this.product.options[k]['name']}: ${option.val}`
        )
      })

      // console.log(myProduct);
      this.addToCart(myProduct)
      this.saveCart()
      
    } else {
      //message vui long chon option
    }
  }

  _getSlug(text) {
    return slugify(text, { lower: true, locale: 'vi' })
  }
}
</script>