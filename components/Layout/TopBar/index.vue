<template>
  <div class="sticky top-0 z-50 mb-2 bg-white shadow-sm navbar">
    <div class="flex-none lg:flex xl:hidden">
      <menu-collapse />
    </div> 
    <div class="mx-2 navbar-start">
      <nuxt-link to="/" class="hidden lg:block md:hidden sm:block" >
        <img :src="$helper.getImage(currentShopLogo)" class="w-10 lg:ml-4 sm:ml-4">
      </nuxt-link>
      <category-menu-dropdown class="hidden lg:block md:block sm:block" />
    </div> 
    <div class="flex px-2 mx-2 navbar-center lg:flex md:w-1/2 sm:flex xl:flex">
      <div class="form-control md:w-1/2 lg:w-full">
        <input type="text" placeholder="Tìm kiếm" class="bg-gray-100 input search-bar" v-model="q" @keyup.enter="goSearch()">
      </div>
    </div> 
    <div class="navbar-end">
      <div class="hidden mr-4 xl:mx-4 md:mx-4 indicator">
        <div class="mt-2 indicator-item badge badge-secondary">
          {{ wishCount }}
        </div> 
        <button class="btn btn-square btn-ghost" @click="$router.push('/wish')">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fd0061" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
          </svg>
        </button> 
      </div>
      <div class="mr-4 xl:mx-8 md:mx-4 indicator">
        <div class="mt-2 indicator-item badge badge-primary">
          {{ cartCount }}
        </div> 
        <button class="btn btn-square btn-ghost" @click="$router.push('/gio-hang')">
          <lottie
            :options="defaultOptions"
            v-on:animCreated="handleAnimation"
          />
        </button> 
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Getter } from 'vuex-class'
import CategoryMenuDropdown from '@/components/Category/MenuDropdown/index.vue'
import MenuCollapse from '@/components/Layout/MenuCollapse/index.vue'
import * as animationData from "@/assets/cart.json";

@Component({
  components: {
    CategoryMenuDropdown,
    MenuCollapse,
  }
})
export default class TopBar extends Vue {
  @Getter('cart/cartCount') cartCount
  @Getter('wish/wishCount') wishCount
  @Getter('currentShopLogo') currentShopLogo

  q: string = ''

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

  goSearch() {
    this.$router.push('/tim-kiem/' + this.q)
  }

  mounted() {
    this.$bus.$on('searchbar.addkeyword', q => {
      this.q = q
    })

    this.$bus.$on('cart.add', async _ => {
      this.anim.play()
      await this.$helper.sleep(1800)
      this.anim.stop()
    })
  }
}
</script>

<style lang="scss">

// @media (min-width: 320px) {
//   .search-bar {
//     min-width: 200px;
//   }
// }

@media (min-width: 768px) {
  .search-bar {
    min-width: 300px;
  }
}

@media (min-width: 1024px) {
  .search-bar {
    min-width: 200px;
  }
}

@media (min-width: 1280px) {
  .search-bar {
    min-width: 500px;
  }
}

@media (min-width: 1536px) {
  .search-bar {
    min-width: 500px;
  }
}

</style>
