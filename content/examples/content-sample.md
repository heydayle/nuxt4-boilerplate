# This is a content!

---

## Usage

In `.vue` file:

```vue
<script setup lang="ts">
  import type { ContentCollectionItem } from '@nuxt/content';

  const sampleContent = await queryCollection('content').path('/examples/sample').first() as ContentCollectionItem
</script>

<template>
    <article>
      <ContentRenderer :value="sampleContent" />
    </article>
</template>
```

## Structure

```bash
 ├── content/                     # collection name
      └── examples/               
                └── sample.md     # your content (can use .yaml | .json | .csv)
```

- Checkout for more in [NuxtContent Documents](https://content.nuxt.com/)
