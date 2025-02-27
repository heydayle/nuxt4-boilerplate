<script lang="ts" setup>
const props = defineProps<{
    files: any[];
}>()
const emits = defineEmits(['getSheet'])

const getSheet = (file: any) => {
    emits('getSheet', file)
}
</script>
<template>
    <div class="px-4 flex flex-wrap space-x-2 my-4">
        <div v-for="(item, index) in files" :key="index">
            <UButton color="white" class="mb-2" @click="getSheet(item)">{{ item.name }}.xlxs</UButton>
        </div>
    </div>
</template>