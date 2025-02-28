<script setup lang="ts">
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const selected = computed(() =>
  locales.value.find((item: any) => item.code === locale.value)
);
</script>
<template>
  <USelectMenu
    v-model="selected"
    :options="locales"
    valueAttribute="code"
    variant="outline"
    :popper="{ placement: 'left-end' }"
    :uiMenu="{ base: 'w-40' }"
  >
    <template #option="{ option: option }">
      <SwitchLocalePathLink :locale="option.code">
        <UButton
          class="w-36"
          color="primary"
          :icon="option.flag"
          :variant="selected.code === option.code ? 'solid' : 'ghost'"
          :disabled="selected.code === option.code"
        >
          {{ option.name }}
        </UButton>
      </SwitchLocalePathLink>
    </template>
    <UButton variant="ghost">
      <UIcon :name="selected.flag" size="40" />
    </UButton>
  </USelectMenu>
</template>