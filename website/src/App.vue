<script setup lang="ts">
import DocumentEditor from './components/DocumentEditor.vue';
import DeleteModal from './components/DeleteModal.vue';
import Sidebar from "./components/Sidebar.vue"


</script>

<template>
    <div dir="rtl">
        <DeleteModal />
        <div class="drawer lg:drawer-open">
            <input id="sidebar-drawer" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content flex flex-col items-center justify-center">
                <DocumentEditor />
            </div>
            <Sidebar />
        </div>
    </div>
</template>

<style>
.prose li img {
    @apply m-0 inline-block !important
}
</style>

