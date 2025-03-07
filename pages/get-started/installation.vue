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
</script>
<template>
    <div>
      <UBreadcrumb :links="links" />
    </div>
</template>