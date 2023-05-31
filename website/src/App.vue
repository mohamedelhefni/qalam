<script setup lang="ts">
import DocumentEditor from './components/DocumentEditor.vue';
import Sidebar from "./components/Sidebar.vue"

</script>

<template>
    <div dir="rtl" class="flex ">
        <div class="hidden md:block w-64 "></div>
        <Sidebar />

        <div class="flex-1  w-10/12">
            <DocumentEditor />
        </div>
    </div>
</template>

<style>
.prose li img {
    @apply m-0 inline-block !important
}
</style>

