
# Installation
This boilerplate is a modern Nuxt 3 starter configured with useful development tools and best practices.

## 📦 Prerequisites

Make sure you have the following installed:

- `Node.js` (version 18 or above recommended)

- `pnpm` (preferred), or npm/yarn

To install `pnpm` globally if not already:

```bash
npm install -g pnpm
```

## 🚀 Steps to Install and Run the Project
Clone the repository:
```bash
git clone https://github.com/heydayle/nuxt-boilerplate-v3.git
cd nuxt-boilerplate-v3
```

Install dependencies:
```bash
pnpm install

```

Alternatively, use `npm install` or `yarn` depending on your preference.
Start the development server:

```bash
pnpm dev
By default, the app will be running at:
👉 http://localhost:3000


// if the error of nuxt-content please run this
pnpm approve-builds 
```

## ⚙️ Build for Production
To generate a production build:

``` bash
pnpm build
```


To preview the production build locally:
``` bash
pnpm preview
```

## 🛠 Included Features
- Nuxt 3 *(ready for v4)*

- TypeScript

- ESLint + Prettier

- Vueuse

- Next Auth

- Pinia

- NuxtUI v3

- TailwindCSS v4

- Auto imports for components and composables

- Runtime config via `.env` and `app.config.ts`

## 📄 Environment Variables

- Duplicate `example.env` file in the root and rename to `.env` of your project to configure runtime variables:

```bash
# Your secret key
GG_CLIENT_ID        =
GG_CLIENT_SECRET    =
GG_API_KEY          =
```

## 📁 Project Structure

``` bash
nuxt-boilerplate-v3/
    ├── app/
    │    ├── assets/            # Static assets (images, fonts, etc.)
    │    ├── components/        # Reusable Vue components
    │    ├── composables/       # Vue composables
    │    ├── layouts/           # Page layouts
    │    ├── middleware/        # Nuxt middleware
    │    ├── pages/             # Application pages
    │    │      └── index.vue   # Homepage
    │    ├── plugins/           # Nuxt plugins
    │    ├── utils/             # Utility functions
    │    ├── app.config.ts      # App configuration
    │    └── app.vue            # App root
    ├── i18n/                   # i18n 
    │    └── locales/           # Language json
    ├── public/                 # Public static files
    ├── server/                 # Server API endpoints and middleware
    ├── stores/                 # Pinia stores
    ├── .env                    # Environment variables
    ├── content.config.ts       # Nuxt Content configuration
    ├── nuxt.config.ts          # Nuxt configuration
    ├── README.md               
    └── tsconfig.json           # TypeScript configuration
```
