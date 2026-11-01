<script setup lang="ts">
import { PhPenNib } from "@phosphor-icons/vue"

</script>

<template>
    <a href="/" class="flex w-full items-center gap-2">
        <span class="grid place-items-center w-9 h-9 rounded-[22.5%] border border-[color:var(--app-ring)] bg-[#0a0a0a] text-white">
            <PhPenNib :size="20" />
        </span>
        <span class="mz-mursala font-head font-medium text-[20px] leading-8">قلم</span>
    </a>
</template>