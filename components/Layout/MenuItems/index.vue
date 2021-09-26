<template>
  <div>
    <!-- <li class="pb-2 my-px">
      <nuxt-link to="/"
        :class="`flex flex-row items-center h-12 px-4 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-gray-600 ${$route.fullPath === '/' ? 'bg-primary text-primary-content' : ''}`">
        <span class="flex items-center justify-center text-gray-400">
          <svg fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-6 h-6">
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
        </span>
        <span class="ml-3">Khám phá các chương trình</span>
      </nuxt-link>
    </li>
     -->
    <!-- <li class="my-px" v-if="isAuth">
      <nuxt-link to="/yeu-thich"
        :class="`flex flex-row items-center h-12 px-4 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-gray-600 ${$route.fullPath === '/yeu-thich' ? 'bg-primary text-primary-content' : ''}`">
        <span class="flex items-center justify-center text-pink-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
          </svg>
        </span>
        <span class="ml-3">Danh sách yêu thích</span>
      </nuxt-link>
    </li> -->
    <li class="flex flex-row my-8 ml-4">
      <span class="h-12 text-sm text-gray-500">
        &copy; 2021, tct
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