<script setup lang="ts">
import { PhTrash, PhGear } from "@phosphor-icons/vue"
import { useDocumentsStore } from "../store/documents"
const documentStore = useDocumentsStore()

</script>

<template>
    <div class="flex flex-col gap-3">
        <div class="flex items-center   justify-between rounded cursor-pointer gap-1  group"
            onclick="deleteModal.showModal()">
            <div class="flex items-center w-5/6">
                <div class="icon">
                    <PhTrash :size="30" class="text-base-500 p-1 mx-1" />
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
                    <PhGear :size="30" class="text-base-500 p-1 mx-1" />
                </div>
                <p class="title flex-1 truncate">
                    <span class="">الاعدادات</span>
                </p>
            </div>
        </div>
    </div>
</template>