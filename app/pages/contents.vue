<script setup lang="ts">
import type { ContentCollectionItem } from '@nuxt/content';
useHead({
  title: 'Contents',
  meta: [
    {
      name: 'description',
      content: 'Contents page sample for Nuxt Boilerplat'
    }
  ]
})
const links = [
  {
    name: 'index',
    label: 'Home'
  },
  {
    name: 'contents',
    label: 'Contents'
  }
]
const sampleContent = await queryCollection('content').path('/examples/content-sample').first() as ContentCollectionItem
</script>
<template>
    <div>
      <UBreadcrumb :links="links" />
      <article>
        <ContentRenderer :value="sampleContent" />
      </article>
    </div>
</template>