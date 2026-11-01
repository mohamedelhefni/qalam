<script setup lang="ts">
const props = defineProps({ isActive: Boolean })
</script>


<template>
    <button class="rounded p-1" :class="{ 'bg-secondary text-secondary-content': props.isActive }">
        <slot></slot>
    </button>
</template>