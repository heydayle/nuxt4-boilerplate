<script setup lang="ts">
import type { LocaleObject } from '@nuxtjs/i18n'
defineOptions({ name: 'SelectLanguage' })

const { locale, locales } = useI18n()

type LocaleCode = 'en' | 'vi'

// Separate ref for USelectMenu v-model compatibility (locale from i18n has narrow union type)
const selectedLocale = ref<LocaleCode>(locale.value as LocaleCode)
watch(selectedLocale, (val) => {
  locale.value = val
})

const getItemFlag = (item: LocaleObject): string => item.flag ?? ''
const selectedFlag = computed(() => {
  const selected = (locales.value as LocaleObject[]).find(
    (item) => item.code === selectedLocale.value
  )
  return selected?.flag ?? ''
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
