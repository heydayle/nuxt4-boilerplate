<script setup lang="ts">
definePageMeta({
  layout: 'document'
})
useHead({
  title: 'Documents'
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
</script>

<template>
  <div>
      <UBreadcrumb :links="links" />
  </div>
</template>

<style scoped>

</style>