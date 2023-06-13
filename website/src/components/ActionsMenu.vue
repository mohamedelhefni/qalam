<script setup lang="ts">
import { useDocumentsStore } from "../store/documents"
import { PhFilePlus, PhFolderPlus, PhSortAscending } from "@phosphor-icons/vue"
let store = useDocumentsStore()


</script>
<template>
    <div class="flex items-center gap-2 my-2">
        <button @click="store.addDocument({ id: Date.now(), name: ' عنصر جديد', isFolder: false, children: [] })"
            class="hover:bg-base-100 p-1 rounded">
            <PhFilePlus :size="29" class="text-base-800" weight="fill" />
        </button>
        <button
            @click="store.addDocument({ id: Date.now(), name: ' مجلد جديد', isFolder: true, isOpen: false, children: [] })"
            class="hover:bg-base-100 p-1 rounded">
            <PhFolderPlus :size="29" class="text-base-800" weight="fill" />
        </button>
        <button class="hover:bg-base-100 p-1 rounded">
            <PhSortAscending :size="29" class="text-base-800" weight="fill" />
        </button>
    </div>
</template>