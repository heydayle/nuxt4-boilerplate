<script setup lang="ts">
const config = useAppConfig()
const contacts = computed(() => config.app.contacts)
</script>

<template>
  <div class="container"> 
    <div class="">
      <ul class="flex space-x-4 justify-center items-center mt-4">
        <li v-for="(item, index) in contacts" :key="index">
          <ULink as="a" :to="item.href" class="inline-flex items-center space-x-1 hover:text-primary-500">
            <UIcon :name="item.icon" />
            <span>{{ item.name }}</span>
          </ULink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>