# Installation Guide for nuxt-boilerplate-v3
This boilerplate is a modern Nuxt 3 starter configured with useful development tools and best practices.

# 📦 Prerequisites

Make sure you have the following installed:

- Node.js (version 18 or above recommended)

- pnpm (preferred), or npm/yarn

To install pnpm globally if not already:

```bash
npm install -g pnpm
```

# 🚀 Steps to Install and Run the Project
Clone the repository:
```bash
git clone https://github.com/heydayle/nuxt-boilerplate-v3.git
cd nuxt-boilerplate-v3
```

Install dependencies:
```bash Copy Edit
pnpm install
```

Alternatively, use npm install or yarn depending on your preference.
Start the development server:

```bash
pnpm dev
By default, the app will be running at:
👉 http://localhost:3000
```

⚙️ Build for Production
To generate a production build:

``` bash
pnpm build
```

To preview the production build locally:
``` bash
pnpm preview
```
📁 Project Structure Highlights
/components – Vue components

/layouts – Application layouts

/pages – File-based routing

/plugins – Nuxt plugins

/composables – Vue composables

/assets – Static assets like CSS, fonts, images

/app.config.ts – App-wide config overrides

/nuxt.config.ts – Main configuration file

🛠 Included Features
Nuxt 3

TypeScript

ESLint + Prettier

TailwindCSS

Auto imports for components and composables

Runtime config via .env

📄 Environment Variables
Duplicate `example.env` file in the root and rename to `.env` of your project to configure runtime variables:

env
Copy
Edit
NUXT_PUBLIC_API_BASE=https://api.example.com
🧼 Linting & Formatting
To lint the code:

bash
Copy
Edit
pnpm lint
To fix linting issues automatically:

bash
Copy
Edit
pnpm lint:fix
Let me know if you'd like a version of this as a Markdown file (README.md) or if you want deployment instructions too.

## # Project Structure

```
nuxt-boilerplate-v3/
├── assets/            # Static assets (images, fonts, etc.)
├── components/        # Reusable Vue components
├── composables/       # Vue composables
├── layouts/           # Page layouts
├── middleware/        # Nuxt middleware
├── pages/             # Application pages
├── plugins/           # Nuxt plugins
├── public/            # Public static files
├── server/            # Server API endpoints and middleware
├── stores/            # Pinia stores
├── utils/             # Utility functions
├── .env.example       # Environment variables template
├── nuxt.config.ts     # Nuxt configuration
├── tailwind.config.js # TailwindCSS configuration
└── tsconfig.json      # TypeScript configuration
```