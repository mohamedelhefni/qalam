<script setup lang="ts">
const themes = ["light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",]

function changeBodyTheme(theme: string) {
    document.body.setAttribute('data-theme', theme)
}
</script>
<template>
    <dialog id="settingsModal" class="modal">
        <form method="dialog" class="modal-box ">
            <h3 class="font-bold text-lg">الاعدادات</h3>
            <p class="py-4"></p>
            <div class="modal-content">
                <h2 class="my-2 font-bold text-1xl">الثيمات</h2>
                <div class="themes grid grid-cols-2 gap-3">
                    <div v-for="theme in themes" class="theme" :key="theme" :data-theme="theme"
                        @click="changeBodyTheme(theme)">
                        <div class="p-5 rounded rounded shadow cursor-pointer border border-base-800">
                            <h4 class="py-3 font-bold">{{ theme }}</h4>
                            <div class="flex items-center gap-2 w-full flex-wrap">
                                <span class="badge">A</span>
                                <span class="badge badge-neutral">A</span>
                                <span class="badge badge-primary">A</span>
                                <span class="badge badge-secondary">A</span>
                                <span class="badge badge-accent">A</span>
                                <span class="badge badge-ghost">A</span>
                                <span class="badge badge-link">A</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-action">
                <button class="btn btn-primary">اغلاق</button>
            </div>
        </form>
    </dialog>
</template>