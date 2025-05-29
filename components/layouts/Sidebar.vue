<script setup lang="ts">
import type { Navigation } from '~/types/nuxtTypes';

const props = defineProps<{
    sidebarItems: Navigation[]
}>()

const localePath = useLocalePath()
const route = useRoute()

const convertChildrenLink = (children: Navigation[], parentName: string) => {
    return children.map(child => {
        return {
            ...child,
            id: child.to,
            to: localePath(parentName) + child.to
        }
    })
}
const items = computed(() => {
    return props.sidebarItems.map(item => ({
        ...item,
        to: localePath(item.name),
        children: item.children ? convertChildrenLink(item.children, item.name) : []
    }))
})
const itemsChildren = computed(() => {
    return items.value.reduce((acc, item) => {
        if (route.path === item.to && item.children && item.children.length > 0) {
            acc.push(...item.children)
        }
        return acc
    }, [] as Navigation[])
})
</script>

<template>
    <div class="w-full flex space-x-4 pr-4">
        <!-- <div class="flex-1 flex flex-col justify-start">
            <NuxtLinkLocale v-for="(item, index) in sidebarItems" :key="index" :to="item.name">
                <div class="sidebar-item text-xs py-3 px-2 inline-flex items-center space-x-2 border-l border-l-gray-700/30 hover:border-l-gray-500">
                    <UIcon :name="item.icon" size="18" />
                    <span>{{ item.label }}</span>
                </div>
            </NuxtLinkLocale>
        </div> -->
        <UNavigationMenu class="flex-1" orientation="vertical" :items="items">
            <!-- <template #item="{ item, index }">
                <NuxtLinkLocale :to="item.name" :key="index">
                    <div class="sidebar-item text-xs py-3 px-2 inline-flex items-center space-x-2 border-l border-l-gray-700/30 hover:border-l-gray-500">
                        <UIcon :name="item.icon" size="18" />
                        <span>{{ item.label }}</span>
                    </div>
                </NuxtLinkLocale>
            </template> -->
        </UNavigationMenu>
        <Teleport to="#navition-id">
            <NuxtLink v-for="(item, index) in itemsChildren" :key="index" :to="item.to" :active="false">
                <div class="sidebar-item text-xs py-3 px-2 inline-flex items-center space-x-2 border-l border-l-gray-700/30 hover:border-l-gray-500">
                    <span>{{ item.label }}</span>
                </div>
            </NuxtLink>
        </Teleport>
        <UDivider orientation="vertical" />
    </div>
</template>