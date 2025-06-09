// https://github.com/nuxt/test-utils/issues/566#issuecomment-2200984889
import { config } from '@vue/test-utils'
import { beforeAll } from 'vitest'
import { createI18n } from 'vue-i18n'
import en from '../../../i18n/locales/en.json'
import vi from '../../../i18n/locales/vi.json'

beforeAll(() => {
    const nuxt = tryUseNuxtApp();
    if (nuxt) {
        const i18n = createI18n({
            legacy: false,
            globalInjection: true,
            locale: 'en',
            messages: {
                en,
                vi
            },
        });
        // register the i18n plugin in both nuxts vue app and the vue app used by vue/test-utils
        nuxt.vueApp.use(i18n);
        config.global.plugins.push(i18n);
    }
})


// const i18n = createI18n({
//   legacy: false,
//   globalInjection: true,
//   locale: 'en',
//   messages: {
//     en,
//   },
// })

// config.global.plugins.push(i18n)