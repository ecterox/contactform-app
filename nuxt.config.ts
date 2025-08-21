// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  //ssr: false,
  devtools: { enabled: true },
  modules: [
    'vuetify-nuxt-module',
    '@vee-validate/nuxt',
    'nuxt-toast'
  ],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      theme: {
        defaultTheme: 'dark',
      }
    }//'./vuetify.config.ts'
  }
})