<template>
  <button class="btn btn-square btn-ghost" @click.prevent="onAdd()">
    <lottie
      :options="defaultOptions"
      v-on:animCreated="handleAnimation"
    />
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Mutation } from 'vuex-class'
import * as animationData from "@/assets/love.json";

@Component({})
export default class ProductAddToWishButton extends Vue {
  @Prop()
  product

  @Mutation('wish/ADD_TO_WISH') addToWish
  @Mutation('wish/SAVE_WISH') saveWish

  defaultOptions = {
    animationData: (animationData as any).default,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    resizeMode: 'cover',
  }
  anim = null

  handleAnimation(anim) {
    this.anim = anim;
  }

  onAdd() {
    let myProduct: any = {
      id: this.product.id,
      slug: this.product.slug,
      name: this.product.name,
      image: '',
      dateCreated: this.$helper.getNow(),
    }

    if (this.product.images.length > 0) {
      myProduct.image = this.$helper.getImage(this.product.images[0]['path'])
    }

    this.addToWish(myProduct)
    this.saveWish()
    this.anim.playSegments([0, 40], true)
    // this.anim.goToAndStop(40, true)
  }
}
</script>