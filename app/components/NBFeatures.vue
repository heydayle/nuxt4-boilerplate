<script setup lang="ts">
import { NuxtLinkLocale } from "#components";

type Props = {
  extend?: {
    label: string;
    to: string;
  };
};

withDefaults(defineProps<Props>(), {
  extend: () => ({ label: "Explore", to: "components" }),
});
const { app } = useAppConfig();
const FEATURES = app.features;

const count = ref(0);
let intervalId: number | null = null;

function startCounting() {
  let index = 0;
  const values = FEATURES.map((_, i) => i + 1);

  const startFast = () => {
    intervalId = window.setInterval(() => {
      count.value = values[index++] as number;
      if (index === Math.round(values.length / 2)) {
        clearInterval(intervalId!);
        startMedium();
      }
    }, 200 + index * 50);
  };

  const startMedium = () => {
    intervalId = window.setInterval(() => {
      count.value = values[index++] as number;
      if (index === values.length - 1) {
        clearInterval(intervalId!);
        startSlow();
      }
    }, 250 + index * 20);
  };

  const startSlow = () => {
    setTimeout(() => {
      count.value = values[index] as number;
    }, 350);
  };

  startFast();
}
onMounted(() => {
  startCounting();
});
</script>

<template>
  <div class="grid grid-cols-4 gap-4 mt-6 content-center align-center">
    <div
      v-for="(item, index) in FEATURES"
      :key="index"
      class="group relative flex flex-col justify-center items-center shadow-lg ring-1 ring-black/5 h-[100px] rounded-2xl transition duration-600 cursor-pointer hover:shadow-gray-100/10 hover:shadow-2xl"
    >
      <div
        class="absolute w-full h-full blur rounded-lg transition duration-500 animate-tilt"
        :class="{
          'bg-gradient-to-br from-green-700 via-green-500 to-cyan-200':
            count > index,
        }"
      />
      <div
        class="relative z-10 flex flex-col justify-center items-center rounded-lg w-full h-full bg-white/50 dark:bg-black/20"
      >
        <UIcon :name="item.icon" size="32" />
        <div class="font-semibold transition-all" :class="count > index ? 'text-white' : 'text-black'">{{ item.label }}</div>
      </div>
    </div>
    <NuxtLinkLocale v-if="extend" :to="extend.to">
      <div
        class="group relative flex flex-col justify-center items-center shadow-lg ring-1 ring-black/5 hover:ring-green-300 h-[100px] rounded-lg transition duration-600 cursor-pointer hover:shadow-gray-100/10 hover:shadow-2xl"
      >
        <div
          class="relative z-10 flex justify-center items-center rounded-lg w-full h-full bg-white/50 dark:bg-black/20 group-hover:text-green-300"
        >
          <div class="text-sm font-semibold">{{ extend.label }}</div>
          <UIcon
            name="material-symbols:arrow-forward-rounded"
            size="24"
            class="transform duration-300 relative left-0 group-hover:left-2"
          />
        </div>
      </div>
    </NuxtLinkLocale>
  </div>
</template>
