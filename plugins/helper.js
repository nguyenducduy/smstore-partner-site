// Importing the crypto library
const crypto = require("crypto")

// Defining the algorithm
var algorithm = 'aes-256-cbc'; // or any other algorithm supported by OpenSSL
var key = '2r5u8x/A?D(G+KbPeShVmYq3s6v9y$B&';

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
  },

  cipher(message) {
    // the cipher function
    const cipher = crypto.createCipheriv(
      algorithm,
      this.env.NUXT_ENV_AES_SECRET_KEY,
      'r5u8x/A?D(G+KbPe'
    );

    let encryptedData = cipher.update(message);

    encryptedData += cipher.final("base64");

    return encryptedData
  }
}

export default ({ $config }, inject) => {
  helper.env = $config;

  inject('helper', helper);
}