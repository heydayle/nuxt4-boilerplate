export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'cool'
  },
  app: {
    meta: {
      title: 'Nuxt Starter',
      description: 'Nuxt Starter with Vite',
      keywords: 'nuxt, vite, starter'
    },
    socials: [
      {
        name: 'Github',
        icon: 'simple-icons:github',
        href: 'https://github.com/heydayle'
      },
    ],
    headers: {
      heading: 'Nuxt Starter',
      logo: "/logo.svg",
      navigation: [
        {
          name: "docs",
          label: "nav.docs",
          path: "/docs",
        },
        {
          name: "about",
          label: "nav.about",
          path: "/about",
        },
        {
          name: "contact",
          label: "nav.contact",
          path: "/contact",
        }
      ]
    },
    features: [
      {
        label: "Next Auth",
        icon: "fluent-color:shield-checkmark-20",
      },
      {
        label: "Pinia",
        icon: "logos:pinia",
      },
      {
        label: "NuxtUI",
        icon: "vscode-icons:file-type-nuxt",
      },
      {
        label: "TailwindCSS",
        icon: "vscode-icons:file-type-tailwind",
      },
      {
        label: "Axios",
        icon: "simple-icons:axios",
      },
      {
        label: "i18n",
        icon: "ic:round-translate",
      },
      {
        label: "Lint",
        icon: "logos:eslint",
      },
      {
        label: "Vueuse",
        icon: "logos:vueuse",
      },
      {
        label: "Routing",
        icon: "devicon-plain:reactrouter",
      },
    ]
  }
})
