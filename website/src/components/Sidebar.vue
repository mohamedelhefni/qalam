<script setup lang="ts">
import Logo from './Logo.vue';
import SearchBar from './SearchBar.vue';
import ActionsMenu from './ActionsMenu.vue';
import FilesTree from './FilesTree.vue';
import SettingsMenu from './SettingsMenu.vue';
</script>


<template>
    <div class="fixed z-40 w-64 h-screen transition-transform translate-x-full sm:-translate-x-0   bg-gray-100 p-3 py-5 ">
        <div class="w-full  flex flex-col justify-between pb-10 h-full min-h-screen">
            <div class="flex flex-col gap-2">
                <Logo />
                <SearchBar />
                <ActionsMenu />
                <FilesTree />
            </div>
            <div class="settings flex flex-col gap-2">
                <SettingsMenu />
            </div>
        </div>
    </div>
</template>