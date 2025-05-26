<script setup lang="ts">

useHead({
  title: 'Components',
  meta: [
    {
      name: 'description',
      content: 'A collection of reusable components for NuxtUI'
    }
  ]
})
const items = [{
  name: 'messages',
  icon: 'i-heroicons-chat-bubble-oval-left',
  count: 3
}, {
  name: 'notifications',
  icon: 'i-heroicons-bell',
  count: 0
}]
const selected = ref(false)
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: 'Name',
      default: ''
    },
    email: {
      type: 'string',
      title: 'Email',
      format: 'email',
      default: ''
    }
  },
  required: ['name', 'email']
}
const state = reactive({
  name: '',
  email: ''
})
</script>
<template>
  <div class="container flex flex-col gap-4">
    <div class="pt-8">
      <div class="flex flex-wrap gap-x-4">
        <UChip v-for="{ name, icon, count } in items" :key="name" :show="count > 0">
          <UButton :icon="icon" color="gray" />
        </UChip>
      </div>
    </div>
    <div>
      <UCheckbox v-model="selected" name="notifications" label="Notifications" />
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
      <UForm :schema="schema" :state="state" class="flex flex-col gap-4">
        <UFormGroup label="Name" name="name">
          <UInput v-model="state.name" label="Name" />
        </UFormGroup>
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" label="Email" type="email" />
        </UFormGroup>
        <div class="flex items-center gap-2">
          <UButton type="submit">Submit</UButton>
          <UButton type="reset" variant="ghost">Reset</UButton>
        </div>
      </UForm>
      <UForm :schema="schema" :state="state" class="flex flex-col gap-4">
        <UFormGroup label="Name" name="name">
          <UInput v-model="state.name" label="Name" />
        </UFormGroup>
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" label="Email" type="email" />
        </UFormGroup>
        <div class="flex items-center gap-2">
          <UButton type="submit">Submit</UButton>
          <UButton type="reset" variant="ghost">Reset</UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>