<script setup lang="ts">
import { useDocumentsStore } from "../store/documents"
import { marked } from 'marked'
import { computed, onUpdated, ref } from "vue";
const store = useDocumentsStore()
const output = computed(() => marked(store.activeDoc?.content || ""))
const input = ref()

onUpdated(() => {
    input.value?.focus()
})

const update = (e: any) => {
    store.activeDoc.content = e.target.value
}

</script>

<template>
    <div class="grid grid-cols-2">
        <div class="markdown  border-l py-5 pl-5  pr-10">
            <h2 class="text-2xl font-bold">
                {{ store.activeDoc?.name }}
            </h2>
            <textarea autofocus name="markdown" ref="input"
                class="no-scrollbar w-full h-full min-h-screen leading-8 text-lg outline-none "
                :value="store.activeDoc?.content" @input="update"></textarea>
        </div>
        <div class="preview py-5 pr-10 prose" v-html="output">
        </div>
    </div>
</template>
<style>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}
</style>