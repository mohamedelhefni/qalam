<script setup lang="ts">
import Settings from "/Settings.svg"
import Trash from "/Trash.svg"
import { useDocumentsStore } from "../store/documents"
const documentStore = useDocumentsStore()


</script>
<template>
    <div class="flex flex-col gap-3">
        <div class="flex items-center   justify-between rounded cursor-pointer gap-1  group"
            onclick="deleteModal.showModal()">
            <div class="flex items-center w-5/6">
                <div class="icon">
                    <img class="w-10 p-1 fill-blue-500" :src="Trash">
                </div>
                <p class="title flex-1 truncate">
                    <span class="">المهملات</span>
                    <span class="text-muted text-sm px-2">{{ documentStore.deletedDocs.length }}</span>
                </p>
            </div>
        </div>

        <div class="flex items-center   justify-between rounded cursor-pointer gap-1  group"
            onclick="settingsModal.showModal()">
            <div class="flex items-center w-5/6">
                <div class="icon">
                    <img class="w-10 p-1 fill-blue-500" :src="Settings">
                </div>
                <p class="title flex-1 truncate">
                    <span class="">الاعدادات</span>
                </p>
            </div>
        </div>

    </div>
</template>