<script setup lang="ts">
const { app } = useAppConfig()
const github = app.socials[0]
</script>
<template>
  <div class="ring-1 ring-black/5">
    <div class="container py-4 flex justify-between items-center">
      <NBLogo with-title class="flex-1" />
      <div>
        <NBNavigation />
      </div>
      <div class="flex flex-1 justify-end items-center space-x-2">
        <div>
          <iframe src="https://github.com/sponsors/heydayle/button" title="Sponsor heydayle" height="32" width="114" style="border: 0; border-radius: 6px;"></iframe>
        </div>
        <UButton :to="github.href" variant="ghost" color="neutral" class="text-xl">
          <UIcon :name="github.icon" size="22" class="text-xl"/>
        </UButton> 
        <NBColorMode />
        <SelectLanguage />
      </div>
    </div>
  </div>
</template>