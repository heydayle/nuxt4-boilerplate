// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    'nuxt-vue3-google-signin',
    '@sidebase/nuxt-auth',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts'
  ],
  image: {
    dir: 'assets/images'
  },
  css: ['@/assets/styles.css'],
  googleSignIn: {
    clientId: process.env.GG_CLIENT_ID,
  },
  runtimeConfig: {
    public: {
        GOOGLE_API_KEY: process.env.GG_API_KEY,
        SPREAD_SHEET_ID: process.env.SPREAD_SHEET_ID,
        telegramBotToken: process.env.TELEGRAM_BOT_TOKEN
    }
  },
  vite: {
    server: {
      allowedHosts: ['localhost', '.dev']
    }
  },
  auth: {
    isEnabled: true,
    baseURL: 'http://localhost:3000/api/auth',
    provider: {
      type: 'authjs'
    },
    globalAppMiddleware: {
      isEnabled: false
    }
  },
  i18n: {
    locale: 'en',
    strategy: 'prefix',
    locales: [
        {
          code: 'en',
          name: 'English',
          flag: 'twemoji:flag-united-kingdom',
        },
        {
          code: 'vi',
          name: 'Tiếng Việt',
          flag: 'twemoji:flag-vietnam',
        },
    ],
    messages: {
      en: {
        hello: 'Hello'
      },
      vi: {
        hello: 'Xin chào'
      }
    }
  },
  googleFonts: {
    families: {
      'Be Vietnam Pro': '100..900',
      Roboto: true,
      'Josefin+Sans': true,
    }
  }
})