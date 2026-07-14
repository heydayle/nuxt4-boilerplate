// https://github.com/nuxt/test-utils/issues/566#issuecomment-2200984889
import { config } from '@vue/test-utils'
import { beforeAll } from 'vitest'

// Register SplitText component globally so tests resolve it (deep-nested components aren't auto-imported in test env)
import SplitText from '../ui/text-animation/SplitText/SplitText.vue'

beforeAll(() => {
    // Register SplitText globally for test renders
    config.global.components = {
        ...config.global.components,
        SplitText,
    };
})

