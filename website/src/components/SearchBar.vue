<script setup lang="ts">
import SearchIcon from "/Search.svg"
import { useDocumentsStore } from "../store/documents"
import { ref } from "vue"

let store = useDocumentsStore()

let name = ref("")

</script>
<template>
    <div class="flex items-center relative">
        <img class="absolute p-3 w-12" :src="SearchIcon" alt="">
        <input @input="store.searchByName(name)" v-model="name"
            class="p-2 w-full rounded bg-base-100 border border-base-200 pr-10" type="text" placeholder="بحث ...">
    </div>
</template>