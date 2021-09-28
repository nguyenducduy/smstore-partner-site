<template>
  <div class="flex flex-col justify-center p-6 bg-white rounded-lg shadow-2xl card" v-lazy-container="{ selector: 'img' }" >
    <div class="prod-title">
      <p class="text-gray-700">
        <nuxt-link :to="`danh-muc/${product.category.slug}`">
          {{ product.category.name }}
        </nuxt-link>
      </p>
      <p class="text-sm text-gray-400 uppercase line-clamp-1">
        <nuxt-link :to="`san-pham/${product.slug}`">
          {{ product.name }}
        </nuxt-link>
      </p>
    </div>
    <div class="py-4 prod-img">
      <nuxt-link :to="`san-pham/${product.slug}`" v-if="product.images.length > 0">
        <img
          :data-src="$helper.getImage(product.images[0].path)"
          class="object-cover object-center w-full rounded-lg"
        />
      </nuxt-link>
    </div>
    <div class="grid gap-10 prod-info">
      <div class="flex flex-col items-center justify-between text-gray-900 md:flex-row">
        <p class="font-mono font-bold ">
          {{ product.price | number('0,0') }} đ
        </p>
        <button class="btn btn-square btn-ghost">
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
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Getter } from 'vuex-class'

@Component({})
export default class ProductItem extends Vue {
  @Prop()
  product: any
}
</script>