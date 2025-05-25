<script setup lang="ts">
import {configuration} from "~/__mock__/configuration";

definePageMeta({
  layout: 'document'
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