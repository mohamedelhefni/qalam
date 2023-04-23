<script setup lang="ts">
import { ref } from 'vue';
import ActionsMenu from './components/ActionsMenu.vue';
import Logo from './components/Logo.vue';
import SearchBar from './components/SearchBar.vue';
import FilesTree from './components/FilesTree.vue';


</script>

<template>
    <div dir="rtl" class="flex ">
        <div class="w-[288px]">
            <div class="w-full flex flex-col gap-2 min-h-screen bg-gray-100 p-3 py-7 ">
                <Logo />
                <SearchBar />
                <ActionsMenu />
                <FilesTree />
            </div>
        </div>
        <div class="flex-1">main conent</div>
    </div>
</template>

