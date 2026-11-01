<script setup lang="ts">
import Showdown from 'showdown';
import { beautifyDate } from '../utils/date';

defineProps<{ note: any, dir: string }>()
const showDown = new Showdown.Converter()

</script>
<template>
    <div class="container max-w-screen-lg mx-auto py-10 px-10 lg:px-5" :dir="dir">
        <div class="flex flex-col gap-2 items-center">
            <p class="text-base-400 text-muted text-sm">{{ beautifyDate(note.created_at) }}, <span class="mx-1"><b>{{ note.views }}</b> مشاهده</span></p>
            <h1 class="lg:text-[52px] lg:leading-[80px]">{{ note.title }}</h1>
        </div>
        <div class="my-10 prose mx-auto" v-html="showDown.makeHtml(note.content)">
        </div>
    </div>
</template>