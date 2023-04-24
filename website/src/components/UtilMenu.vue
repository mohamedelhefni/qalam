<script setup lang="ts">
import TrashRedIcon from "/TrashRed.svg"
</script>

<template>
    <div class="flex flex-col gap-2">
        <div class="favorite flex items-center  justify-between rounded cursor-pointer gap-1  group">
            <div class="flex items-center w-full ">
                <div class="icon">
                    <img @click="" class="w-10 p-1 " :src="TrashRedIcon" />

                </div>
                <div  class="title flex-1  ">
                    المهملات 
                </div>
            </div>

        </div>
    </div>
</template>