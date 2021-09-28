<template>
  <p>waiting for first visit site, setting up shop...</p>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import fetchStore from '@/gql/queries/fetchStore.gql'

@Component({
  layout: 'blank'
})
export default class SettingUpPage extends Vue {
  redirectUrl: string = ''
  domain: string = ''

  async mounted() {
    // this page using to check valid shop and init shop data for first visit
    // on init done, redirect to user enter page

    const host = window.location.host;
    const parts = host.split('.');

    //check if subdomain of tct domain
    if (parts.length === 3) {
      this.domain = parts[0]
      // Vue.ls.set('domain', parts[0]);
      // this.$cookiz.set('domain', parts[0]);
    }

    // check if custom domain
    if (parts.length === 2) {
      this.domain = host
      // Vue.ls.set('domain', host);
      // this.$cookiz.set('domain', host);
    }

    console.log(this.domain);
    
    // get shop info
    const r = await this.$apollo.query({
      query: fetchStore,
      variables() {
        return {
          where: {
            _and: {
              domain: { _eq: this.domain },
              is_activated: { _eq: true },
              is_blocked: { _eq: false }
            }
          }
        }
      }
    });

    if (r.data) {
      this.__setStoreInfo(r.data.stores[0].id)
    }
  }

  __setStoreInfo(id) {
    Vue.ls.set('storeId', id);
    this.$cookiz.set('storeId', id);
  }
}
</script>

