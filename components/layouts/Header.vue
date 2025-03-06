<script setup lang="ts">
import NBLogo from "~/components/NBLogo.vue";
</script>
<template>
    <div class="w-full py-4 flex justify-end items-center">
      <NBLogo />
      <div class="w-full flex justify-end items-center space-x-6">
        <NBNavigation />
        <SelectLanguage />
      </div>
    </div>
</template>