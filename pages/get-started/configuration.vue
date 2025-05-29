<script setup lang="ts">
definePageMeta({
  layout: 'document'
})
useHead({
  title: 'Configuration',
  meta: [
    {
      name: 'description',
      content: 'Configuration for Nuxt Boilerplate v3'
    }
  ]
})
const links = [
  {
    name: 'get-started',
    label: 'Docs'
  },
  {
    name: 'get-started-configuration',
    label: 'Configuration'
  }
]
const configuration = await queryCollection('content').path('/get-started/configuration').first()
</script>
<template>
    <div>
      <UBreadcrumb :links="links" />
      <article>
        <ContentRenderer :value="configuration" />
      </article>
    </div>
</template>