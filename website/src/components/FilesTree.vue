<script setup lang="ts">
import NestedDraggable from "./NestedDraggable.vue";
import { useDocumentsStore } from "../store/documents"
const store = useDocumentsStore()


</script>
<template>
    <div class="flex flex-col">
        <NestedDraggable :children="store.docs" />
    </div>
</template>


<style >
.dragArea {
    min-height: 5px;
    /* outline: 1px dashed; */
}
</style>