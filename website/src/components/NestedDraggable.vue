<script setup lang="ts">
//@ts-nocheck
import { ref } from "vue";
import draggable from "vuedraggable";
import NestedItem from "./NestedItem.vue";
const props = defineProps({ children: Array<any>, group: Object })
const activeElements = ref([])

function addElement(element: any) {
    let elementIdx = activeElements.value.indexOf(element.id)
    if (elementIdx > -1) {
        activeElements.value.splice(elementIdx, 1)
        element.isActive = false
        element.isOpen = false
        return
    }

    element.isOpen = true
    element.isActive = true
    activeElements.value.push(element.id)
}

function isActive(element) {
    let elementIdx = activeElements.value.indexOf(element.id)
    return elementIdx > -1
}

</script>


<template>
    <draggable class="dragArea list-none" tag="ul" :list="props.children" :group="{ name: 'g1' }" item-key="name"   :scroll-sensitivity="250" >
        <template #item="{ element }" >
            <li class="mx-4"  @click.stop="addElement(element)">
                <NestedItem v-if="element" :item="element" />
                <NestedDraggable v-if="element && (element?.isFolder) && (isActive(element) || element?.isOpen)"
                    :list="element.children" :children="element.children" :group="element" />
            </li>
        </template>
    </draggable>
</template>

<style scoped></style>