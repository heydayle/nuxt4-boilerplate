<script setup lang="ts">
import type { LocaleObject } from '@nuxtjs/i18n'
defineOptions({ name: 'SelectLanguage' })

const { locale, locales } = useI18n();

const selected = computed(() =>
  (locales.value as LocaleObject[]).find((item) => item.code === locale.value)
);

// Sync local value when locale changes programmatically (not just via user interaction)
const value = ref<string | undefined>(selected.value?.code);
watch(locale, (newLocale) => {
  value.value = newLocale;
});
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
