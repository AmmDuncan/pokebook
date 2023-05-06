// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Pokemon Index'
    },
    pageTransition: {
      name: 'slide-up-in',
      mode: 'out-in'
    }
  },

  ssr: false,

  css: ['assets/fonts/ClashDisplay/stylesheet.css', 'assets/fonts/GeneralSans/stylesheet.css'],

  modules: ['@nuxtjs/tailwindcss', 'nuxt-headlessui'],

  tailwind: {
    cssPath: '~/assets/styles/tailwind.css',
    configPath: 'tailwind.config.js'
  },

  headlessui: {
    prefix: 'Headless'
  }

})
