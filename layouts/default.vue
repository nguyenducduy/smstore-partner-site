<template>
  <div>
    <nuxt :key="$route.fullPath" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Getter } from 'vuex-class'

@Component({})
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

</style>
