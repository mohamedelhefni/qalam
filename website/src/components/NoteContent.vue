<script setup lang="ts">
import Showdown from 'showdown';

defineProps<{ note: any }>()
const showDown = new Showdown.Converter()


</script>
<template>

    <div class="container max-w-screen-lg mx-auto py-10">
        <div class="flex flex-col gap-2 ">
            <p class="text-base-400 text-muted text-sm">{{ new Date(note.created_at).toLocaleDateString() }}</p>
            <h1 class="text-5xl text-base-800 font-bold">{{ note.title }}</h1>
        </div>
        <div class=" my-10 prose-xl" v-html=" showDown.makeHtml(note.content) ">
        </div>
    </div>
</template>