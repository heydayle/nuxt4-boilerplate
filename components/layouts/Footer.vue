<template>
    <footer class="footer w-full sticky bottom-0 left-0">
        <div class="container">
            <span>&copy; {{ currentYear }} Devaloka. All rights reserved.</span>
        </div>
    </footer>
</template>

<script setup lang="ts">

const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
    padding: 1rem 0;
    text-align: center;
}
.container {
    max-width: 1200px;
    margin: 0 auto;
}
</style>