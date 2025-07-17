<script setup lang="ts">
import { NuxtLinkLocale } from "#components";
import NBGetStartedButton from "./NBGetStartedButton.vue";
import SplitText from "./ui/text-animation/SplitText/SplitText.vue";

type Props = {
  extend?: {
    label: string;
    to: string;
  };
};

withDefaults(defineProps<Props>(), {
  extend: () => ({ label: "Get Started", to: "get-started" }),
});
const { app } = useAppConfig();
const FEATURES = app.features;

</script>

<template>
  <div class="grid grid-cols-4 gap-4 mt-6 content-center align-center">
    <div
      v-for="(item, index) in FEATURES"
      :key="index"
      class="group relative flex flex-col justify-center items-center shadow-lg ring-1 ring-black/5 h-[100px] rounded-2xl transition duration-600 cursor-pointer shadow-gray-100/10 shadow-2xl"
    >
      <div
        class="relative z-10 flex flex-col justify-center items-center transition duration-500 rounded-lg w-full h-full bg-white/50 dark:bg-black/20"
      >
        <UIcon :name="item.icon" size="32" class="transition duration-500"/>
        <SplitText
          :text="item.label"
          class-name="font-semibold text-center"
          :delay="100"
          :duration="0.8"
          ease="power3.out"
          split-type="chars"
          :from="{ opacity: 0, y: 40 }"
          :to="{ opacity: 1, y: 0 }"
          :threshold="0.1"
        />
      </div>
    </div>
    <NuxtLinkLocale v-if="extend" :to="extend.to">
      <NBGetStartedButton class="scale-[0.7] mt-6" />
      <!-- <div
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
      </div> -->
    </NuxtLinkLocale>
  </div>
</template>
