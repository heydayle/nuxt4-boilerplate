<script setup lang="ts">
const { app } = useAppConfig()
definePageMeta({
  layout: "landing",
  name: 'Home'
});
useHead({
  title: app.meta.title || 'Kickstart Nuxt 4 | Nuxt 4 starter 🚀',
  meta: [
    {
      name: 'description',
      content: 'Welcome to Nuxt Boilerplate!'
    }
  ],
  script: [
    {
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4679515909217929',
      crossorigin: 'anonymous',
      async: true,
    }
  ]
});

</script>
<template>
  <NBWelcome />
</template>