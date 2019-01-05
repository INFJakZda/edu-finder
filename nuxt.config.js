const pkg = require('./package')
import webpack from 'webpack'

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['~/assets/styles/semantic.less'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'semantic-ui-vue/nuxt'
    'nuxt-fontawesome'
  ],

  fontawesome: {
    component: 'icon',
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      }
    ]
  },

  auth: {
    // Redirection options
    redirect: {
      // redirect if login is required
      login: '/login-form',
      // redirect after logout
      logout: '/',
      // redirect after login
      home: '/'
    },
    strategies: {
      local: {
        _scheme: 'local',
        endpoints: {
          login: {
            url: '/api/account/signin',
            method: 'post',
            propertyName: 'token'
          },
          logout: { url: '/api/account/signout', method: 'post' },
          user: { url: '/api/account', method: 'get', propertyName: false }
        },
        tokenRequired: true,
        tokenType: 'bearer'
      }
    }
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    https: true,
    credentials: true,
    baseURL: 'https://loli-server.azurewebsites.net'
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      config.resolve.alias['../../theme.config$'] =
        '~/assets/styles/theme.config'
      config.plugins.push(new webpack.ProvidePlugin({ _: 'lodash' }))
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
