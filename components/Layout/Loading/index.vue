<template>
  <div class="bg-gray-100 rounded-2xl">
     <svg version="1.1" id="L5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
      <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
        <animateTransform 
          attributeName="transform" 
          dur="1s" 
          type="translate" 
          values="0 15 ; 0 -15; 0 15" 
          repeatCount="indefinite" 
          begin="0.1"/>
      </circle>
      <circle fill="#fff" stroke="none" cx="30" cy="50" r="6">
        <animateTransform 
          attributeName="transform" 
          dur="1s" 
          type="translate" 
          values="0 10 ; 0 -10; 0 10" 
          repeatCount="indefinite" 
          begin="0.2"/>
      </circle>
      <circle fill="#fff" stroke="none" cx="54" cy="50" r="6">
        <animateTransform 
          attributeName="transform" 
          dur="1s" 
          type="translate" 
          values="0 5 ; 0 -5; 0 5" 
          repeatCount="indefinite" 
          begin="0.3"/>
      </circle>
    </svg>
      Đang tải dữ liệu ....
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class Loading extends Vue {

}
</script>

<style scoped>

svg{
  width: 50px;
  height: 50px;
  margin: 20px;
  display:inline-block;
}
</style>