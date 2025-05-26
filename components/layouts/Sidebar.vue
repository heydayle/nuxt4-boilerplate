<script setup lang="ts">
import type { Navigation } from '~/types/nuxtTypes';

defineProps<{
    sidebarItems: Navigation[]
}>()
</script>

<template>
    <div class="w-full flex space-x-4 pr-4">
        <div class="flex-1 flex flex-col justify-start">
            <NuxtLinkLocale v-for="(item, index) in sidebarItems" :key="index" :to="item.name">
                <div class="sidebar-item text-xs py-3 px-2 inline-flex items-center space-x-2 border-l border-l-gray-700/30 hover:border-l-gray-500">
                    <UIcon :name="item.icon" size="18" />
                    <span>{{ item.label }}</span>
                </div>
            </NuxtLinkLocale>
        </div>
        <UDivider orientation="vertical" />
    </div>
</template>