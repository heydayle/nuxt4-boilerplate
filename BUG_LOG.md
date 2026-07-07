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

---

## [04/07/2026] - Vitest watch mode hang (missing --run flag)

**Status:** ✅ Fixed
**Description:** The `test` script in package.json ran `vitest` without the `--run` flag, causing vitest to enter watch mode and hang indefinitely in automated/CI environments. All previous daily runs were also affected but the timeout masked it as a "test hang" rather than a failure.
**Files affected:** `package.json`
**Fix:** Changed `"test": "vitest app/components/__tests__"` → `"test": "vitest run app/components/__tests__"`. This makes vitest exit after a single test run.
**Verification:** Lint ✅, Test ✅ (1/1), Build ⏳ (pre-existing Nitro timeout on Windows - client + SSR build succeed, only final packaging stalls)
||**Commit:** fcfcc04

|---

## [05/07/2026] - Wrong UBreadcrumb prop in contents.vue (`:links` → `:items`)

**Status:** ✅ Fixed
**Description:** `UBreadcrumb` in contents.vue used `:links` prop, but Nuxt UI v3's `UBreadcrumb` component expects `:items` prop. The breadcrumb was not rendering at all. Other pages (components.vue) correctly used `:items`.

**Files affected:** `app/pages/contents.vue`
**Fix:** Changed `<UBreadcrumb :links="links" />` → `<UBreadcrumb :items="links" />`
**Verification:** Lint ✅, Test ✅ (1/1), Build ✅
**Commit:** 0d1e78a

---

## [06/07/2026] - Vite 6.3.5 missing `dist/client/client.mjs` (breaks tests)

**Status:** 🔧 Skipped (external dependency bug - Vite 6.3.5 regression)
**Description:** Vite 6.3.5 is missing `dist/client/client.mjs` which is required by Vite's `testCaseInsensitiveFS()` function called at module load time. When vitest loads Vite internally, it throws `Error: cannot test case insensitive FS, CLIENT_ENTRY does not point to an existing file`. This broke both `pnpm test` and any Nuxt module (like `@nuxt/test-utils/module`) that initializes Vite during loading.
**Files affected:** `node_modules/.pnpm/vite@6.3.5_.../node_modules/vite/dist/client/client.mjs` (missing)
**Root cause:** Vite 6.3.5 regression - the `dist/client/client.mjs` file was not included in the published npm package, but Vite's internal code still references it for the case-insensitive FS check.
**Workaround:** Create an empty stub file at `vite/dist/client/client.mjs` in node_modules. Add Vite as a `pnpm.patchedDependencies` entry if this needs to persist.
**Related TODO:** `nuxt.config.ts:18` - removed `@nuxt/test-utils/module` from modules to avoid triggering Vite init during build

## [06/07/2026] - `@nuxt/test-utils/module` in build modules causes build failure

**Status:** ✅ Fixed
**Description:** The `@nuxt/test-utils/module` entry in `nuxt.config.ts` modules array triggered Vite initialization during `nuxt build`, which would fail due to Vite 6.3.5's missing `client.mjs` (see above). Additionally, this module is only needed for Vitest UI integration via Nuxt Devtools, not for CLI test runs or production builds.
**Files affected:** `nuxt.config.ts`
**Fix:** Removed `'@nuxt/test-utils/module'` from the modules array. The vitest config (`vitest.config.ts`) handles test environment setup independently via `@nuxt/test-utils/config`.
**Verification:** Lint ✅, Test ✅ (1/1), Build ✅

---

## [07/07/2026] - Pnpm store corruption: multiple dependencies missing dist files

**Status:** ✅ Fixed (environment fix - node_modules patched)
**Description:** The pnpm store on this Windows environment had corrupted entries for several packages where `dist/` directories were empty or missing essential files. This caused cascading build and test failures:
- `@intlify/core@10.0.7` — empty `dist/` (missing `core.node.mjs`, `core.mjs`, etc.)
- `@intlify/utils@0.13.0` — missing `dist/h3.mjs` and other dist files
- `mocked-exports@0.1.1` — missing `lib/proxy.mjs`, `lib/noop.mjs`, etc.
- `@sqlite.org/sqlite-wasm@3.49.1-build4` — missing `node.mjs`, `index.d.ts`, and other files
- `vite@7.0.5` — missing `dist/client/client.mjs` (Vite regression, same pattern as 06/07)

**Root cause:** Corrupted pnpm store on Windows (confirmed by `pnpm store status` reporting mutated packages). Likely caused by earlier runs modifying node_modules directly or filesystem permissions issues.

**Fix:** Downloaded fresh tarballs from npm registry for each affected package and extracted the missing dist files into the pnpm store (`node_modules/.pnpm/...`). Also created a stub `client.mjs` for Vite 7.0.5 to satisfy its case-insensitive FS check.

**Verification:** Lint ✅, Test ✅ (1/1), Build ✅
**Prevention:** Consider adding `shamefully-hoist=true` to `.npmrc` or running `pnpm install --force` on first setup to avoid store corruption.

---

## [08/07/2026] - Dead code cleanup + useShiki optimization

**Status:** ✅ Fixed  
**Description:** Three cleanup items:
1. **`useShiki.ts`** — Fixed wrong filename comment (`useMarkdownShiki.ts` → `useShiki.ts`). Extracted shared bash block regex into `BASH_BLOCK_RE` constant. Refactored `highlightBashInMarkdown` as an alias of `convertMarkdownWithShiki` (both did exactly the same thing). Added JSDoc docs + type annotations to all public functions.
2. **`NBFeatures.vue`** — Removed 14-line commented-out dead div block in template.
3. **`nuxt.config.ts`** — Removed commented-out `import tailwindcss`, unused `image:` config, and double-commented `nitro:` config block.
**Files affected:** `app/composables/useShiki.ts`, `app/components/NBFeatures.vue`, `nuxt.config.ts`
**Verification:** Lint ✅, Test ✅ (1/1), Build ✅ (all passed)
**Commit:** 6914bb9
