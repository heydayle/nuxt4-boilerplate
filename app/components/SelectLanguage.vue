<script setup lang="ts">

interface Locale {
  code: string
  name: string
  flag: string
}
const { locale, locales } = useI18n();
const selected = computed(() =>
  locales.value.find((item) => item.code === locale.value) as Locale
);
const value = ref(selected.value.code)

</script>
<template>
  <USelectMenu
    v-model="value"
    :search-input="false"
    value-key="code"
    :items="locales"
    :icon="selected.flag"
    value-attribute="code"
    variant="outline"
    :ui="{  content: 'w-30' }"
  >
    <template #item="{ item }">
      <SwitchLocalePathLink :locale="item.code">
        <span class="flex items-center gap-2">
          <UIcon :name="item.flag" /> <span>{{ item.name }}</span>
        </span>
      </SwitchLocalePathLink>
    </template>
  </USelectMenu>
</template>