<script setup lang="ts">
import { onMounted } from 'vue';
import DocumentEditor from './components/DocumentEditor.vue';
import DeleteModal from './components/DeleteModal.vue';
import ImportExportModal from './components/ImportExportModal.vue';
import SettingsModal from './components/SettingsModal.vue';
import Sidebar from "./components/Sidebar.vue"
import SingleNote from "./components/SingleNote.vue"
import { useUIStore } from "./store/ui"
import { useDocumentsStore } from './store/documents';
const uiStore = useUIStore()
const docsStore = useDocumentsStore()
docsStore.Init()

let isNote = window.location.href.split("/").pop() !== ''
console.log("is note", isNote)

onMounted(() => {
    document.body.setAttribute('data-theme', uiStore.theme)
})

</script>

<template>
    <div dir="rtl" :data-theme="uiStore.theme">
        <template v-if="isNote">
            <SingleNote />
        </template>
        <template v-else>
            <ImportExportModal />
            <SettingsModal />
            <DeleteModal />
            <div class="drawer lg:drawer-open">
                <input id="sidebar-drawer" @click="uiStore.toggleSidebar()" type="checkbox" class="drawer-toggle" />
                <div class="lg:w-[300px]"></div>
                <div class="drawer-content flex flex-col items-center justify-center">
                    <DocumentEditor />
                </div>
                <Sidebar />
            </div>

        </template>

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

