const helper = {
  env: {},

  getImage(path) {
    return this.env.NUXT_ENV_S3_ENDPOINT + '/' + path
  },

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default ({ $config }, inject) => {
  helper.env = $config;

  inject('helper', helper);
}