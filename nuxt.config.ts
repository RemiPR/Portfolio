export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@nuxtjs/i18n",
    "@vee-validate/nuxt",
    "vue3-carousel-nuxt",
    "nuxt-swiper",
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
  app: {
    head: {
      titleTemplate: "%s",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content:
            "Professional portfolio of Remigijus Prialgauskis, showcasing web development projects and skills in [Your Key Technologies, e.g., Vue.js, Nuxt, JavaScript].",
        },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        { rel: "preconnect", href: "https://rsms.me/" },
        { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
        { rel: "icon", type: "image/x-icon", href: "/favicon.svg" },
      ],
    },
  },
  runtimeConfig: {
    public: {
      emailjsServiceId: process.env.EMAILJS_SERVICE_ID,
      emailjsTemplateId: process.env.EMAILJS_TEMPLATE_ID,
      emailjsPublicKey: process.env.EMAILJS_PUBLIC_KEY,
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
