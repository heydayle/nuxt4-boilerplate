<script setup lang="ts">
import type { LocaleObject } from '@nuxtjs/i18n'
defineOptions({ name: 'SelectLanguage' })

const { locale, locales } = useI18n();

const selected = computed(() =>
  (locales.value as LocaleObject[]).find((item) => item.code === locale.value)
);
const value = ref(selected.value?.code);
</script>
<template>
  <USelectMenu
    v-model="value"
    :search-input="false"
    value-key="code"
    :items="locales"
    :icon="selected?.flag ?? ''"
    value-attribute="code"
    variant="outline"
    :ui="{ content: 'w-30' }"
  >
    <template #item="{ item }">
      <SwitchLocalePathLink :locale="item.code">
        <span class="flex items-center gap-2">
        <UIcon :name="(item as LocaleObject).flag" /> <span>{{ item.name }}</span>
        </span>
      </SwitchLocalePathLink>
    </template>
  </USelectMenu>
</template>
