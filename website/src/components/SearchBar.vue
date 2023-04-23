<script setup lang="ts">
import SearchIcon from "/Search.svg"
</script>
<template>
    <div class="flex items-center relative">
        <img class="absolute p-3 w-12" :src="SearchIcon" alt="">
        <input class="p-2 w-full rounded bg-white border border-gray-200 pr-10" type="text" placeholder="بحث ...">
    </div>
</template>