<script setup lang="ts">
import { PhFolder, PhFileText, PhFolderOpen, PhTrash, PhFileCloud } from "@phosphor-icons/vue"

import { useDocumentsStore } from "../store/documents"
import { ref } from "vue"

let props = defineProps({ item: Object })
let { item } = props
let store = useDocumentsStore()
let isEdit = ref(false)
let editText = ref(item?.name)

function deleteDoc(doc: any) {
    store.deleteDocument(doc)
    if (store.docs.length > 0) {
        store.setActiveDoc(store.docs[0])
    }
}

function doneEdit(item: any) {
    isEdit.value = false
    item.name = editText.value
}



</script>
<template>
    <button class="w-full flex items-center justify-between  rounded cursor-pointer gap-2  group "
        :class="{ 'bg-base-100': store.activeDoc?.name === item?.name }"
        @click="!item?.isFolder && store.setActiveDoc(item)" @dblclick="isEdit = true">
        <div class="flex items-center ">
            <div class="icon">
                <PhFolder :size="32" v-if="item?.isFolder && !item?.isActive" class="text-base-800 p-1" weight="fill" />
                <PhFolderOpen :size="32" v-else-if="(item?.isFolder && item?.isOpen)" class="text-base-800 p-1"
                    weight="fill" />

                <PhFileCloud :size="32"  class="text-base-800  p-1"  v-else-if="item?.published_id" />
                <PhFileText :size="32" v-else class="text-base-800  p-1"  />
            </div>
            <input v-if="isEdit" class="w-full bg-transparent" @blur="doneEdit(item)" @keyup.enter="doneEdit(item)"
                v-model="editText" type="text">
            <p v-else class="title flex-1 truncate">
                {{ item?.name }}
            </p>
        </div>
        <div class=" hidden group-hover:block w-1/6 ">
            <PhTrash @click.stop="deleteDoc(item)" :size="28" class="text-red-500 p-1" />
        </div>
    </button>
</template>