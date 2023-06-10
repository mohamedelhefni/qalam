<script setup lang="ts">
import FolderIcon from "/Folder.svg"
import FileIcon from "/File.svg"
import TrashRedIcon from "/TrashRed.svg"
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
    <div v-if="!item?.isDeleted" class="flex items-center   justify-between rounded cursor-pointer gap-1  group"
        :class="{ 'bg-base-100': store.activeDoc?.id === item?.id }"
        @click="item?.children.length === 0 && !item?.isFolder && store.setActiveDoc(item)" @dblclick="isEdit = true">
        <div class="flex items-center w-5/6">
            <div class="icon">
                <img class="w-10 p-1" v-if="item?.isFolder && !item?.isActive" :src="FolderIcon" alt="">
                <img class="w-10 p-1" v-else-if="(item?.isFolder && item?.isOpen)" :src="FolderOpenIcon" alt="">
                <img class="w-10 p-1" v-else :src="FileIcon" alt="">
            </div>
            <input v-if="isEdit" class="w-full bg-transparent" @blur="doneEdit(item)" @keyup.enter="doneEdit(item)"
                v-model="editText" type="text">
            <p v-else class="title flex-1 truncate">
                {{ item?.name }}
            </p>
        </div>
        <div class=" hidden group-hover:block w-1/6 ">
            <img @click.stop="deleteDoc(item)" class="w-8 p-1 " :src="TrashRedIcon" />
        </div>
    </div>
</template>