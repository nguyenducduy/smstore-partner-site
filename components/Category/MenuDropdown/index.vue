<template>
  <div class="inline-block group">
    <button
      class="flex items-center px-3 py-1 bg-white rounded-sm outline-none focus:outline-none min-w-32"
    >
      <span class="flex-1 pr-1">Danh mục</span>
      <span>
        <svg
          class="w-4 h-4 transition duration-150 ease-in-out transform fill-current group-hover:-rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </span>
    </button>
    <ul
      class="absolute transition duration-150 ease-in-out origin-top transform scale-0 bg-white border rounded-sm group-hover:scale-100 min-w-60"
    >
      <template v-for="cate in categories">
        <li v-if="cate.children.length > 0" :key="cate.slug" class="relative p-3 rounded-sm hover:bg-blue-100">
          <button
            class="flex items-center w-full text-left outline-none focus:outline-none"
          >
            <span class="flex-1 pr-1">
              <nuxt-link :to="`/${cate.slug}`">
                {{ cate.name }}
              </nuxt-link>
            </span>
            <span class="mr-auto">
              <svg
                class="w-4 h-4 transition duration-150 ease-in-out fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </span>
          </button>
          <ul
            class="absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left bg-white border rounded-sm min-w-60 "
          >
            <template v-for="child1 in cate.children">
              <li v-if="child1.children.length > 0" :key="child1.slug" class="relative p-3 rounded-sm hover:bg-blue-100">
                <button
                  class="flex items-center w-full text-left outline-none focus:outline-none"
                >
                  <span class="flex-1 pr-1">
                    <nuxt-link :to="`/${child1.slug}`">
                      {{ child1.name }}
                    </nuxt-link>
                  </span>
                  <span class="mr-auto">
                    <svg
                      class="w-4 h-4 transition duration-150 ease-in-out fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                      />
                    </svg>
                  </span>
                </button>
                <ul
                  class="absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left bg-white border rounded-sm min-w-60 "
                >
                  <template v-if="child1.children.length > 0">
                    <li v-for="child2 in child1.children" :key="child2.slug" class="p-3 hover:bg-blue-100">
                      <nuxt-link :to="`/${child2.slug}`">
                        {{ child2.name }}
                      </nuxt-link>
                    </li>
                  </template>
                </ul>
              </li>
              <li v-else :key="child1.slug" class="p-3 hover:bg-blue-100">
                <nuxt-link :to="`/${child1.slug}`">
                  {{ child1.name }}
                </nuxt-link>
              </li>
            </template>            
          </ul>
        </li>
        <li v-else class="p-3 rounded-sm hover:bg-blue-100" :key="cate.slug">
          <nuxt-link :to="`/${cate.slug}`">
            {{ cate.name }}
          </nuxt-link>
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Getter } from 'vuex-class'

import fetchCategories from '@/gql/queries/fetchCategories.gql'

@Component({})
export default class CategoryMenuDropdown extends Vue {
  @Getter('currentStoreId') currentStoreId

  categories: any = null;

  async mounted() {
    const r = await this.$apollo.query({
      query: fetchCategories,
      variables: { id: this.currentStoreId },
    })

    this.categories = r.data.categories
  }
}
</script>

<style>
  /* since nested groupes are not supported we have to use 
     regular css for the nested dropdowns 
  */
  li>ul                 { transform: translatex(100%) scale(0) }
  li:hover>ul           { transform: translatex(101%) scale(1) }
  li > button svg       { transform: rotate(-90deg) }
  li:hover > button svg { transform: rotate(-270deg) }

  /* Below styles fake what can be achieved with the tailwind config
     you need to add the group-hover variant to scale and define your custom
     min width style.
  	 See https://codesandbox.io/s/tailwindcss-multilevel-dropdown-y91j7?file=/index.html
  	 for implementation with config file
  */
  .group:hover .group-hover\:scale-100 { transform: scale(1) }
  .group:hover .group-hover\:-rotate-180 { transform: rotate(180deg) }
  .scale-0 { transform: scale(0) }
  .min-w-60 { min-width: 16rem }
</style>