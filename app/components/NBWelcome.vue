<script setup lang="ts">
definePageMeta({
  layout: "default",
});

</script>
<template>
  <div>
    <div class="py-4 min-h-[calc(100vh-10rem)] flex flex-col justify-center items-center">
      <div class="grid grid-cols-5 gap-8 w-full content-center">
        <div class="flex flex-col col-span-3 justify-between items-center">
          <div>
            <h1 class="text-4xl font-bold">
              {{ $t("welcome.title") }}
              <span class="text-green-500 font-black">Nuxt Boilerplate!</span>
            </h1>
            <p>{{ $t("welcome.subTitle") }}</p>
            <p class="my-4">{{ $t("welcome.description") }}</p>
            <NBFeatures />
          </div>
        </div>
        <div class="col-span-1" />
        <div class="flex flex-col justify-between items-center self-center">
          <div
            class="relative h-[200px] w-[200px] flex flex-col justify-center items-center"
          >
            <div
              class="absolute border border-1 border-green-500/50 filter w-[300px] h-[300px] rounded-full transition-all duration-1000 linear animate-radar"
            />
            <div
              class="absolute bg-green-500/50 filter blur-2xl w-[300px] h-[300px] rounded-full"
            />
            <NBLogo class="z-10" :width="150" :height="140" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>