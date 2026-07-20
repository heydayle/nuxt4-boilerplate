<script setup lang="ts">
import type { Navigation } from "~~/types/nuxtTypes";
defineOptions({ name: 'LayoutsSidebar' })

const props = defineProps<{
  sidebarItems: Navigation[];
}>();

const localePath = useLocalePath();
const items = computed(() => {
  return props.sidebarItems.map((item) => ({
    ...item,
    to: item.name ? localePath(item.name) : item.to,
    children: [],
  }));
});
</script>

<template>
  <div class="w-full flex space-x-4 pr-4">
    <UNavigationMenu
      class="flex-1"
      orientation="vertical"
      :items="items"
      :ui="{ linkLabel: 'text-md' }"
    />
    <UDivider orientation="vertical" />
  </div>
</template>
