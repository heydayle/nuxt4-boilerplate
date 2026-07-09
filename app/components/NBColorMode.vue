<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (val: boolean) => {
    colorMode.preference = val ? 'dark' : 'light'
  }
})
</script>

<template>
  <ClientOnly>
    <USwitch
      v-model="isDark"
      checked-icon="i-heroicons-moon-20-solid"
      unchecked-icon="i-heroicons-sun-20-solid"
      size="lg"
      color="neutral"
    />
  </ClientOnly>
</template>
