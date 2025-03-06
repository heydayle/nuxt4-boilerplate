<script setup lang="ts">
import NBWelcome from "~/components/NBWelcome.vue";

definePageMeta({
  layout: "landing",
  name: 'Home'
});
useHead({
  title: 'Kickstart Nuxt 🚀',
  meta: [
    {
      name: 'description',
      content: 'Welcome to NuxtKit!'
    }
  ]
});

</script>
<template>
  <NBWelcome />
</template>