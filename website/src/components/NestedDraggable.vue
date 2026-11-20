<script setup lang="ts">
//@ts-nocheck
import draggable from "vuedraggable";
import NestedItem from "./NestedItem.vue";
import { useDocumentsStore } from "../store/documents";
const props = defineProps({ children: Array<any>, group: Object })
const store = useDocumentsStore()
</script>


<template>
    <draggable class="dragArea list-none" tag="ul" :list="props.children" :group="{ name: 'g1' }" item-key="id" :disabled="!!store.searchName" :scroll-sensitivity="250" :delay="200" :delay-on-touch-only="true" :touch-start-threshold="5">
        <template #item="{ element }" >
            <li class="mx-4"  @click.stop="element.isFolder && (element.isOpen = !element.isOpen)">
                <NestedItem v-if="element" :item="element" />
                <NestedDraggable v-if="element?.isFolder && element.isOpen"
                    :list="element.children" :children="element.children" :group="element" />
            </li>
        </template>
    </draggable>
</template>

<style scoped></style>