<script setup lang="ts">
const { app } = useAppConfig()
const sidebar = app.documents.sidebars

const route = useRoute()
const localePath = useLocalePath()

const itemsChildren = computed(() => {
    return sidebar.reduce((acc, item) => {
        if (route.path === localePath(item.to) && item.children && item.children.length > 0) {
            acc.push(...item.children)
        }
        return acc
    }, [] as Navigation[])
})
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
      <div class="col-span-2">
        <a v-for="(item, index) in itemsChildren" :key="index" :href="item.to"  class="text-gray-600 hover:text-primary px-4 py-2 text-sm font-bold block" :class="{ 'hash-active': route.hash === item.to }">
            <div class="sidebar-item">
                <span>{{ item.label }}</span>
            </div>
        </a>
      </div>
    </div>
  </div>
  <LayoutsFooter />
</div>
</template>

<style scoped>

</style>