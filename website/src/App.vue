<script setup lang="ts">
import ActionsMenu from './components/ActionsMenu.vue';
import Logo from './components/Logo.vue';
import SearchBar from './components/SearchBar.vue';
import FilesTree from './components/FilesTree.vue';
import DocumentEditor from './components/DocumentEditor.vue';


</script>

<template>
    <div dir="rtl" class="flex ">
        <div class="w-2/12"></div>
        <div class="w-2/12 fixed  bg-gray-100 p-3 py-5 ">
            <div class="w-full  flex flex-col justify-between pb-10 h-full min-h-screen">
                <div class="flex flex-col gap-2">
                    <Logo />
                    <SearchBar />
                    <ActionsMenu />
                    <FilesTree />
                </div>
            </div>
        </div>
        <div class="flex-1  w-10/12">
            <DocumentEditor />
        </div>
    </div>
</template>

<style>
.prose li {
    @apply flex items-center gap-2 flex-wrap w-full
}

.prose li  img {
    @apply m-0 !important
}
</style>

