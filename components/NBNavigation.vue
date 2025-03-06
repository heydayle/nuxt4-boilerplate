<script setup lang="ts">
const { app } = useAppConfig()
const navigation = app.headers.navigation;
</script>

<template>
  <div>
    <div class="w-full flex justify-end mr-6">
      <ul class="flex items-center space-x-4">
        <NuxtLinkLocale v-for="(item, index) in navigation" :key="index" :to="item.name">
          <span>{{ $t(item.label) }}</span>
        </NuxtLinkLocale >
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>