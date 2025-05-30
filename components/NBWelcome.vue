<script setup lang="ts">
import LogoImg from "~/public/images/logo.png";

definePageMeta({
  layout: "default",
});
const { app } = useAppConfig();
const localPath = useLocalePath();
const FEATURES = app.features;

const count = ref(0);
let intervalId: number | null = null

function startCounting() {
  let index = 0
  const values = FEATURES.map((_, i) => i + 1);

  const startFast = () => {
    intervalId = window.setInterval(() => {
      count.value = values[index++]
      if (index === Math.round(values.length/2)) {
        clearInterval(intervalId!)
        startMedium()
      }
    }, 200 + (index * 50))
  }

  const startMedium = () => {
    intervalId = window.setInterval(() => {
      count.value = values[index++]
      if (index === (values.length - 1)) {
        clearInterval(intervalId!)
        startSlow()
      }
    }, 500 + (index * 50));
  }

  const startSlow = () => {
    setTimeout(() => {
      count.value = values[index++]
    }, 800)
  }

  startFast()
}
onMounted(() => {
  startCounting()
})

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
            <UButton
              class="mt-2"
              variant="outline"
              :to="localPath('get-started')"
              icon="material-symbols:arrow-outward"
              >{{ $t("welcome.getStarted") }}
            </UButton>
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
                :src="LogoImg"
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
