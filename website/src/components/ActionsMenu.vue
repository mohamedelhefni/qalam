<script setup lang="ts">
import FileAddIcon from "/Fileadd.svg"
// import FolderAddIcon from "/Folderadd.svg"
import SortIcon from "/Sort.svg"
import { useDocumentsStore } from "../store/documents"

let store = useDocumentsStore()


</script>
<template>
    <div class="flex items-center gap-2 my-2">
        <button @click="store.addDocument({ id: Date.now(), name: ' عنصر جديد', children: [] })"
            class="hover:bg-gray-200 p-1 rounded">
            <img class="w-8" :src="FileAddIcon" alt="">
        </button>
        <!-- <button class="hover:bg-gray-200 p-1 rounded">
            <img class="w-8" :src="FolderAddIcon" alt="">
        </button> -->
        <button class="hover:bg-gray-200 p-1 rounded">
            <img class="w-8" :src="SortIcon" alt="">
        </button>
    </div>
</template>