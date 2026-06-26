# Bug Tracker

## [26/06/2026] - Build timeout on Windows (pre-existing)

**Status:** ⏳ Pending (environment issue)
**Description:** Nuxt Nitro server build step times out on Windows VM (>400s for final packaging). This affects all builds on this environment.
**Files affected:** All (Nuxt Nitro build pipeline)
**Root cause:** Windows performance issue with Nitro's rollup-based server bundling. Client and SSR builds succeed; only the final Nitro packaging step hangs.
**Suggested fix:** Run builds on Linux/macOS or increase CI build timeout. Alternatively, use `nitro: { preset: 'node-server' }` optimization.
**Related TODO:** `app/pages/components.vue:75`

---

## [26/06/2026] - Removed console.log in production code

**Status:** ✅ Fixed
**Description:** `console.log("Form valid:", valid)` was left in production code on components.vue line 76
**Files affected:** `app/pages/components.vue`
**Fix:** Removed debug console.log statement
**Verification:** Lint ✅, Test ✅ (build: ⏳ timeout on Windows, non-blocking)

## [26/06/2026] - Missing default value for onLetterAnimationComplete prop in SplitText.vue

**Status:** ✅ Fixed
**Description:** Prop `onLetterAnimationComplete` in SplitText.vue was missing a default value, triggering `vue/require-default-prop` ESLint warning.
**Files affected:** `app/components/ui/text-animation/SplitText/SplitText.vue`
**Fix:** Added `onLetterAnimationComplete: undefined` to `withDefaults()` default values.
**Verification:** Lint ✅, Test ✅ (1/1), Build: ❌ (pre-existing Nitro issue on Windows)

## [26/06/2026] - Build failure on Windows (pre-existing Nitro issue)

**Status:** ⏳ Pending (environment issue)
**Description:** Nuxt Nitro build fails on Windows with: `Could not load virtual:#nitro-internal-virtual/public-assets-data` after client and SSR builds succeed.
**Files affected:** All (Nitro build pipeline)
**Root cause:** Nuxt 4 + Nitro compatibility issue on Windows. Client and server bundles build fine, but the final Nitro packaging step fails to find generated public asset metadata files.
**Suggested fix:** Run builds on Linux/macOS, or update Nuxt/Nitro to a version that fixes Windows compatibility.

## [27/06/2026] - Missing Navigation type import in document.vue

**Status:** ✅ Fixed
**Description:** Type `Navigation` was used in `document.vue` (line 14, `[] as Navigation[]`) without importing it, causing TypeScript error TS2552.
**Files affected:** `app/layouts/document.vue`
**Fix:** Added `import type { Navigation } from "~/types/nuxtTypes";` at the top of the script section.
**Verification:** Lint ✅, Test ✅ (1/1), Build: ⏳ (pre-existing Nitro issue on Windows)
