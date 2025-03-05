import { createConfigForNuxt } from '@nuxt/eslint-config'

export default createConfigForNuxt({
    features: {
        tooling: {
            regexp: false,
        }
    },
    files: ["/**/*.{vue,ts,js}"],
    ignores: ["**/*.config.{ts,js}", "!**/eslint.config.js"],
    rules: {
        "vue/multi-word-component-names": "off",
    }
})
