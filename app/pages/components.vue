<script setup lang="ts">
import { z } from 'zod'
import { CalendarDate } from '@internationalized/date'
import type { FormSubmitEvent } from '#ui/types'
import type { BreadcrumbItem, RadioGroupItem, RadioGroupValue  } from '@nuxt/ui'

useHead({
  title: 'Components',
  meta: [
    {
      name: 'description',
      content: 'A collection of reusable components for NuxtUI'
    }
  ]
})
const toast = useToast()
const items = [{
  name: 'messages',
  icon: 'i-heroicons-chat-bubble-oval-left',
  count: 3
}, {
  name: 'notifications',
  icon: 'i-heroicons-bell',
  count: 0
}]
// breadcrumb
const breadcrumbs = ref<BreadcrumbItem[]>([
  {
    label: 'Nuxt boilerplate',
    icon: 'i-lucide-house'
  },
  {
    label: 'Components',
    icon: 'i-lucide-box',
    to: 'components'
  }
])
const selected = ref(true)

// Form
const form = useTemplateRef('form')
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address')
})
type Schema = z.output<typeof schema>
const state = reactive({
  name: 'Devaloka',
  email: 'hungthinh.ckc@gmail.com'
})
const onSubmit = async () => {
  const valid = await form.value?.validate({ silent: true })
  console.log('Form valid:', valid)
  if (!valid) {
    toast.add({ title: 'Form Error', description: 'Please fill out the form correctly.', color: 'error' })
    return
  }
  toast.add({ title: valid.name, description: valid.email, color: 'success' })
}
const resetForm = () => {
  form.value?.clear()
}
// pin input
const pin = ref([])

// select menu
const selects = ref(['Backlog', 'Todo', 'In Progress', 'Done'])
const menuSelected = ref('Backlog')

// radio group
const itemsRadio = ref<RadioGroupItem[]>(['System', 'Light', 'Dark'])
const valueRadio = ref<RadioGroupValue>('System')

// calendar
const valueDate = ref({ start: new CalendarDate(2022, 2, 3), end: new CalendarDate(2022, 2, 20) })
</script>
<template>
  <div class="container flex flex-wrap gap-4 min-h-[calc(100vh-10rem)] py-4">
  <div class="flex flex-col gap-4">
    <UBreadcrumb :items="breadcrumbs" />
    <div class="pt-4">
      <div class="flex flex-wrap gap-x-4">
        <UChip v-for="{ name, icon, count } in items" :key="name" :show="count > 0">
          <UButton :icon="icon" />
        </UChip>
      </div>
    </div>
    <div>
      <UCheckbox v-model="selected" label="Notifications" />
    </div>
    <div class="flex gap-2">
      <UButton>Button</UButton>
      <UButton variant="soft">Button</UButton>
      <UButton variant="outline">Button</UButton>
      <UButton variant="ghost">Button</UButton>
    </div>
    <div class="flex gap-2">
      <UButton icon="gridicons:bookmark-outline">Bookmark</UButton>
      <UButton icon="gridicons:bell" variant="soft">Notification</UButton>
      <UButton icon="gridicons:star" variant="outline">Rating</UButton>
      <UButton icon="gridicons:link" variant="ghost">Link</UButton>
    </div>
  </div>
    
    <div class="flex gap-2 text-white">
      <UForm ref="form" :schema="schema" :state="state" :validate-on="['blur', 'change', 'input']" class="flex flex-col gap-4">
        <UFormField label="Name" name="name">
          <UInput v-model="state.name" label="Name" />
        </UFormField>
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" label="Email" type="email" />
        </UFormField>
        <div class="flex items-center gap-2">
          <UButton @click="onSubmit">Submit</UButton>
          <UButton type="reset" variant="ghost" @click="resetForm">Reset</UButton>
        </div>
      </UForm>
    </div>
    <div class="flex flex-col gap-4 py-6">
      <UPinInput v-model="pin" :length="6"/>
      <USelectMenu v-model="menuSelected" :items="selects" />
      <URadioGroup v-model="valueRadio" :items="itemsRadio" />
      <UCalendar range v-model="valueDate" />
    </div>
  </div>
</template>