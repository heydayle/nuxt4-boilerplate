<script setup lang="ts">

import { ref, reactive } from 'vue';
import { useStorage } from '@vueuse/core';
import { useFetch } from '@vueuse/core';
import {
    useTokenClient,
    type AuthCodeFlowSuccessResponse,
    type AuthCodeFlowErrorResponse,
} from "vue3-google-signin";

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
const scpopes = <string[]>['email', 'profile',]

const { isReady, login: loginByGoogle } = useTokenClient({
    scope: scpopes,
    onSuccess: handleOnSuccess,
    onError: handleOnError,
});

const model = reactive({
    email: '',
    password: '',
});
const passwordType = ref('password');

const showPassword = () => {
    passwordType.value = passwordType.value === 'password' ? 'text' : 'password';
};
</script>
<template>
    <div class="flex flex-col justify-center items-center h-screen">
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] filter blur-xl rounded-full bg-primary-50/10" />
        <div>
            <h1 class="py-4 text-white">{{ '\<' }} Login {{ '/\>' }}</h1>
            <div class="relative z-1 flex flex-col space-y-4 w-[400px] px-4 py-8 bg-primary-100 rounded-2xl">
                <UForm class="flex flex-col space-y-3 text-white">
                    <UInput v-model="email" label="Email" size="xl" color="primary" :ui="{ rounded: 'rounded-xl' }" />
                    <UInput v-model="password" label="Password" :type="passwordType" size="xl" color="primary" :ui="{ rounded: 'rounded-xl', icon: { trailing: { pointer: '' } } }">
                        <template #trailing>
                            <UButton variant="ghost" @click="showPassword" color="primary" :ui="{ rounded: 'rounded-full' }">
                                <UIcon v-if="passwordType === 'password'" name="mdi-eye-off" />
                                <UIcon v-else name="mdi-eye" />
                            </UButton>
                        </template>
                    </UInput>
                    <div class="flex justify-between space-x-4 pt-2 pl-2">
                        <div class="flex items-center space-x-2">
                            <UCheckbox v-model="remember" />
                            <label class="text-black text-sm">Remember me</label>
                        </div>
                        <div class="flex items-center space-x-2">
                        <UButton variant="ghost" @click="signIn">Sign up</UButton>
                            <UButton UButton  @click="signIn">Sign in</UButton> 
                        </div>
                    </div>
                </UForm>
                <UDivider label="OR" :ui="{ label: 'text-black' }"/>
                <div class="flex justify-center space-x-4">
                    <UButton variant="outline" @click="loginByGoogle">Google</UButton>
                </div>
            </div>
        </div>
    </div>
</template>