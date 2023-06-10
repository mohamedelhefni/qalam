<script setup lang="ts">
import Logo from './Logo.vue';
import SearchBar from './SearchBar.vue';
import ActionsMenu from './ActionsMenu.vue';
import FilesTree from './FilesTree.vue';
import SettingsMenu from './SettingsMenu.vue';



</script>


<template>
    <div class="drawer-side h-screen ">
        <label for="sidebar-drawer" class="drawer-overlay"></label>
        <div class="fixed w-[300px]">
            <div class="w-full flex flex-col justify-between pb-10 h-full min-h-screen  bg-base-200 p-3 py-5">
                <div class="flex flex-col gap-2 bg-base-200 w-full ">
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
    </div>
</template>