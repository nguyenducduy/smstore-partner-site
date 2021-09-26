<template>
  <div>
    <div class="flex-grow-0 flex-shrink w-full px-4 w-fixed ">
      <div class="flex min-h-screen lg:justify-start">
        <div class="flex w-full max-w-xs p-4 bg-white lg:p-0">
          <ul class="flex flex-col w-full">
            <menu-items />
          </ul>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import MenuItems from '@/components/Layout/MenuItems/index.vue'

@Component({
  components: {
    MenuItems
  }
})
export default class TopBar extends Vue {
  
}
</script>