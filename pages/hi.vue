<template>
  <div v-lazy-container="{ selector: 'img' }">
    <p >Hiiiiiii, {{ currentShopId }}!</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Getter } from 'vuex-class'

@Component({
  layout: 'default',
})
export default class HomePage extends Vue {
  @Getter('isShop') isShop
  @Getter('currentShopId') currentShopId

  mounted() {

  }
}
</script>

