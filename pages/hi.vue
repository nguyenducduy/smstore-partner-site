<template>
  <div v-lazy-container="{ selector: 'img' }">
    <p >Hiiiiiii, {{ currentDomain }}!</p>
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

