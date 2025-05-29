<script setup lang="ts">
import type { Navigation } from "~/types/nuxtTypes";

const props = defineProps<{
  sidebarItems: Navigation[];
}>();

const localePath = useLocalePath();
const items = computed(() => {
  return props.sidebarItems.map((item) => ({
    ...item,
    to: localePath(item.name),
    children: [],
  }));
});
</script>

<template>
  <div class="w-full flex space-x-4 pr-4">
    <UNavigationMenu
      class="flex-1 !text-lg"
      orientation="vertical"
      :items="items"
      :ui="{ linkLabel: 'text-lg' }"
    />
    <UDivider orientation="vertical" />
  </div>
</template>
