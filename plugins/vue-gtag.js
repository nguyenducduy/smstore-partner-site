import Vue from 'vue'
import VueGtag from 'vue-gtag'

if (process.NODE_ENV === 'production') {
  Vue.use(VueGtag, {
    config: { id: 'G-FD0B1PN949' }
  })
}

