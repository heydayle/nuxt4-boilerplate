<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

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
const selected = ref(true)

// Form
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address')
})
type Schema = z.output<typeof schema>
const state = reactive({
  name: 'Devaloka',
  email: 'hungthinh.ckc@gmail.com'
})
const onSubmit = (event: FormSubmitEvent<Schema>) => {
  toast.add({ title: event.data.name, description: event.data.email })
}
</script>
<template>
  <div class="container flex flex-col gap-4 min-h-[calc(100vh-10rem)]">
    <div class="pt-8">
      <div class="flex flex-wrap gap-x-4">
        <UChip v-for="{ name, icon, count } in items" :key="name" :show="count > 0">
          <UButton :icon="icon" color="primary" />
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
    <div class="w-full flex gap-2 text-white">
      <UForm :schema="schema" :state="state" class="flex flex-col gap-4" @submit="onSubmit">
        <UFormField label="Name" name="name">
          <UInput v-model="state.name" label="Name" />
        </UFormField>
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" label="Email" type="email" />
        </UFormField>
        <div class="flex items-center gap-2">
          <UButton type="submit">Submit</UButton>
          <UButton type="reset" variant="ghost">Reset</UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>