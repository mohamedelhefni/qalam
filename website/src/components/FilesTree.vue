<script setup lang="ts">
import NestedDraggable from "./NestedDraggable.vue";

const props = defineProps({
    data: Array<any>
})


</script>
<template>
    <div class="flex flex-col">
        <NestedDraggable :children="props.data" />
    </div>
</template>


