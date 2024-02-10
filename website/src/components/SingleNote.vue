<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useSupabaseStore } from '../store/supabase';
import Navbar from './Navbar.vue';
import NoteContent from './NoteContent.vue';

let note = ref()
let supabaseStore = useSupabaseStore()
let loading = ref(true)


async function getNote() {
    let id = window.location.pathname.split('/')[1]
    if (id === "") return
    let data = await supabaseStore.getNote(id)
    if (data === null) {
        window.location.href = "/"
        return
    }
    note.value = data
    loading.value = false
    supabaseStore.updateViewsCount(id, note.value.views + 1)
}


onMounted(() => {
    getNote()
})

</script>

<template>
    <div>
        <Navbar />
        <div v-if="loading" class="flex items-center justify-center my-10">
            <span class="loading loading-infinity loading-lg"></span>
        </div>
        <NoteContent v-else :note="note" :dir="note.is_rtl ? 'rtl' : 'ltr'" />
    </div>
</template>