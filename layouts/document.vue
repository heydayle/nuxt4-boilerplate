<script setup lang="ts">
const { app } = useAppConfig()
const sidebar = app.documents.sidebars
</script>

<template>
<div>
  <LayoutsHeader />
  <div class="container m-auto">
    <div class="grid grid-cols-12 p-4">
      <LayoutsSidebar class="col-span-2" :sidebar-items="sidebar" />
      <div class="col-span-8 max-h-[calc(100vh-11rem)] overflow-y-auto px-4">
        <NuxtPage />
      </div>
      <div id="navition-id" class="col-span-2"></div>
    </div>
  </div>
  <LayoutsFooter />
</div>
</template>

<style scoped>

</style>