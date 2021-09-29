<template>
  <section class="overflow-hidden text-gray-700 bg-white body-font">
    <div class="container px-5 py-8 mx-auto">
      <div class="flex flex-wrap mx-auto mb-6">
        <client-only>
          <div ref="gallery" class="flex flex-row w-1/2 border border-gray-200 rounded h-96">
            <div v-for="(image, i) in product.images" :key="i">
              <a
                :href="$helper.getImage(image.path)"
                class="lg-selector">
                <img :src="$helper.getImage(image.path)" class="object-cover object-center h-full">
              </a>
            </div>
          </div>
        </client-only>

        <div class="w-full mt-6 lg:w-1/2 lg:pl-10 lg:py-6 lg:mt-0">
          <h2 class="text-sm tracking-widest text-gray-500">
            {{ product.category.name }}
          </h2>
          <h1 class="my-2 text-2xl font-medium text-gray-600 uppercase">
            {{ product.name }}
          </h1>
          <!-- <div class="flex mb-4">
            <span class="flex items-center">
              <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <span class="ml-3 text-gray-600">4 Reviews</span>
            </span>
            <span class="flex py-2 pl-3 ml-3 border-l-2 border-gray-200">
              <a class="text-gray-500">
                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a class="ml-2 text-gray-500">
                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a class="ml-2 text-gray-500">
                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>
              </a>
            </span>
          </div> -->
          <div class="flex flex-col items-center pb-5 mt-6 mb-5 border-b-2 border-gray-200" v-if="product.options.length > 0">
            <div class="flex items-center w-full my-2" v-for="(option, k) in product.options" :key="k">
              <span class="w-1/2 mr-6">{{ option.name }}</span>
              <template v-if="option.values.length > 0">
                <div class="flex items-start w-full">
                  <div class="mr-4 form-control" v-for="(optValue, i) in option.values" :key="i">
                    <label class="mr-2 cursor-pointer label">
                      <span class="mr-2 label-text">{{ optValue.val }}</span> 
                      <input
                        type="radio"
                        :name="`opt-${option.name}`"
                        class="radio radio-accent"
                        :value="optValue"
                        v-model="optionsSelected[k]"
                        @change="onOptionChange"
                      >
                    </label>
                    <small class="text-gray-400">
                      <span v-if="optValue.mode === 'inc'" class="text-green-600">
                        +
                        <span v-if="optValue.price !== ''">{{ +optValue.price | number('0,0') }}</span>
                      </span>
                      <span v-if="optValue.mode === 'dec'" class="text-red-600">
                        -
                        <span v-if="optValue.price !== ''">{{ +optValue.price | number('0,0') }}</span>
                      </span>
                    </small>
                  </div> 
                </div>
              </template>
            </div>            
          </div>
          <div class="flex items-center">
            <span :class="`title-font ${optionsSelected.length > 0 ? 'text-xl line-through text-gray-400 font-light' : 'text-2xl text-gray-900 font-medium'}`">
              {{ product.price | number('0,0') }} đ
            </span>
            <span :class="`ml-4 text-2xl font-medium text-gray-900 title-font`" v-if="optionsSelected.length > 0">
              {{ totalPrice | number('0,0') }} đ
            </span>
            <product-add-to-cart-button :product="product" :optionsSelected="optionsSelected" :totalPrice="totalPrice" />
          </div>
        </div>
      </div>
      <div class="flex flex-wrap mx-auto">
        <tabs class="w-full">
          <tab title="Mô tả sản phẩm">
            <div class="my-4 leading-7" v-html="product.description"></div>
          </tab>
          <tab title="Thông số chi tiết" class="w-1/2">
            <div v-if="product.product_attributes.length > 0">
              <table class="table w-full table-zebra"> 
                <tbody>
                  <tr v-for="(pa, i) in product.product_attributes" :key="i">
                    <td>{{ pa.attribute.name }}:</td> 
                    <td>{{ pa.value }}</td> 
                  </tr>
                </tbody>
              </table>
            </div>
          </tab>
        </tabs>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import { Tabs, Tab } from 'vue-slim-tabs'
import ProductAddToCartButton from '@/components/Product/AddToCartButton/index.vue'

@Component({
  components: {
    Tabs,
    Tab,
    ProductAddToCartButton
  }
})
export default class ProductItemDetail extends Vue {
  @Prop()
  product: any

  $refs: {
    gallery: HTMLDivElement
  }

  optionsSelected: any = []
  optionPrice: any = []
  totalPrice: number = 0

  onOptionChange() {
    // calculate price
    this.optionsSelected.map((option, i) => {
      this.optionPrice[i] = {
        mode: option.mode,
        price: +option.price
      }
    })
    
    let optPrice: number = 0
    this.optionPrice.map(option => {
      if (option.mode === 'inc') {
        optPrice += +option.price
      }

      if (option.mode === 'dec') {
        optPrice -= +option.price
      }
    })

    this.totalPrice = this.product.price + optPrice
  }

  mounted() {
    const self = this
    this.$nextTick(() => {
      (window as any).lightGallery(self.$refs.gallery, {
        selector: '.lg-selector',
        download: false
      })

      self.totalPrice = self.product.price
    })
  }
}
</script>

<style src="vue-slim-tabs/themes/default.css"></style>