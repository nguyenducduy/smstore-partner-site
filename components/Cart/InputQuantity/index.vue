<template>
  <div class="w-32 h-10 custom-number-input">
    <div class="relative flex flex-row w-full h-10 mt-1 bg-transparent rounded-lg">
      <button
        :disabled="counter === 1"
        @click.prevent="onDecrease"
        class="w-8 h-full text-gray-600 bg-gray-100 rounded-l outline-none cursor-pointer md:w-20 hover:text-red-400 hover:bg-gray-700">
        <span class="m-auto text-sm font-thin md:text-2xl">−</span>
      </button>
      <input
        type="number"
        class="flex items-center w-8 font-semibold text-center text-gray-700 bg-gray-100 outline-none md:w-full focus:outline-none text-md hover:text-black focus:text-black md:text-basecursor-default"
        name="custom-input-number"
        v-model="counter"
        disabled
      />
      <button
        @click.prevent="onIncrease"
        class="w-8 h-full text-gray-600 bg-gray-100 rounded-r cursor-pointer md:w-20 hover:text-green-400 hover:bg-gray-700">
        <span class="m-auto text-sm font-thin md:text-2xl">+</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Mutation } from 'vuex-class'

@Component({})
export default class CartInputQuantity extends Vue {
  @Mutation('cart/INCREASE_QUANTITY') increaseQuantity
  @Mutation('cart/DECREASE_QUANTITY') decreaseQuantity
  @Mutation('cart/SAVE_CART') saveCart

  @Prop()
  productKey

  @Prop()
  quantity

  counter: number = 0

  onIncrease() {
    this.counter++
    this.increaseQuantity(this.productKey)
    this.saveCart()
  }

  onDecrease() {
    this.counter--
    this.decreaseQuantity(this.productKey)
    this.saveCart()
  }

  mounted() {
    this.counter = this.quantity
  }
}
</script>

<style>
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .custom-number-input input:focus {
    outline: none !important;
  }

  .custom-number-input button:focus {
    outline: none !important;
  }
</style>