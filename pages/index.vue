<script setup lang="ts">
import Welcome from "~/components/Welcome.vue";

definePageMeta({
  layout: "default",
  name: 'Home'
});

useHead({
  title: 'Kickstart Nuxt!!!'
})
</script>
<template>
  <Welcome />
</template>