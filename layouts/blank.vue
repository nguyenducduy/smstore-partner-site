<template>
  <div>
    <nuxt :key="$route.fullPath" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
export default class BlankLayout extends Vue {
}
</script>

<style lang="scss">


</style>
