export default function ({
  $axios,
  store,
  redirect,
  $config: {
    NUXT_ENV_GUEST_TOKEN,
  }
}) {
  $axios.onRequest(config => {
    // console.log('Making request to ' + config.url);
    // console.log(store.state.users.token);
    if (store.state.users.token !== null) {
      config.headers = {
        Authorization: "Bearer " + store.state.users.token
      }
    }
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    console.log(error.response);
  })
}