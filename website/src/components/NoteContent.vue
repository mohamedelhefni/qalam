<script setup lang="ts">
import { PhEye } from '@phosphor-icons/vue';
import Showdown from 'showdown';
import { beautifyDate } from '../utils/date';

defineProps<{ note: any, dir: string }>()
const showDown = new Showdown.Converter()

</script>
<template>
    <div class="container max-w-screen-lg mx-auto py-10" :dir="dir">
        <div class="flex flex-col gap-2 ">
            <p class="text-base-400 text-muted text-sm">{{ beautifyDate(note.created_at) }}</p>
            <h1 class="text-5xl text-base-800 font-bold">{{ note.title }}</h1>
            <div class="flex items-center gap-3 text-muted text-sm mt-1">
                <PhEye :size="20" class="text-base-800" />
                <p class="text-base-800">{{ note.views }}</p>
            </div>
        </div>
        <div class=" my-10 prose-xl" v-html="showDown.makeHtml(note.content)">
        </div>
    </div>
</template>