// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({

  app: {
    head: {
      title: "Pokemon Index",
      meta: [
        {
          name: "description",
          content: "Largest Pokémon index with information about every Pokemon you can think of."
        }
        // facebook meta tags
        { property: "og:url", content: "https://pokebook.ammielyawson.com" },
        { property: "og:type", content: "website" },
        { property: "og:title", content: "Pokemon Index" },
        {
          property: "og:description",
          content: "Largest Pokémon index with information about every Pokemon you can think of."
        },
        // twitter
        { name: "twitter:card", content: "summary_large_image" },
        { property: "twitter:domain", content: "pokebook.ammielyawson.com" },
        { name: "twitter:title", content: "Pokemon Index" },
        {
          name: "twitter:description",
          content: "Largest Pokémon index with information about every Pokemon you can think of."
        },
        { name: "twitter:image", content: "https://pokebook.ammielyawson.com/logo-illustration.png" }
      ]
    }
    ,
    pageTransition: {
      name: "slide-up-in",
      mode: "out-in"
    }
  },

  ssr: false,

  css: ["assets/fonts/ClashDisplay/stylesheet.css", "assets/fonts/GeneralSans/stylesheet.css"],

  modules: ["@nuxtjs/tailwindcss", "nuxt-headlessui"],

  tailwind: {
    cssPath: "~/assets/styles/tailwind.css",
    configPath: "tailwind.config.js"
  },

  headlessui: {
    prefix: "Headless"
  }

});
