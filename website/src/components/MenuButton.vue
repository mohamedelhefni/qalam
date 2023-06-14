<script setup lang="ts">
const props = defineProps({ isActive: Boolean })
</script>


<template>
    <button class="rounded p-1" :class="{ 'bg-base-100 text-base-content': props.isActive }">
        <slot></slot>
    </button>
</template>