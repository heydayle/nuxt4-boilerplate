<script setup lang="ts">
import { introduce } from '~/__mock__/introduction'
definePageMeta({
  layout: 'document'
})
useHead({
  title: 'Documents',
  meta: [
    {
      name: 'description',
      content: 'Documentation for Nuxt Boilerplate v3'
    }
  ]
})

const links = [
  {
    name: 'get-started',
    label: 'Docs'
  },
  {
    name: '',
    label: 'Get started'
  }
]
const INTRODUCE = introduce
</script>

<template>
  <div class="h-full">
      <UBreadcrumb :links="links" />
      <MDC :value="INTRODUCE" tag="article" />
      <NBFeatures />
      <UButton variant="outline" to="get-started-installation" class="mt-4">
        Intallation
        <UIcon name="material-symbols:arrow-forward-rounded" />
      </UButton>
  </div>
</template>

<style scoped>

</style>