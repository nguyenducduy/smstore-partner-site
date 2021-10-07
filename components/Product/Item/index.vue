<template>
  <div class="flex flex-col justify-center p-2 bg-white rounded-lg shadow-lg md:p-4 card hover:shadow-2xl" v-lazy-container="{ selector: 'img' }" >
    <div class="prod-title">
      <p class="text-sm text-gray-700 hover:text-blue-900 md:text-base">
        <nuxt-link :to="`/danh-muc/${product.category.slug}`">
          {{ product.category.name }}
        </nuxt-link>
      </p>
      <p class="text-sm text-gray-400 uppercase hover:text-blue-400">
        <nuxt-link :to="`/san-pham/${product.slug}`">
          {{ product.name }}
        </nuxt-link>
      </p>
    </div>
    <div class="py-2 prod-img">
      <nuxt-link :to="`/san-pham/${product.slug}`" v-if="product.images.length > 0">
        <img
          :data-src="$helper.getImage(product.images[0].path)"
          class="object-cover object-center w-full rounded-md"
        />
      </nuxt-link>
    </div>
    <div class="grid gap-10 prod-info">
      <div class="flex flex-col items-center justify-between text-gray-900 md:flex-row">
        <p class="font-mono font-bold ">
          {{ product.price | number('0,0') }} &#8363;
          <br/>
          <small class="font-light text-gray-400" v-if="product.order_confirmed > 0">
            {{ product.order_confirmed }} đã bán
          </small>
        </p>
        <product-add-to-wish-button :product="product" v-if="product.is_wished === false" />
        <product-remove-from-wish-button :product="product" v-else />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Getter } from 'vuex-class'
import ProductAddToWishButton from '@/components/Wish/AddButton/index.vue'
import ProductRemoveFromWishButton from '@/components/Wish/UnAddbutton/index.vue'

@Component({
  components: {
    ProductAddToWishButton,
    ProductRemoveFromWishButton
  }
})
export default class ProductItem extends Vue {
  @Prop()
  product: any
}
</script>