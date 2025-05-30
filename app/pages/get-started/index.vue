<script setup lang="ts">
definePageMeta({
  layout: "document",
});
useHead({
  title: "Documents",
  meta: [
    {
      name: "description",
      content: "Documentation for Nuxt Boilerplate v3",
    },
  ],
});

const links = [
  {
    name: "get-started",
    label: "Docs",
  },
  {
    name: "",
    label: "Get started",
  },
];

const introduce = await queryCollection("content")
  .path("/get-started/introduction")
  .first();
</script>

<template>
  <div class="h-full">
    <UBreadcrumb :links="links" />
    <article>
      <ContentRenderer :value="introduce" />
    </article>
    <NBFeatures :extend="{
        label: 'Installation',
        to: 'get-started-installation'
      }"
      class="pb-2"
    />
  </div>
</template>

<style scoped></style>
