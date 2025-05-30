<script setup lang="ts">

import { ref, reactive } from 'vue';
import { useStorage } from '@vueuse/core';
import {
    useTokenClient,
    type AuthCodeFlowSuccessResponse,
    type AuthCodeFlowErrorResponse,
} from "vue3-google-signin";
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

definePageMeta({
    layout: 'auth',
});
useHead({
  title: 'Login'
})

const access_token = useStorage('access_token')
const credentials = useStorage('credentials')

const handleOnSuccess = (response: AuthCodeFlowSuccessResponse) => {
    access_token.value = response.access_token
    credentials.value = JSON.stringify(response)
    navigateTo('/')
};

const handleOnError = (errorResponse: AuthCodeFlowErrorResponse) => {
    console.log("Error: ", errorResponse);
};
const scopes = ['email', 'profile',]

const { login: loginByGoogle } = useTokenClient({
    scope: scopes,
    onSuccess: handleOnSuccess,
    onError: handleOnError,
});

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})
type Schema = z.output<typeof schema>

const model = reactive({
    email: '',
    password: '',
});
const remember = ref(true)
const passwordType = ref('password');

const showPassword = () => {
    passwordType.value = passwordType.value === 'password' ? 'text' : 'password';
};
const onSubmit = (event: FormSubmitEvent<Schema>) => {
     console.log(event.data)
}
</script>
<template>
    <div class="flex flex-col justify-center items-center h-screen">
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] filter blur-xl rounded-full bg-primary-50/10" />
        <div>
            <div class="flex justify-between items-center px-4">
                <h1 class="py-4 text-gray-50">{{ '\<' }} Login {{ '/\>' }}</h1>
                <ULink as="nuxt-link" to="/" class="text-gray-50 hover:text-primary-500 transition-colors">
                    <UIcon name="mdi-home" size="24" />
                </ULink>
            </div>
            
            <div class="relative z-1 flex flex-col space-y-4 w-[400px] px-4 py-8 rounded-2xl bg-neutral-800 shadow-lg ring-1 ring-black/5">
                <UForm :schema="schema" :state="model" class="flex flex-col space-y-3 text-white">
                    <UFormGroup label="Email" name="email">
                        <UInput v-model="model.email" label="Email" size="xl" color="primary" :ui="{ rounded: 'rounded-xl' }" />
                    </UFormGroup>
                    <UFormGroup label="Password" name="password">
                        <UInput v-model="model.password" label="Password" :type="passwordType" size="xl" color="primary" :ui="{ rounded: 'rounded-xl', icon: { trailing: { pointer: '' } } }">
                            <template #trailing>
                                <UButton variant="ghost" color="primary" :ui="{ rounded: 'rounded-full' }" @click="showPassword">
                                    <UIcon v-if="passwordType === 'password'" name="mdi-eye-off" />
                                    <UIcon v-else name="mdi-eye" />
                                </UButton>
                            </template>
                        </UInput>
                    </UFormGroup>
                    <div class="flex justify-between space-x-4 pt-2 pl-2">
                        <div class="flex items-center space-x-2">
                            <UCheckbox v-model="remember" />
                            <label class="text-white text-sm">Remember me</label>
                        </div>
                        <div class="flex items-center space-x-2">
                        <UButton variant="ghost">Sign up</UButton>
                            <UButton type="submit" @click="onSubmit">Sign in</UButton>
                        </div>
                    </div>
                </UForm>
                <UDivider label="OR" :ui="{ label: 'text-white' }"/>
                <div class="flex justify-center space-x-4">
                    <UButton variant="outline" @click="loginByGoogle">Google</UButton>
                </div>
            </div>
        </div>
    </div>
</template>