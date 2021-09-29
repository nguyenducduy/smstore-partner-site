<template>
  <div class="sticky top-0 z-50 mb-2 bg-white shadow-sm navbar">
    <div class="flex-none lg:flex 2xl:hidden xl:hidden">
      <menu-collapse />
    </div> 
    <div class="mx-2 navbar-start">
      <nuxt-link to="/" class="lg:block md:block sm:block" >
        <img src="/img/logo.png" alt="logo" class="w-10 lg:ml-4 sm:ml-4">
      </nuxt-link>
    </div> 
    <div class="flex px-2 mx-2 navbar-center lg:flex md:flex sm:flex">
      <category-menu-dropdown class="hidden lg:block md:block sm:block" />
      <div class="form-control">
        <input type="text" placeholder="Tìm kiếm" class="bg-gray-100 input search-bar" v-model="q" @keyup.enter="goSearch()">
      </div>
    </div> 
    <div class="navbar-end">
      <div class="mx-8 indicator">
        <div class="mt-2 indicator-item badge badge-primary">
          {{ cartCount }}
        </div> 
        <button class="btn btn-square btn-ghost" @click="$router.push('/gio-hang')">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart" width="26" height="26" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <circle cx="6" cy="19" r="2" />
            <circle cx="17" cy="19" r="2" />
            <path d="M17 17h-11v-14h-2" />
            <path d="M6 5l14 1l-1 7h-13" />
          </svg>
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

@Component({
  components: {
    CategoryMenuDropdown,
    MenuCollapse,
  }
})
export default class TopBar extends Vue {
  @Getter('cart/cartCount') cartCount

  q: string = ''

  goSearch() {
    this.$router.push('/tim-kiem/' + this.q)
  }

  mounted() {
    this.$bus.$on('searchbar.addkeyword', q => {
      this.q = q
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
    min-width: 500px;
  }
}

@media (min-width: 1024px) {
  .search-bar {
    min-width: 500px;
  }
}

@media (min-width: 1280px) {
  .search-bar {
    min-width: 500px;
  }
}

@media (min-width: 1536px) {
  .search-bar {
    min-width: 400px;
  }
}

</style>
