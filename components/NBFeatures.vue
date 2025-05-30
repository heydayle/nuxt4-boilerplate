<script setup lang="ts">
const { app } = useAppConfig()
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
    }, 400 + (index * 50));
  }

  const startSlow = () => {
    setTimeout(() => {
      count.value = values[index++]
    }, 600)
  }

  startFast()
}
onMounted(() => {
  startCounting()
})
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
            :class="{ 'bg-gradient-to-br from-green-700 via-green-500 to-cyan-200': count > index }"
        />
        <div class="relative z-10 flex flex-col justify-center items-center  rounded-lg w-full h-full bg-black/20">
            <UIcon :name="item.icon" size="32" />
            <div class="font-semibold">{{ item.label }}</div>
        </div>
        </div>
    </div>
</template>