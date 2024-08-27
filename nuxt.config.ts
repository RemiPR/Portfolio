export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@nuxtjs/i18n",
    "@vee-validate/nuxt",
    "vue3-carousel-nuxt",
    "nuxt-swiper",
    "@nuxt/image",
    "nuxt-lodash",
    "@nuxt/scripts",
  ],
  css: ["@/assets/css/inter.css"],
  googleFonts: {
    families: {
      Inter: true,
    },
    display: "swap",
    prefetch: true,
    preconnect: true,
    preload: true,
  },
  runtimeConfig: {
    public: {
      emailjsServiceId: process.env.EMAILJS_SERVICE_ID,
      emailjsTemplateId: process.env.EMAILJS_TEMPLATE_ID,
      emailjsPublicKey: process.env.EMAILJS_PUBLIC_KEY,
      scripts: {
        googleAnalytics: {
          id: process.env.GOOGLE_ANALYTICS_ID,
        },
      },
    },
  },
  scripts: {
    registry: {
      googleAnalytics: true,
    },
  },
  i18n: {
    // debug: true,
    lazy: true,
    langDir: "locales",
    strategy: "prefix_except_default",
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        name: "English",
        iso: "en-US",
        file: "en.json",
      },
      {
        code: "lt",
        name: "Lietuvių",
        iso: "lt-LT",
        file: "lt.json",
      },
      {
        code: "ja",
        name: "日本語",
        iso: "ja-JP",
        file: "ja.json",
      },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
      alwaysRedirect: true,
      fallbackLocale: "en",
    },
  },
});
