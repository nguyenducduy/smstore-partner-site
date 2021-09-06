<template>
  <p>waiting for first visit site, setting up shop...</p>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  layout: 'default',
})
export default class SettingUpPage extends Vue {
  redirectUrl: string = ''

  mounted() {
    // this page using to check valid shop and init shop data for first visit
    // on init done, redirect to user enter page
    if (process.client) {
      const host = window.location.host;
      const parts = host.split('.');

      //check if subdomain of mydomain
      if (parts.length === 3) {
        console.log(parts[0]);
        Vue.ls.set('domain', parts[0]);
        this.$cookiz.set('domain', parts[0]);
      }

      // check if custom domain
      if (parts.length === 2) {
        Vue.ls.set('domain', host);
        this.$cookiz.set('domain', host);
      }
    }
  }
}
</script>

