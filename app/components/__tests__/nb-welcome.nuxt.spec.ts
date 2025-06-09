import { test, expect, describe } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { NBWelcome } from '#components'

describe('Welcome Page', async () => {
    test('should render the welcome message', async () => {
        const wrapper = await mountSuspended(NBWelcome)
        const title = await wrapper.find('h1')
        await expect(title.text()).toMatchInlineSnapshot('"Welcome to the Nuxt Boilerplate!"')
    })
})