<script setup lang="ts">
import { useDocumentsStore } from '../store/documents';
import { useSupabaseStore } from '../store/supabase';
import { useUserStore } from '../store/user';
import { PhClipboard } from '@phosphor-icons/vue';
import { copyToClipboard } from "../utils/copyToClipboard"


const supabaseStore = useSupabaseStore()
const documentsStore = useDocumentsStore()
const userStore = useUserStore()

const PublishNote = async () => {
    console.log('Publishing Note')
    console.log("active note", documentsStore.activeDoc)
    documentsStore.activeDoc.isPublished = true
    documentsStore.activeDoc.user_token = userStore.getUserToken()
    let note = {
        title: documentsStore.activeDoc.name,
        content: documentsStore.activeDoc.content,
        is_rtl: documentsStore.activeDoc.direction == 'rtl',
        user_token: userStore.getUserToken()
    }
    let publishedNote = await supabaseStore.publishNote(note)
    console.log("published note", publishedNote)
    documentsStore.activeDoc.published_id = publishedNote.id
}

function getPublishedUrl() {
    let href = window.location.href.slice(0, -1)
    return `${href}/${documentsStore.activeDoc.published_id}`
}


function updateNote() {
    console.log('Updating Note')
    documentsStore.activeDoc.user_token = userStore.getUserToken()
    let note = {
        title: documentsStore.activeDoc.name,
        content: documentsStore.activeDoc.content,
        updated_at: new Date().toISOString(),
        is_rtl: documentsStore.activeDoc.direction == 'rtl',
        user_token: userStore.getUserToken()
    }
    supabaseStore.updatePublishedNote(documentsStore.activeDoc.published_id, note)
}

async function deleteNote() {
    console.log('Deleting Note')
    documentsStore.activeDoc.isPublished = false
    await supabaseStore.deleteNote(documentsStore.activeDoc.published_id)
    documentsStore.activeDoc.published_id = ""
}

</script>
<template>
    <div class="dropdown">
        <button tabindex="0" class="">
            <slot />
        </button>
        <div tabindex="0"
            class="dropdown-content z-[1] left-2  pb-5 px-5 shadow bg-base-100 rounded-box min-w-72 text-right">
            <h3 class="font-bold text-xl">نشر الملاحظه </h3>

            <div v-if="documentsStore.activeDoc.published_id" class="w-96">
                <div class="bg-base-200 border-base-200 px-2 rounded  flex items-center justify-between my-2">
                    <div class="p-1 ml-4 mr-2" @click="copyToClipboard(getPublishedUrl())">
                        <PhClipboard :size="24" class="cursor-pointer" />
                    </div>
                    <p class="truncate">{{ getPublishedUrl() }}</p>
                </div>
            </div>


            <template v-if="!documentsStore.activeDoc.published_id">
                <button @click="PublishNote" class="btn btn-sm text-sm btn-primary mt-2">نشر</button>
            </template>

            <template v-else>
                <button class="btn btn-sm text-sm btn-primary mt-2" @click="updateNote">تحديث</button>
                <button class="btn btn-sm text-sm btn-error mt-2 mx-2" @click="deleteNote">الغاء النشر</button>
            </template>
        </div>
    </div>
</template>

<style>
[dir="rtl"] .checkbox:checked,
[dir="rtl"] .checkbox[checked="true"],
[dir="rtl"] .checkbox[aria-checked="true"] {
    background-image: linear-gradient(-45deg, transparent 65%, hsl(var(--chkbg)) 65.99%),
        linear-gradient(45deg, transparent 75%, hsl(var(--chkbg)) 75.99%),
        linear-gradient(-45deg, hsl(var(--chkbg)) 40%, transparent 40.99%),
        linear-gradient(45deg,
            hsl(var(--chkbg)) 30%,
            hsl(var(--chkfg)) 30.99%,
            hsl(var(--chkfg)) 40%,
            transparent 40.99%),
        linear-gradient(-45deg, hsl(var(--chkfg)) 50%, hsl(var(--chkbg)) 50.99%);
}
</style>