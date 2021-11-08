<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img :src="$helper.getImage(currentShopLogo)" class="sm:mx-4">
      </b-navbar-item>
    </template>

    <template #start>
      <template v-for="cate in categories">
        <b-navbar-dropdown  hoverable :label="cate.name" v-if="cate.children.length > 0" :key="cate.slug">
          <template v-for="child1 in cate.children">
            <b-navbar-dropdown :label="child1.name"  v-if="child1.children.length > 0" :key="child1.slug">
              <!-- dont show -->
            </b-navbar-dropdown>
            <b-navbar-item v-else :key="child1.slug" :href="`/danh-muc/${child1.slug}`">
              {{ child1.name }}
            </b-navbar-item>
          </template>
        </b-navbar-dropdown>
        <b-navbar-item v-else :key="cate.slug" :href="`/danh-muc/${cate.slug}`">
          {{ cate.name }}
        </b-navbar-item>
      </template>

      <!-- <b-navbar-item href="#">
          Documentation
      </b-navbar-item>

      <b-navbar-dropdown label="Info">
        <b-navbar-item href="#">
            About
        </b-navbar-item>
        <b-navbar-item href="#">
            Contact
        </b-navbar-item>
      </b-navbar-dropdown>

      <b-navbar-dropdown label="Info">
        <b-navbar-item href="#">
            About
        </b-navbar-item>
        <b-navbar-item href="#">
            Contact
        </b-navbar-item>
      </b-navbar-dropdown> -->
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <b-input placeholder="Tìm kiếm ..."
            type="search"
            icon="magnify"
            icon-clickable>
        </b-input>
        &nbsp;
        <div class="buttons">
          <a class="button is-light" @click="$router.push('/gio-hang')">
            {{ cartCount }}

            <lottie
              :options="defaultOptions"
              v-on:animCreated="handleAnimation"
            />
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Getter } from 'vuex-class'
import * as animationData from "@/assets/cart.json";

import fetchCategories from '@/gql/queries/fetchCategories.gql'

@Component({
  components: {
  }
})
export default class TopBar extends Vue {
  @Getter('cart/cartCount') cartCount
  @Getter('wish/wishCount') wishCount
  @Getter('currentShopLogo') currentShopLogo
  @Getter('currentShopId') currentShopId

  categories: any = null;
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

  async mounted() {
    this.$bus.$on('searchbar.addkeyword', q => {
      this.q = q
    })

    this.$bus.$on('cart.add', async _ => {
      this.anim.play()
      await this.$helper.sleep(1800)
      this.anim.stop()
    })

    const r = await this.$apollo.query({
      query: fetchCategories,
      variables: { store_id: this.currentShopId },
    })

    this.categories = r.data.categories
  }
}
</script>

<style lang="scss">

// @media (min-width: 320px) {
//   .search-bar {
//     min-width: 200px;
//   }
// }

// @media (min-width: 768px) {
//   .search-bar {
//     min-width: 300px;
//   }
// }

// @media (min-width: 1024px) {
//   .search-bar {
//     min-width: 200px;
//   }
// }

// @media (min-width: 1280px) {
//   .search-bar {
//     min-width: 500px;
//   }
// }

// @media (min-width: 1536px) {
//   .search-bar {
//     min-width: 500px;
//   }
// }

</style>
