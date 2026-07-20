<script setup lang="ts">
defineOptions({ name: 'NBNavigation' })
const { app } = useAppConfig();
const navigation = app.headers.navigation;

const route = useRoute()
const getRouteBaseName = useRouteBaseName()
const baseName = computed(() => getRouteBaseName(route))
const isActiveRoute = (name: string) => baseName.value?.includes(name) ?? false
</script>

<template>
  <div>
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
  </div>
</template>