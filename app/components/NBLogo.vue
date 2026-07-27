<script setup lang="ts">
defineOptions({ name: 'NBLogo' })
const { app } = useAppConfig();
const title: string = app.meta?.title ?? 'Nuxt Boilerplate';
const version: string = app.version ?? 'v1.0.0';

withDefaults(defineProps<{
  withTitle?: boolean;
  width?: number;
  height?: number;
}>(), {
  width: 50,
  height: 48,
});
</script>

<template>
  <div>
    <NuxtLinkLocale to="/" class="flex-1 inline-flex space-x-4 items-center">
      <NuxtImg
        src="/images/logo.png"
        alt="Nuxt Boilerplate Logo"
        :width="width"
        :height="height"
      />
      <template v-if="withTitle">
        <span class="text-xl font-bold">{{ title }}</span>
        <span
          class="text-[10px] text-primary px-2 py-1 border border-primary rounded-xl"
          >{{ version }}</span
        >
      </template>
    </NuxtLinkLocale>
  </div>
</template>
