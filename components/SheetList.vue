<script lang="ts" setup>
const INFOR_TRANSFER = '\n\n\\#\\# Thông tin chuyển khoản:\n1\\. Techcombank: \n\\-\\-\\> `DEVALOKA`\n\n2\\. Momo: \n\\-\\-\\> *0857676107*'

const props = defineProps<{
    loading: boolean;
    sheetId?: string;
    sheets: any[];
    currentFile?: string;
    currentDataSheet?: any[];
}>()
const emits = defineEmits(['getData'])

const { convertSheetToUserObjects, objectToMessage } = useSheet()

const showRawData = ref<boolean>(false)
const showConvertObjectData = ref<boolean>(false)

const range = reactive({
    title: '',
    start: '',
    end: ''
})

const pushType = ref<string>('')
const msgNotification = ref<string>('')
const isDisabledGetData = computed(() => {
    return !range.title || !range.start || !range.end
})
const isHasData = computed(() => !!props.currentDataSheet?.length)

const objectPlayerList = ref<any[]>([])
const playerCash = ref('')
const convertPlayerToObject = () => {
    props.currentDataSheet && (objectPlayerList.value = convertSheetToUserObjects(props.currentDataSheet))
}
watch(showConvertObjectData, () => {
    convertPlayerToObject()
    if (pushType.value === 'player')
        msgNotification.value = objectToMessage(objectPlayerList.value)
})
watch(pushType, () => {
    setMessage()
})
watch(() => props.currentDataSheet, () => {
    pushType.value === 'fee' && (playerCash.value = (props.currentDataSheet?.[0]?.[1]?.split('.').join(' ')?.split('đ')?.[0].trim() || 0))

    convertPlayerToObject()
    setMessage()
})
const setMessage = () => {
    switch(pushType.value) {
        case 'player': setMessageActived();break
        case 'fee': setMessageTransfer()
    }
}
const setMessageActived = () => {
    msgNotification.value = objectToMessage(objectPlayerList.value)
}
const setMessageTransfer = () => {
    msgNotification.value = `Tiền sân mỗi người là: \n\\-\\-\\> \`${playerCash.value}\` đ` + INFOR_TRANSFER
}

// emits functions
const getData = () => {
    const payload = {
        range
    }
    emits('getData', payload)
}
const getDataPlayer = () => {
    pushType.value = 'player'

    range.start = 'A2'
    range.end = 'E15'
    const payload = {
        range
    }
    emits('getData', payload)
}
const getDataFee = () => {
    pushType.value = 'fee'

    range.start = 'F11'
    range.end = 'G11'
    const payload = {
        range
    }
    emits('getData', payload)
}

// notification functions
const pushNotify = async (message: string) => {
    return await $fetch('/api/telegram-bot', {
        method: 'POST',
        body: {
            message: {
                text: message,
            }
        }
    });
}
const pushNotification = async () => {
    const message = msgNotification.value
    console.log(message);
    if (message) {
        try {
            await pushNotify(message)
        } catch (error) {
            console.error(error);
        }
    }
}
</script>
<template>
    <div v-if="sheets.length">
        <hr class="my-4" />
        <div class="font-bold text-xl">SHEETS OF <{{ currentFile }}>
        </div>
        <div class="flex flex-wrap space-x-2 my-4">
            <div v-for="(item, index) in sheets" :key="index">
                <URadio v-model="range.title" :value="item.properties.title" :label="item.properties.title"
                    class="mb-2" />
            </div>
        </div>
        <div class="flex space-x-2 items-center">
            <span>{{ range.title ? range.title : '<sheet_name>' }}</span>!
            <UInput v-model="range.start" placeholder="A1" />
            <span>:</span>
            <UInput v-model="range.end" placeholder="D4" />
            <UButton :disabled="isDisabledGetData" :loading="loading" @click="getData">Get Data</UButton>
            <UButton :disabled="!range.title" :loading="loading" @click="getDataFee">Total Fee</UButton>
            <UButton :disabled="!range.title" :loading="loading" @click="getDataPlayer">Total Player</UButton>
        </div>

        <div v-if="loading" class="mt-4">
            <span class="inline-block w-4 h-4 rounded bg-green-500 animate-ping" />
        </div>
        <div v-if="isHasData && !loading" class="mt-4">
            Get data success: Sheet <<span class="text-green-500 font-bold">{{ range.title }}</span>>; range: <<span
                    class="text-green-500 font-bold">{{ range.start }}</span>:<span class="text-green-500 font-bold">{{
                        range.end }}</span>>
                    <span class="flex space-x-2 items-center">
                        <UCheckbox v-model="showRawData" :disabled="!currentDataSheet" name="rawData"
                            label="Raw data" />
                        <UCheckbox v-model="showConvertObjectData" :disabled="!currentDataSheet" name="objectData"
                            label="Object data" />
                        <UPopover :popper="{ arrow: true }">
                            <UButton color="white">
                                Push notify to user
                            </UButton>
                            <template #panel>
                                <div class="p-4 flex items-end space-x-2">
                                    <div class="flex flex-col space-y-2">
                                        <URadio v-model="pushType" value="player" label="Actived Player" />
                                        <URadio v-model="pushType" value="fee" label="Fee" />
                                        <UTextarea v-model="msgNotification" :rows="12" />
                                    </div>
                                    <UButton :disabled="!currentDataSheet" icon="mingcute:send-fill"
                                        @click="pushNotification">
                                        Push
                                    </UButton>
                                </div>
                            </template>
                        </UPopover>
                    </span>
        </div>
        <div class="flex">
            <div v-if="showRawData" class="mt-4 text-sm">
                <pre><code lang="json">{{ currentDataSheet }}</code></pre>
            </div>
            <UDivider orientation="vertical" class="px-2" />
            <div v-if="showConvertObjectData && currentDataSheet!" class="mt-4 text-sm">
                <pre><code lang="json">{{ objectPlayerList }}</code></pre>
            </div>

        </div>

    </div>
</template>