<script setup lang="ts">
definePageMeta({
  layout: "default",
});

</script>
<template>
  <div>
    <div class="p-4 h-screen flex flex-col justify-center items-center">
      <div class="grid grid-cols-3 gap-8 w-full content-center">
        <div class="flex flex-col col-span-2 justify-between items-center">
          <div class="w-[60%]">
            <h1 class="text-4xl font-bold">
              {{ $t("welcome.title") }}
              <span class="text-green-500 font-black">Nuxt Boilerplate!</span>
            </h1>
            <p>{{ $t("welcome.subTitle") }}</p>
            <p class="my-4">{{ $t("welcome.description") }}</p>
            <NBFeatures />
          </div>
        </div>
        <div class="flex flex-col justify-between items-center self-center">
          <div
            class="relative h-[200px] w-[200px] flex flex-col justify-center items-center"
          >
            <div
              class="absolute bg-green-500/50 filter blur-2xl w-[300px] h-[300px] rounded-full transition-all animate animate-[ping_2s_ease_infinite]"
            />
            <div
              class="absolute bg-green-500/50 filter blur-2xl w-[300px] h-[300px] rounded-full"
            />
            <NBLogo class="z-10" :width="150" :height="140" />
          </div>
        </div>
      </div>
      <div class="fixed top-10 right-10">
        <NBColorMode />
      </div>
    </div>
  </div>
</template>
