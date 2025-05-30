<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>

<template>
  <ClientOnly>
    <USwitch
      checked-icon="i-heroicons-moon-20-solid"
      unchecked-icon="i-heroicons-sun-20-solid"
      size="lg"
      color="neutral"
      :model-value="isDark"
      @click="isDark = !isDark"
    />
  </ClientOnly>
</template>
