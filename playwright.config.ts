import { fileURLToPath } from 'node:url'
import { defineConfig, devices } from '@playwright/test'
import type { ConfigOptions } from '@nuxt/test-utils/playwright'

// For first setup !!
// Please run 'npx playwright install' to install the browser

// Increase the timeout to 2 minutes (because Nuxt server is start so slow)
const timeout = 120000
const hostUrl = 'http://localhost:3000'

export default defineConfig<ConfigOptions>({
    testDir: './app/e2e',
    outputDir: 'tests-output',
    snapshotDir: 'tests-screenshot',
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    reporter: process.env.CI ? 'dot' : 'html',
    timeout,
    use: {
        // nuxt: {
        //     buildDir: '.nuxt',
        //     rootDir: fileURLToPath(new URL('./', import.meta.url)),
        //     setupTimeout: timeout,
        // },
        actionTimeout: 0,
        baseURL: hostUrl,
        trace: 'on-first-retry',
        screenshot: 'on',
    },
    projects: [
        {
        name: "chromium",
        use: { ...devices["Desktop Chrome"] },
        },

        {
        name: "firefox",
        use: { ...devices["Desktop Firefox"] },
        },

        {
        name: "webkit",
        use: { ...devices["Desktop Safari"] },
        },
    ],
    /* Run your local dev server before starting the tests */
    //   webServer: {
    //     command: 'pnpm dev',
    //     port: 3000,
    //   },
})