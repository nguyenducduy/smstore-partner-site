<template>
  <div class="flex flex-col justify-center bg-white card hover:shadow-md" v-lazy-container="{ selector: 'img' }" >
    
    <div class="pb-2 prod-img">
      <nuxt-link :to="`/san-pham/${product.slug}`" v-if="product.images.length > 0">
        <img
          :data-src="$helper.getImage(product.images[0].path)"
          class="object-cover object-center w-full"
        />
      </nuxt-link>
    </div>
    <div class="px-4 pt-2 prod-title md:px-4">
      <p class="text-sm text-gray-700 hover:text-blue-900 md:text-sm">
        <nuxt-link :to="`/danh-muc/${product.category.slug}`">
          {{ product.category.name }}
        </nuxt-link>
      </p>
      <p class="text-sm text-gray-400 hover:text-blue-400 line-clamp-2">
        <nuxt-link :to="`/san-pham/${product.slug}`">
          {{ product.name }}
        </nuxt-link>
      </p>
    </div>
    <div class="grid gap-10 px-4 py-4 prod-info md:px-4">
      <div class="flex flex-col justify-between text-gray-900 md:flex-row">
        <p class="font-mono font-bold ">
          {{ product.price | number('0,0') }} &#8363;
          <br/>
          <small class="font-light text-gray-400" v-if="product.order_confirmed > 0">
            {{ product.order_confirmed }} đã bán
          </small>
        </p>
        <!-- <product-add-to-wish-button :product="product" v-if="product.is_wished === false" />
        <product-remove-from-wish-button :product="product" v-else /> -->
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