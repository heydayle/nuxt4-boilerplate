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
