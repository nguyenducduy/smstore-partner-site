<template>
  <div v-lazy-container="{ selector: 'img' }">
    <p >Xin chào, {{ currentDomain }}!</p>
    <nuxt-link to="hi">Go to Hi page</nuxt-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Getter } from 'vuex-class'

@Component({
  layout: 'default',
})
export default class HomePage extends Vue {
  @Getter('isDomain') isDomain
  @Getter('currentDomain') currentDomain

  mounted() {
   
  }
}
</script>

