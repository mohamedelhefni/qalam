<script setup lang="ts">
import NestedDraggable from "./NestedDraggable.vue";
import { useDocumentsStore } from "../store/documents"
const store = useDocumentsStore()


</script>
<template>
    <div class="flex flex-col">
        <NestedDraggable v-if="store.searchName && store.searchDocs.length > 0" :children="store.searchDocs" />
        <NestedDraggable v-else :children="store.docs" />
    </div>
</template>


<style >
.dragArea {
    min-height: 5px;
    /* outline: 1px dashed; */
}
</style>