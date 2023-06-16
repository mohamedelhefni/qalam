<script setup lang="ts">
import { PhTrash, PhGear, PhExport } from "@phosphor-icons/vue"
import { useDocumentsStore } from "../store/documents"
const documentStore = useDocumentsStore()

</script>

<template>
    <div class="flex flex-col gap-3">
        <button class="flex items-center justify-between rounded cursor-pointer gap-1  group"
            onclick="importExportModal.showModal()">
            <div class="flex items-center">
                <div class="icon">
                    <PhExport :size="30" class="text-base-500 p-1 mx-1" />
                </div>
                <p class="title flex-1 truncate">
                    <span class=""> استخراج / استيراد</span>
                </p>
            </div>
        </button>

        <button class="flex items-center justify-between rounded cursor-pointer gap-1  group"
            onclick="deleteModal.showModal()">
            <div class="flex items-center">
                <div class="icon">
                    <PhTrash :size="30" class="text-base-500 p-1 mx-1" />
                </div>
                <p class="title flex-1 truncate">
                    <span class="">المهملات</span>
                    <span class="text-muted text-sm px-2">{{ documentStore.deletedDocs.length }}</span>
                </p>
            </div>
        </button>

        <button class="flex items-center justify-between rounded cursor-pointer gap-1  group"
            onclick="settingsModal.showModal()">
            <div class="flex items-center">
                <div class="icon">
                    <PhGear :size="30" class="text-base-500 p-1 mx-1" />
                </div>
                <p class="title flex-1 truncate">
                    <span class="">الاعدادات</span>
                </p>
            </div>
        </button>
    </div>
</template>