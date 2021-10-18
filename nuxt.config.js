import colors from 'vuetify/es5/util/colors'

export default {
  ssr: false,

  target: 'static',

  head: {
    titleTemplate: '%s - КИХ',
    title: 'КИХ',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '/styles/app.min.css' }
    ],
    script: [
        { src: "https://code.jquery.com/jquery-3.5.1.min.js", integrity: "sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=", crossorigin: "anonymous" },
        { src: "/scripts/focus-visible.min.js" },
        { src: "/scripts/lazyload.min.js" },
        { src: "/scripts/modal.min.js" },
        { src: "/scripts/scrollbar.min.js" },
        { src: "/scripts/slide-toggle.min.js" },
        { src: "/scripts/swiper-bundle.min.js" }
   ]
  },

  css: [
      '~/assets/index.scss'
  ],

  plugins: [
    '~/plugins/extend-app.js'
  ],

  components: true,

  buildModules: [
    '@nuxtjs/vuetify'
  ],

  modules: [
      '@nuxtjs/proxy'
  ],
  
  env: {
      apiUrl:  (/^(dev)+/i.test(process.env.NODE_ENV)) ? '/api' : '//kih.ru/wp-json'
  },
  proxy: {
        "/api": {
            target: 'http://www.kih.ru/wp-json',
            pathRewrite: {'^/api': ''}
        }
  },    /*proxy*/

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
      }
    }
  },

  build: {
  }
}
