<template>
  <div class="w-full dropdown">
    <div tabindex="0" class="m-1 btn btn-square btn-ghost">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">           
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>               
      </svg>  
    </div>
    <div tabindex="0" class="bg-white shadow w-72 card dropdown-content rounded-box">
      <div class="p-2 card-body">
        <ul class="w-full">
          <menu-items />    
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import MenuItems from '@/components/Layout/MenuItems/index.vue'

@Component({
  components: {
    MenuItems
  }
})
export default class MenuCollapse extends Vue {

}
</script>