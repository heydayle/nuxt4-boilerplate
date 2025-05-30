

# ⚙️ App Configuration (`app.config.ts`)

This file provides global app-level configuration for the Nuxt Boilerplate. It leverages the `defineAppConfig()` method to expose static configuration accessible via `useAppConfig()` anywhere in your Nuxt 3 app.

#
---

## 📌 Structure Overview

```ts
export default defineAppConfig({
  ui: { ... },
  app: { ... }
})
```


## 🎨 ui

Configures UI theming preferences:

```ts
ui: {
  colors: {
    primary: 'green',
    neutral: 'slate',
  },
  ...
}
```

- Checkout for more in [NuxtUI Documents](https://ui.nuxt.com/getting-started/theme#configuration)

---

## 🧠 app

The main configuration object that contains `version`, `meta`, `navigation`, `socials`, `features`, and documentation structure.

### 🆎 version

```ts
version: 'v0.0.1-alpha'
```
- Defines the app version for reference (can be shown in footers or tooltips).

### 🧾 meta

```ts
meta: {
  title: 'Nuxt Boilerplate',
  description: 'Nuxt Starter with Vite',
  keywords: 'nuxt, vite, starter',
  image: '/cover.png',
  author: 'Devaloka',
  publisher: 'Devaloka',
  canonical: 'https://github.com/heydayle/nuxt-boilerplate-v3'
}
```

- Standard SEO metadata used for head tag rendering.

- title, description, keywords: Meta tags for search engines.

- image: Open Graph preview image.

- author, publisher: Attribution.

- canonical: Canonical URL to avoid SEO duplication.

### 🌐 socials

```ts
socials: [
  {
    name: 'Github',
    icon: 'simple-icons:github',
    href: 'https://github.com/heydayle/nuxt-boilerplate-v3'
  }
]
```
List of social profiles with:

- name: Platform name.

- icon: Icon name from Iconify collection.

- href: External link.

### 🧭 headers

```ts
headers: {
  heading: 'Nuxt Starter',
  logo: '/logo.svg',
  navigation: [ ... ]
}
```

- heading: Main title in header section.

- logo: Path to the brand logo image.

- navigation: Defines site navigation links:


    ```ts
    navigation: [
      {
        name: "get-started",
        label: "nav.docs",
        path: "/get-started"
      },
      ...
    ]
    ```

    Each nav item includes:

    - name: `Internal ID`
    
    - label: `i18n` key or `display text`
    
    - path: `Route path`
    
### ⚡ features

```ts
features: [
  { label: 'Next Auth', icon: 'fluent-color:shield-checkmark-20' },
  { label: 'Pinia', icon: 'logos:pinia' },
  ...
 ]
```
#
---
---

### 🔍 Accessing Config in Your App

Use `useAppConfig()` to access any of this configuration anywhere in your Nuxt app:

```ts
const config = useAppConfig()

console.log(config.app.version) // Output: v0.0.1-alpha
console.log(config.app.meta.title) // Output: Nuxt Boilerplate
```

### 🧩 Use Cases
- Dynamic rendering of headers, navigation, and footer links

- Centralized control of app metadata and feature list

- Easily toggle features without hardcoding

- Consistent access to app-wide constants
