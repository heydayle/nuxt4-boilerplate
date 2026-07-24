<script setup lang="ts">
defineOptions({ name: 'NBFeatures' })

interface Feature {
  label: string;
  icon: string;
}

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
const features = computed<Feature[]>(() => app.features ?? []);

</script>

<template>
  <div class="grid grid-cols-4 gap-4 mt-6 content-center align-center">
    <div
      v-for="(item, index) in features"
      :key="index"
      v-memo="[item.label, item.icon]"
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
    </NuxtLinkLocale>
  </div>
</template>
