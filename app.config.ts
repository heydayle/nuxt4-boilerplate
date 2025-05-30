export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate',
    },
  },
  app: {
  version: 'v0.0.2-alpha',
  meta: {
    title: 'Nuxt Boilerplate',
    description: 'Nuxt Starter with Vite',
    keywords: 'nuxt, vite, starter',
    image: '/cover.png',
    author: 'Thinh Le',
    publisher: 'Thinh Le',
    canonical: 'https://github.com/heydayle/nuxt-boilerplate-v3'
  },
  socials: [
    {
      name: 'Github',
      icon: 'simple-icons:github',
      href: 'https://github.com/heydayle/nuxt-boilerplate-v3'
    },
  ],
  headers: {
    heading: 'Nuxt Starter',
    logo: "/logo.svg",
    navigation: [
      {
        name: "get-started",
        label: "nav.docs",
        path: "/get-started",
      },
      {
        name: "blank",
        label: "nav.blank",
        path: "/blank",
      },
      {
        name: "components",
        label: "nav.components",
        path: "/components",
      },
      {
        name: "contact",
        label: "nav.contact",
        path: "/contact",
      },
    ]
  },
  features: [
    {
      label: "Nuxt UI",
      icon: "vscode-icons:file-type-nuxt",
    },
    {
      label: "Nuxt Content",
      icon: "vscode-icons:file-type-nuxt",
    },
    {
      label: "Nuxt Image",
      icon: "vscode-icons:file-type-nuxt",
    },
    {
      label: "Nuxt Fonts",
      icon: "vscode-icons:file-type-nuxt",
    },
    {
      label: "Vueuse",
      icon: "logos:vueuse",
    },
    {
      label: "Pinia",
      icon: "logos:pinia",
    },
    {
      label: "Color mode",
      icon: "line-md:moon-filled-loop"
    },
    {
      label: "Next Auth",
      icon: "fluent-color:shield-checkmark-20",
    },
    {
      label: "TailwindCSS",
      icon: "vscode-icons:file-type-tailwind",
    },
    {
      label: "i18n",
      icon: "ic:round-translate",
    },
    {
      label: "Lint",
      icon: "logos:eslint",
    },
  ],
  documents: {
    sidebars: [
      {
        name: 'get-started',
        to: 'get-started',
        icon: 'lineicons:rocket-5',
        label: 'Get started'
      },
      {
        name: 'get-started-installation',
        to: 'get-started-installation',
        icon: 'material-symbols:power-settings-new-outline',
        label: 'Installation',
        children: [
          {
            label: 'Prerequisites',
            to: '#prerequisites'
          },
          {
            label: 'Install and run',
            to: '#steps-to-install-and-run-the-project'
          },
          {
            label: 'Features',
            to: '#included-features'
          },
          {
            label: 'Environment variables',
            to: '#environment-variables'
          },
          {
            label: 'Structure',
            to: '#project-structure'
          },
        ]
      },
      {
        name: 'get-started-configuration',
        to: 'get-started-configuration',
        icon: 'icon-park-outline:config',
        label: 'Configuration',
        children: [
          {
            label: 'Config structure',
            to: '#structure-overview'
          },
          {
            label: 'Nuxt UI config',
            to: '#ui'
          },
          {
            label: 'Nuxt App config',
            to: '#app'
          },
          {
            label: 'Accessing config',
            to: '#accessing-config-in-your-app'
          },
          {
            label: 'Use cases',
            to: '#use-cases'
          },
        ]
      }
    ]
  },
  contacts: [
    {
      name: '/heydayle',
      icon: 'simple-icons:github',
      href: 'https://github.com/heydayle'
    },
    {
      name: '/thinhle99',
      icon: 'simple-icons:linkedin',
      href: 'https://linkedin.com/in/thinhle99'
    },
    {
      name: 'hungthinh.ckc@gmail.com',
      icon: 'simple-icons:mailboxdotorg',
      href: 'mailto:hungthinh.ckc@gmail.com'
    },
  ]
}
})
