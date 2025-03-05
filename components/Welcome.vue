<script setup lang="ts">
definePageMeta({
  layout: "default",
});
const FEATURES = [
  {
    label: "Next Auth",
    icon: "fluent-color:shield-checkmark-20",
  },
  {
    label: "Pinia",
    icon: "logos:pinia",
  },
  {
    label: "NuxtUI",
    icon: "vscode-icons:file-type-nuxt",
  },
  {
    label: "TailwindCSS",
    icon: "vscode-icons:file-type-tailwind",
  },
  {
    label: "Axios",
    icon: "simple-icons:axios",
  },
  {
    label: "i18n",
    icon: "ic:round-translate",
  },
  {
    label: "Lint",
    icon: "logos:eslint",
  },
  {
    label: "Vueuse",
    icon: "logos:vueuse",
  },
  {
    label: "Routing",
    icon: "devicon-plain:reactrouter",
  },
];
</script>
<template>
  <div class="p-4 h-screen flex flex-col justify-center items-center">
    <div class="grid grid-cols-[1fr,40%] gap-8 w-full content-center">
      <div class="flex flex-col justify-between items-center">
        <div class="w-[60%]">
          <h1 class="text-4xl font-bold">Welcome to the <span class="text-green-500 font-black">Nuxt Boilerplate!</span></h1>
          <p>
            Kickstart Your Nuxt Project – Preconfigured, Optimized, Ready to
            Code!
          </p>
          <UButton class="mt-2">Get started</UButton>
          <p class="my-4">
            Ready-to-use framework for Nuxt projects, pre-configured framework
            with essential libraries and tools, streamlining development and
            ensuring a clean, structured codebase. 🚀
          </p>
          <div class="grid grid-cols-4 gap-4 mt-6 content-center align-center">
            <div
                v-for="(item, index) in FEATURES"
                :key="index"
                class="flex flex-col justify-center items-center bg-white-50/5 h-[100px] rounded-2xl transition duration-600 opacity-50 cursor-pointer hover:opacity-100 hover:shadow-white-100/10 hover:shadow-2xl"
            >
              <UIcon :name="item.icon" size="32" />
              <div>{{ item.label }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-between items-center self-center">
        <div
            class="relative h-[200px] w-[200px] flex flex-col justify-center items-center"
        >
          <div
              class="absolute bg-green-500/30 filter blur-2xl w-[300px] h-[300px] rounded-full animate animate-pulse"
          />
          <UIcon
              name="simple-icons:nuxt"
              class="relative z-1 text-[180px] text-white"
          />
        </div>
      </div>
    </div>
  </div>
</template>