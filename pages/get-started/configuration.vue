<script setup lang="ts">
import {configuration} from "~/__mock__/configuration";
import {highlightBashInMarkdown} from "~/composables/useShiki";

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
const shikiConvert = ref('')
onMounted(async () => {
  shikiConvert.value = await highlightBashInMarkdown(configuration)
})
</script>
<template>
    <div>
      <UBreadcrumb :links="links" />
      <MDC :value="configuration" tag="article" />
    </div>
</template>