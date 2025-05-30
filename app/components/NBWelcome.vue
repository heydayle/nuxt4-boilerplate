<script setup lang="ts">
definePageMeta({
  layout: "default",
});
const { app } = useAppConfig();
const localPath = useLocalePath();

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
            <!-- <UButton
              class="mt-2"
              variant="outline"
              :to="localPath('get-started')"
              icon="material-symbols:arrow-outward"
              >{{ $t("welcome.getStarted") }}
            </UButton> -->
            <p class="my-4">{{ $t("welcome.description") }}</p>
            <NBFeatures />
          </div>
        </div>
        <div class="flex flex-col justify-between items-center self-center">
          <div
            class="relative h-[200px] w-[200px] flex flex-col justify-center items-center transform -skew-y-12 -skew-x-6"
          >
            <div
              class="absolute bg-green-500/30 filter blur-2xl w-[300px] h-[300px] rounded-full animate animate-pulse"
            />
            <div class="">
              <img
                src="/images/logo.png"
                alt="logo"
                class="animate animate-slow-spining scale-120"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
