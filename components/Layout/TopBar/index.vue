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
      <button class="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">     
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>                     
        </svg>
      </button> 
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
