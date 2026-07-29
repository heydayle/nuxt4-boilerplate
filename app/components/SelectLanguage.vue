<script setup lang="ts">
import type { LocaleObject } from '@nuxtjs/i18n'
defineOptions({ name: 'SelectLanguage' })

const { locale, locales } = useI18n()

type LocaleCode = 'en' | 'vi'

/**
 * Computed get/set bridges USelectMenu v-model with the i18n locale.
 * Separate writable ref is needed because `locale` from useI18n() has a
 * narrow union type that doesn't accept arbitrary LocaleCode writes.
 */
const selectedLocale = computed({
  get: () => locale.value as LocaleCode,
  set: (val: LocaleCode) => { locale.value = val },
})

const getItemFlag = (item: LocaleObject): string => String(item.flag ?? '')
const selectedFlag = computed(() => {
  const selected = (locales.value as LocaleObject[]).find(
    (item) => item.code === selectedLocale.value
  )
  return String(selected?.flag ?? '')
})
</script>
<template>
  <USelectMenu
    v-model="selectedLocale"
    :search-input="false"
    value-key="code"
    :items="locales"
    :icon="selectedFlag"
    value-attribute="code"
    variant="outline"
    :ui="{ content: 'w-30' }"
  >
    <template #item="{ item }">
      <SwitchLocalePathLink :locale="item.code">
        <span class="flex items-center gap-2">
        <UIcon :name="getItemFlag(item)" /> <span>{{ item.name }}</span>
        </span>
      </SwitchLocalePathLink>
    </template>
  </USelectMenu>
</template>
