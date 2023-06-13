<script setup lang="ts">
import { useDocumentsStore } from "../store/documents"
import { PhMagnifyingGlass } from "@phosphor-icons/vue"
import { ref } from "vue"

let store = useDocumentsStore()

let name = ref("")

</script>
<template>
    <div class="flex items-center relative">
        <PhMagnifyingGlass :size="45" class="p-3 absolute" />
        <input @input="store.searchByName(name)" v-model="name"
            class="p-2 w-full rounded bg-base-100 border border-base-200 pr-10" type="text" placeholder="بحث ...">
    </div>
</template>