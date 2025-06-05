<script setup lang="ts">
const { app } = useAppConfig()
definePageMeta({
  layout: "landing",
  name: 'Home'
});
useHead({
  title: app.meta.title || 'Kickstart Nuxt 🚀',
  meta: [
    {
      name: 'description',
      content: 'Welcome to Nuxt Boilerplate!'
    }
  ]
});

</script>
<template>
  <NBWelcome />
</template>