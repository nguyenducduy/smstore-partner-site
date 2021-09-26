<template>
  <div>
    <top-bar />
    <div class="flex flex-col flex-wrap flex-grow w-full py-1 lg:py-4 sm:flex-row sm:flex-nowrap">
      <menu-left />
      <main role="main" class="flex-grow w-full px-4 2xl:px-20 xl:px-10 lg:px-40 md:px-20 sm:px-10">
        <nuxt :key="$route.fullPath" />
      </main>
      <menu-right />
    </div>
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
  @Getter('isDomain') isDomain
  @Getter('currentDomain') currentDomain

  mounted() {
    if (process.client) {
      const host = window.location.host;
      const parts = host.split('.');

      if (
        !this.isDomain
        ||
        (parts.length === 2 && this.currentDomain !== host)
      ) {
        this.$router.replace('/waiting')
      }
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
    flex: 0 1 300px;
    min-width: 300px;
  }
}

@media (min-width: 1536px) {
  .w-fixed {
    flex: 0 1 350px;
    min-width: 350px;
  }
}

</style>
