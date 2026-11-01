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
            class="input input-bordered bg-base-100 w-full pr-10" type="text" aria-label="بحث" placeholder="بحث ...">
    </div>
</template>