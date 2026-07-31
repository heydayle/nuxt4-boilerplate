<script setup lang="ts">
import type { Navigation } from "~~/types/nuxtTypes";
defineOptions({ name: 'NBNavigation' })
const { app } = useAppConfig();
const navigation = computed<Navigation[]>(() => app.headers.navigation);

const route = useRoute()
const getRouteBaseName = useRouteBaseName()
const baseName = computed(() => getRouteBaseName(route))
const isActiveRoute = (name?: string) => (name ? baseName.value?.includes(name) ?? false : false)
</script>

<template>
  <div class="w-full flex justify-end mr-6">
    <ul class="flex items-center space-x-4">
      <UNavigationMenu :items="navigation" highlight highlight-color="neutral">
        <template #item="{ item }">
          <NuxtLinkLocale :to="item.name" exact-active-class="router-link-active" :class="{ 'router-link-active': isActiveRoute(item.name) }">
            <span>{{ $t(item.label) }}</span>
          </NuxtLinkLocale>
        </template>
      </UNavigationMenu>
    </ul>
  </div>
</template>