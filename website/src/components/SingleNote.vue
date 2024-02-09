<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useSupabaseStore } from '../store/supabase';
import Navbar from './Navbar.vue';
import NoteContent from './NoteContent.vue';
import SpinnerIcon from './SpinnerIcon.vue';

let note = ref({})
let supabaseStore = useSupabaseStore()
let loading = ref(true)


async function getNote() {
    let id = window.location.href.split("/").pop()
    if (id === "") return
    const { data } = await supabaseStore.supabase.from('notes').select().eq('id', id).maybeSingle()
    note.value = data
    loading.value = false
}


onMounted(() => {
    getNote()
})

</script>

<template>
    <div>
        <Navbar />
        <div v-if="loading" class="flex items-center justify-center my-10">
            <SpinnerIcon />
        </div>
        <NoteContent v-else :note="note" />
    </div>
</template>