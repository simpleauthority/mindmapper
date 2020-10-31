export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'mindmapper',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/global.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://www.npmjs.com/package/nuxt-vuex-localstorage
    ['nuxt-vuex-localstorage', {
      localStorage: ['ls']
    }],
    // https://www.npmjs.com/package/nuxt-fontawesome
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['faQuestionCircle', 'faTrash', 'faEdit']
        }
      ]
    }]
  ],

  // Bootstrap Vue configuration
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  },
}
