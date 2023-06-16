<script setup lang="ts">
import DocumentEditor from './components/DocumentEditor.vue';
import DeleteModal from './components/DeleteModal.vue';
import ImportExportModal from './components/ImportExportModal.vue';
import SettingsModal from './components/SettingsModal.vue';
import Sidebar from "./components/Sidebar.vue"
import { useUIStore } from "./store/ui"
const uiStore = useUIStore()


</script>

<template>
    <div dir="rtl" :data-theme="uiStore.theme">
        <ImportExportModal />
        <SettingsModal />
        <DeleteModal />
        <div class="drawer lg:drawer-open">
            <input id="sidebar-drawer" type="checkbox" class="drawer-toggle" />
            <div class="lg:w-[300px]"></div>
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

#app {
    -ms-overflow-style: none;
    /* Internet Explorer 10+ */
    scrollbar-width: none;
    /* Firefox */
}

#app::-webkit-scrollbar {
    display: none;
    /* Safari and Chrome */
}
</style>

