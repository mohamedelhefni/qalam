<script setup lang="ts">
import Star from "/Star.svg"
import Settings from "/Settings.svg"
import Trash from "/Trash.svg"
</script>
<template>
    <div class="flex flex-col gap-3">
        <div class="flex items-center   justify-between rounded cursor-pointer gap-1  group">
            <div class="flex items-center w-5/6">
                <div class="icon">
                    <img class="w-10 p-1 fill-blue-500" :src="Star">
                </div>
                <p class="title flex-1 truncate">
                    <span class="">المفضله</span>
                    <span class="text-muted text-sm px-2">5</span>
                </p>
            </div>
        </div>

        <div class="flex items-center   justify-between rounded cursor-pointer gap-1  group">
            <div class="flex items-center w-5/6">
                <div class="icon">
                    <img class="w-10 p-1 fill-blue-500" :src="Trash">
                </div>
                <p class="title flex-1 truncate">
                    <span class="">المهملات</span>
                    <span class="text-muted text-sm px-2">5</span>
                </p>
            </div>
        </div>

        <div class="flex items-center   justify-between rounded cursor-pointer gap-1  group">
            <div class="flex items-center w-5/6">
                <div class="icon">
                    <img class="w-10 p-1 fill-blue-500" :src="Settings">
                </div>
                <p class="title flex-1 truncate">
                    <span class="">الاعدادات</span>
                </p>
            </div>
        </div>

    </div>
</template>