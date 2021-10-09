<template>
  <vueper-slides class="no-shadow" autoplay fade>
    <vueper-slide v-for="(slide, i) in slides"
      :key="i"
      :image="$helper.getImage(slide.image_path)"
      :link="slide.link"
      />
  </vueper-slides>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

@Component({
  components: {
    VueperSlides,
    VueperSlide
  }
})
export default class Banners extends Vue {
  @Prop()
  slides
}
</script>