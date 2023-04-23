<script setup lang="ts">
import FolderIcon from "/Folder.svg"
import FileIcon from "/File.svg"
import TrashIcon from "/Trash.svg"
import FolderOpenIcon from "/FolderOpen.svg"
import { useDocumentsStore } from "../store/documents"
import { ref } from "vue"

let props = defineProps({ item: Object })
let { item } = props
let store = useDocumentsStore()
let isEdit = ref(false)
let editText = ref(item?.name)

function deleteDoc(doc: any) {
    store.deleteDocument(doc)
}

function doneEdit(item: any) {
    isEdit.value = false
    item.name = editText.value
}



</script>
<template>
    <div class="flex items-center  justify-between rounded cursor-pointer gap-1 hover:bg-gray-200 group"
        :class="{ 'bg-gray-200': store.activeDoc?.id === item?.id }"
        @click="item?.children.length === 0 && store.setActiveDoc(item)" @dblclick="isEdit = true">
        <div class="flex items-center w-full ">
            <div class="icon">
                <img class="w-10 p-1" v-if="item?.children.length > 0 && !item?.isActive" :src="FolderIcon" alt="">
                <img class="w-10 p-1" v-else-if="(item?.children.length > 0 && item?.isOpen)" :src="FolderOpenIcon" alt="">
                <img class="w-10 p-1" v-else :src="FileIcon" alt="">
            </div>
            <input v-if="isEdit" class="w-full bg-transparent" @blur="doneEdit(item)" @keyup.enter="doneEdit(item)"
                v-model="editText" type="text">
            <div v-else class="title flex-1  ">
                {{ item?.name }}
            </div>
        </div>
        <div class=" hidden group-hover:block">
            <img @click="deleteDoc(item)" class="w-8 p-1 " :src="TrashIcon" />
        </div>
    </div>
</template>