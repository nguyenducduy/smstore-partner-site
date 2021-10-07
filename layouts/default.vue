<template>
  <div>
    <top-bar />
    <div class="flex flex-col flex-wrap flex-grow w-full py-4 sm:flex-row sm:flex-nowrap">
      <menu-left />
      <main role="main" class="flex-grow w-full px-4 2xl:px-20 xl:px-10 lg:px-40 md:px-8 sm:px-10">
        <nuxt :key="$route.fullPath" />
      </main>
      <menu-right />
    </div>
    <notifications/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Getter } from 'vuex-class'
import MenuLeft from '@/components/Layout/MenuLeft/index.vue'
import MenuRight from '@/components/Layout/MenuRight/index.vue'
import TopBar from '@/components/Layout/TopBar/index.vue'

@Component({
  components: {
    TopBar,
    MenuLeft,
    MenuRight
  }
})
export default class DefaultLayout extends Vue {
  @Getter('isShop') isShop

  mounted() {
    if (!this.isShop) {
      this.$router.replace('/setup')
    }
  }
}
</script>

<style lang="scss">
@media (min-width: 320px) and (max-width: 767px) {
  .w-fixed {
    display: none;
  }
}

@media (min-width: 768px) and (max-width: 1279px) {
  .w-fixed {
    display: none;
  }
}

@media (min-width: 1280px) {
  .w-fixed {
    flex: 0 1 230px;
    min-width: 230px;
  }
}

@media (min-width: 1536px) {
  .w-fixed {
    flex: 0 1 300px;
    min-width: 300px;
  }
}

</style>
