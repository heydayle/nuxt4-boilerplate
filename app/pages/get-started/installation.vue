<script setup lang="ts">
definePageMeta({
  layout: 'document'
})
useHead({
  title: 'Installation',
  meta: [
    {
      name: 'description',
      content: 'Installation guide for Nuxt Boilerplate v3'
    }
  ]
})
const links = [
  {
    name: 'get-started',
    label: 'Docs'
  },
  {
    name: 'get-started-installation',
    label: 'Installation'
  }
]
const installation = await queryCollection('content').path('/get-started/installation').first()
</script>
<template>
    <div class="h-full">
      <UBreadcrumb :links="links" />
      <article>
        <ContentRenderer :value="installation" />
      </article>
    </div>
</template>