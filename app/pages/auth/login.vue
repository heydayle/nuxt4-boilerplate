<script setup lang="ts">
import { ref, reactive, useTemplateRef } from "vue";
import { useStorage } from "@vueuse/core";
import {
  useTokenClient,
  type AuthCodeFlowSuccessResponse,
  type AuthCodeFlowErrorResponse,
} from "vue3-google-signin";
import { z } from "zod";

definePageMeta({
  layout: "auth",
});
useHead({
  title: "Login",
});

const toast = useToast();
const localePath = useLocalePath();

const access_token = useStorage("access_token", "");
const credentials = useStorage("credentials", "");

const handleOnSuccess = (response: AuthCodeFlowSuccessResponse) => {
  access_token.value = response.access_token;
  credentials.value = JSON.stringify(response);
  navigateTo("/");
};

const handleOnError = (errorResponse: AuthCodeFlowErrorResponse) => {
  console.log("Error: ", errorResponse);
};
const scopes = ["email", "profile"];

const { login: loginByGoogle } = useTokenClient({
  scope: scopes,
  onSuccess: handleOnSuccess,
  onError: handleOnError,
});

const form = useTemplateRef("form");
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

const model = reactive({
  email: "",
  password: "",
});
const remember = ref(true);
const passwordType = ref("password");

const showPassword = () => {
  passwordType.value = passwordType.value === "password" ? "text" : "password";
};
const onSubmit = async () => {
  const valid = (await form.value?.validate({
    silent: true,
  })) as unknown as Promise<typeof schema | boolean>;
  if (!valid) {
    toast.add({
      title: "Login Fail",
      description: `Please try again!`,
      color: "error",
    });
    return;
  }
  toast.add({
    title: "Login Successful",
    description: `Welcome back, ${model.email}!`,
    color: "success",
  });
  navigateTo(localePath("components"));
};
</script>
<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <div
      class="absolute z-[-1] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] filter blur-xl rounded-full bg-white/10"
    />
    <div>
      <div class="flex justify-between items-center px-4">
        <h1 class="py-4">{{ "\<" }} Login {{ "/\>" }}</h1>
        <NBLogo :width="30" :height="28" />
      </div>

      <div
        class="relative z-1 flex flex-col space-y-4 w-[400px] px-4 py-8 rounded-2xl bg-[var(--ui-bg)] shadow-lg ring-1 ring-black/5"
      >
        <UForm
          ref="form"
          :schema="schema"
          :state="model"
          class="flex flex-col space-y-3"
        >
          <UFormField label="Email" name="email">
            <UInput
              v-model="model.email"
              label="Email"
              size="xl"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Password" name="password">
            <UInput
              v-model="model.password"
              label="Password"
              :type="passwordType"
              size="xl"
              class="w-full"
            >
              <template #trailing>
                <UButton variant="ghost" color="primary" @click="showPassword">
                  <UIcon
                    v-if="passwordType === 'password'"
                    name="mdi-eye-off"
                  />
                  <UIcon v-else name="mdi-eye" />
                </UButton>
              </template>
            </UInput>
          </UFormField>
          <div class="flex justify-between space-x-4 pt-2 pl-2">
            <div class="flex items-center space-x-2 mb-2">
              <UCheckbox v-model="remember" label="Remember me" />
            </div>
            <div class="flex items-center space-x-2">
              <UButton variant="ghost">Sign up</UButton>
              <UButton @click="onSubmit">
                Let's go
                <UIcon
                  name="material-symbols:arrow-forward-rounded"
                  size="24"
                  class="transform duration-300 relative left-0 group-hover:left-2"
                />
              </UButton>
            </div>
          </div>
        </UForm>
        <UDivider label="OR" :ui="{ label: 'text-white' }" />
        <div class="flex justify-center space-x-4">
          <UButton
            icon="logos:google-icon"
            variant="outline"
            size="xl"
            @click="loginByGoogle"
          />
        </div>
      </div>
    </div>
  </div>
</template>
