<script setup lang="ts">
import { z } from "zod";
import { CalendarDate } from "@internationalized/date";
import type { BreadcrumbItem, RadioGroupItem, RadioGroupValue } from "@nuxt/ui";
import SplitText from "~/components/ui/text-animation/SplitText/SplitText.vue";

useHead({
  title: "Components",
  meta: [
    {
      name: "description",
      content: "A collection of reusable components for NuxtUI",
    },
  ],
});
const toast = useToast();
const items = [
  {
    name: "messages",
    icon: "i-heroicons-chat-bubble-oval-left",
    count: 3,
  },
  {
    name: "notifications",
    icon: "i-heroicons-bell",
    count: 0,
  },
];
// breadcrumb
const breadcrumbsNuxtUI = ref<BreadcrumbItem[]>([
  {
    label: "Nuxt boilerplate",
    icon: "i-lucide-house",
  },
  {
    label: "Components",
    icon: "i-lucide-box",
    to: "components",
  },
  {
    label: "Nuxt UI",
    icon: "vscode-icons:file-type-nuxt",
    to: "#nuxtui",
  },
]);
const breadcrumbsVueBits = ref<BreadcrumbItem[]>([
  {
    label: "Nuxt boilerplate",
    icon: "i-lucide-house",
  },
  {
    label: "Components",
    icon: "i-lucide-box",
    to: "components",
  },
  {
    label: "VueBits",
    icon: "vscode-icons:file-type-vue",
    to: "#nuxtui",
  },
]);
const selected = ref(true);

// Form
const form = useTemplateRef("form");
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});
const state = reactive({
  name: "Devaloka",
  email: "hungthinh.ckc@gmail.com",
});
const onSubmit = async () => {
  const valid = await form.value?.validate({ silent: true });
  console.log("Form valid:", valid);
  if (!valid) {
    toast.add({
      title: "Form Error",
      description: "Please fill out the form correctly.",
      color: "error",
    });
    return;
  }
  toast.add({ title: valid.name, description: valid.email, color: "success" });
};
const resetForm = () => {
  form.value?.clear();
};
// pin input
const pin = ref([]);

// select menu
const selects = ref(["Backlog", "Todo", "In Progress", "Done"]);
const menuSelected = ref("Backlog");

// radio group
const itemsRadio = ref<RadioGroupItem[]>(["System", "Light", "Dark"]);
const valueRadio = ref<RadioGroupValue>("System");

// calendar
const valueDate = ref<{
  start: CalendarDate | string;
  end: CalendarDate | string;
}>({ start: new CalendarDate(2022, 2, 3), end: new CalendarDate(2022, 2, 20) });

// pagination
const page = ref(1);

// slider
const valueSlider = ref(50);

// color picker
const valueColor = ref("#ffffff");
const chip = computed(() => ({ backgroundColor: valueColor.value }))
</script>
<template>
  <div class="container min-h-[calc(100vh-10rem)] py-4">
  <UBreadcrumb :items="breadcrumbsNuxtUI" />
  <div class="flex flex-wrap gap-4">
    <div class="flex flex-col gap-4">
      <div class="pt-4">
        <div class="flex flex-wrap gap-x-4">
          <UChip
            v-for="{ name, icon, count } in items"
            :key="name"
            :show="count > 0"
          >
            <UButton :icon="icon" />
          </UChip>
          <UChip
            v-for="{ name, icon, count } in items"
            :key="name"
            :show="count > 0"
            variant="soft"
          >
            <UButton :icon="icon" />
          </UChip>
          <UChip
            v-for="{ name, icon, count } in items"
            :key="name"
            :show="count > 0"
            variant="outline"
          >
            <UButton :icon="icon" />
          </UChip>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex gap-2">
          <UCheckbox v-model="selected" label="Check me" />
          <UCheckbox label="Checkbox" default-value="indeterminate" />
        </div>
        <UCheckbox label="Check me!" variant="card" />
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
      <UForm
        ref="form"
        :schema="schema"
        :state="state"
        :validate-on="['blur', 'change', 'input']"
        class="flex flex-col gap-4"
      >
        <UFormField label="Name" name="name">
          <UInput v-model="state.name" label="Name" />
        </UFormField>
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" label="Email" type="email" />
        </UFormField>
        <USelectMenu v-model="menuSelected" :items="selects" />
        <URadioGroup v-model="valueRadio" :items="itemsRadio" />
        <USwitch label="Check me" color="neutral" />
        <div class="flex items-center gap-2">
          <UButton @click="onSubmit">Submit</UButton>
          <UButton type="reset" variant="ghost" @click="resetForm"
            >Reset</UButton
          >
        </div>
      </UForm>
    </div>
    <div class="flex flex-col gap-4">
      <UCalendar v-model="valueDate" range />
    </div>
    <div class="flex flex-col gap-4">
      <UPinInput v-model="pin" :length="6" />
      <UPagination v-model:page="page" active-color="neutral" :total="100" />
      <USlider v-model="valueSlider" color="neutral" />
      <div class="flex gap-2">
        <UPopover>
          <UButton label="Popover" color="neutral" variant="subtle" />
          <template #content>
            <Placeholder class="size-48 m-4 inline-flex" />
          </template>
        </UPopover>
        <UTooltip text="Opened">
          <UButton label="Tooltip" />
        </UTooltip>
        <UModal title="Modal with title">
          <UButton label="Modal" variant="subtle" />
          <template #body>
            <div class="h-48 m-4 p-4">
              <p class="text-center">This is a modal content</p>
            </div>
          </template>
        </UModal>
        <UDrawer
          direction="right"
          title="Drawer with title"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        >
          <UButton
            label="Drawer"
            trailing-icon="i-lucide-chevron-left"
          />

          <template #body>
            <Placeholder class="h-48 m-4" />
          </template>
        </UDrawer>
      </div>
      <UPopover>
        <UButton label="Choose color" variant="outline">
          <template #leading>
            <span :style="chip" class="size-3 rounded-full" />
          </template>
        </UButton>

        <template #content>
          <UColorPicker v-model="valueColor" class="p-2" />
        </template>
      </UPopover>
      <span>More components, check the <ULink class="underline" target="_blank" to="https://ui.nuxt.com">Nuxt UI</ULink> documentation.</span>
    </div>
  </div>
  <div>
   <UBreadcrumb :items="breadcrumbsVueBits" />
   <div class="py-4">
    <SplitText
      text="Animated components!"
      class-name="text-2xl font-semibold text-center"
      :delay="100"
      :duration="0.6"
      ease="power3.out"
      split-type="chars"
      :from="{ opacity: 0, y: 40 }"
      :to="{ opacity: 1, y: 0 }"
      :threshold="0.1"
    />
    <p>Checkout more components in <NuxtLink to="https://vue-bits.dev/text-animations/split-text" target="_blank" class="underline">VueBits</NuxtLink></p>
   </div>
  </div>
  </div>
</template>
