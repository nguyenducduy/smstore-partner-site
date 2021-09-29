const helper = {
  env: {},

  getImage(path) {
    return this.env.NUXT_ENV_S3_ENDPOINT + '/' + path
  },

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  getNow: function() {
    // return string datetime
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date +' '+ time;

    return dateTime;
  }
}

export default ({ $config }, inject) => {
  helper.env = $config;

  inject('helper', helper);
}