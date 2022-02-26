// @ts-check

/**
 * @type {import('@nuxt/types').NuxtConfig}
 */
const config = {
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['normalize.css', '@/styles/global.css'],

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'en',
    },
    link: [{ href: '/favicon.ico', rel: 'icon', type: 'image/x-icon' }],
    meta: [
      { charset: 'utf-8' },
      { content: 'width=device-width, initial-scale=1', name: 'viewport' },
      { content: '', hid: 'description', name: 'description' },
      { content: 'telephone=no', name: 'format-detection' },
    ],
    title: 'try-nuxt-js',
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  srcDir: 'src/',

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
}

export default config
