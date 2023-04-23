<script setup lang="ts">
import FolderIcon from "/Folder.svg"
import FileIcon from "/File.svg"
import FolderOpenIcon from "/FolderOpen.svg"

let props = defineProps({ item: Object })
let { item } = props
</script>
<template>
    <div class="flex items-center gap-1">
        <div class="icon">
            <img class="w-10 p-1" v-if="item?.children.length > 0 && !item?.isActive" :src="FolderIcon" alt="">
            <img class="w-10 p-1" v-else-if="item?.children.length > 0 && item?.isActive" :src="FolderOpenIcon" alt="">
            <img class="w-10 p-1" v-else :src="FileIcon" alt="">
        </div>
        <div class="title">
            {{ item?.name }}
        </div>
    </div>
</template>