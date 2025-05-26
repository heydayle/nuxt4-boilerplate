<script setup lang="ts">
import {configuration} from "~/__mock__/configuration";

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
</script>
<template>
    <div>
      <UBreadcrumb :links="links" />
      <MDC :value="configuration" tag="article" />
    </div>
</template>