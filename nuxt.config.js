const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: pkg.description}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: "https://fonts.googleapis.com/css?family=Open+Sans"}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#3B8070'},
  loadingIndicator: {name: 'circle', color: '#fa923f'},

  /*
  ** Global CSS
  */
  css: ['~assets/styles/main.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~plugins/core-componets.js', '~plugins/date-filter.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: ['@nuxtjs/axios'],
  axios: {
    baseURL: process.env.BASE_URL || 'https://fir-nuxt-blog-2-default-rtdb.firebaseio.com',
    credentials: false,
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  },

  env: {
    baseUrl: process.env.BASE_URL || 'https://fir-nuxt-blog-2-default-rtdb.firebaseio.com',
    fbAPIKey: 'AIzaSyB3492OY4jn0Uh8MNnHdVbc7cmScg7iJYY'
  },

  transition: {
    name: 'fade',
    mode: 'out-in'
  },

  // router:{
  //   middleware:'log'
  // },
  target:'static'

}
