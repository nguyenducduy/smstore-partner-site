<template>
  <div>
    <li class="pb-2 my-px">
      <nuxt-link to="/"
        :class="`flex flex-row items-center h-12 px-4 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-gray-600 ${$route.fullPath === '/' ? 'border border-indigo-500 text-indigo-700' : ''}`">
        <span class="flex items-center justify-center text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-smart-home" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6f32be" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M19 8.71l-5.333 -4.148a2.666 2.666 0 0 0 -3.274 0l-5.334 4.148a2.665 2.665 0 0 0 -1.029 2.105v7.2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-7.2c0 -.823 -.38 -1.6 -1.03 -2.105" />
            <path d="M16 15c-2.21 1.333 -5.792 1.333 -8 0" />
          </svg>
        </span>
        <span class="ml-3">Tất cả sản phẩm</span>
      </nuxt-link>
    </li>
    
    <li class="my-px">
      <nuxt-link to="/wish"
        :class="`flex flex-row items-center h-12 px-4 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-gray-600 ${$route.fullPath === '/wish' ? 'border border-pink-500 text-pink-500' : ''}`">
        <span class="flex items-center justify-center text-pink-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
          </svg>
        </span>
        <span class="ml-3">DS Muốn mua</span>
      </nuxt-link>
    </li>
    <li class="flex flex-row my-8 ml-4">
      <span class="h-12 text-sm text-gray-500">
        &copy; 2021 Powered by tiemcuatui.com
      </span>
      <!-- <a href="#"
        class="h-12 text-gray-600 rounded-lg">
        <span class="text-sm">Quyền riêng tư</span>
      </a>
      &nbsp;
      &#183;
      &nbsp;
      <a href="#" class="h-12 text-gray-600 rounded-lg">
        <span class="text-sm">Điều khoản</span>
      </a> -->
    </li>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class MenuItems extends Vue {

  
}
</script>