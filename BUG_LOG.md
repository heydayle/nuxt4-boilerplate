# Bug Tracker

## [26/06/2026] - Build timeout on Windows (pre-existing)

**Status:** ⏳ Pending (environment issue - seems resolved as of 29/06 build succeeds)
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

---

## [29/06/2026] - Unnecessary import of compiler macros in NBLogo.vue

**Status:** ✅ Fixed
**Description:** `import { defineProps, withDefaults } from "vue";` in NBLogo.vue - these are compiler macros automatically available in `<script setup>` and should not be imported. Caused Vue compiler warnings.
**Files affected:** `app/components/NBLogo.vue`
**Fix:** Removed the unnecessary import line.
**Verification:** Lint ✅, Test ✅ (1/1), Build ✅

## [30/06/2026] - Contacts config misplaced at root level instead of inside app object

**Status:** ✅ Fixed
**Description:** In `app.config.ts`, the `contacts` array was defined at the root level of the config object, but `contact.vue` accesses it via `config.app.contacts` (consistent with other config properties like `app.socials`, `app.features`). This would cause `contacts` to be `undefined` at runtime, so the contact links would not render.
**Files affected:** `app/app.config.ts`
**Fix:** Moved `contacts: [...]` from the root level into the `app: { ... }` object to match the access pattern in `contact.vue` and the type declaration in `index.d.ts`.
**Verification:** Lint ✅, Test ✅ (1/1), Build: ⏳ (pre-existing Nitro timeout on Windows)

## [02/07/2026] - Wrong module alias imports for Nuxt 4 (Sidebar.vue, document.vue, index.d.ts)

**Status:** ✅ Fixed
**Description:** In Nuxt 4, `~` alias maps to `app/` directory, not root. Sidebar.vue and document.vue used `~/types/nuxtTypes` which resolves to `app/types/nuxtTypes` (doesn't exist). index.d.ts used `@/types/nuxtTypes` which also maps to `app/`. Additionally, `Navigation` type was used in index.d.ts but not imported.
**Files affected:** `app/components/layouts/Sidebar.vue`, `app/layouts/document.vue`, `index.d.ts`
**Fix:** Changed `~/types/nuxtTypes` → `~~/types/nuxtTypes` in Sidebar.vue and document.vue. Changed `@/types/nuxtTypes` → `./types/nuxtTypes` in index.d.ts and added `Navigation` to the import.
**Verification:** Lint ✅, Test ✅ (1/1), Build ⏳ (Nitro final packaging timeout on Windows - pre-existing, client + SSR builds succeed)
**Commit:** ba00b44

---

## [01/07/2026] - TypeScript type errors in SelectLanguage.vue

**Status:** ✅ Fixed
**Description:** SelectLanguage.vue had 3 TypeScript errors: (1) unsafe cast from `LocaleObject` to custom `Locale` interface (missing `flag` property) flagged by TS2352; (2) v-model value ref typed as `string` but required locale code union type `"en" | "vi"` flagged by TS2322; (3) `item.flag` typed as `unknown` in template flagged by TS2322.
**Files affected:** `app/components/SelectLanguage.vue`
**Fix:** (1) Changed `as Locale` to `as unknown as Locale | undefined`; (2) Added `type LocaleCode = typeof locale.value` and used it for `ref<LocaleCode | undefined>`; (3) Cast `(item as unknown as Locale).flag` in template; Used optional chaining `selected?.flag` for safe access.
**Verification:** Lint ✅, Test ✅ (1/1), Build: ⏳ (pre-existing Nitro timeout on Windows)

---

## [03/07/2026] - console.log left in production login.vue

**Status:** ✅ Fixed
**Description:** `console.log("Error: ", errorResponse)` was left in production code in `handleOnError` callback on login.vue line 31. Same pattern as 26/06 fix for components.vue.
**Files affected:** `app/pages/auth/login.vue`
**Fix:** Removed console.log statement, renamed parameter to `_errorResponse` with underscore prefix for unused-var lint compliance.
**Verification:** Lint ✅, Test ✅ (1/1), Build ⏳ (pre-existing Nitro timeout on Windows)
**Commit:** bafdaf6
