<script setup lang="ts">
import { useUIStore } from "../store/ui"
import { ref } from "vue"

const uiStore = useUIStore()

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

let closeButton = ref()

function changeBodyTheme(theme: string) {
  document.body.setAttribute('data-theme', theme)
  uiStore.setTheme(theme)
  closeButton.value.click()
}

</script>
<template>
  <dialog id="settingsModal" class="modal">
    <form method="dialog" class="modal-box ">
      <button for="deleteModal" class="btn btn-sm btn-circle btn-ghost absolute left-2 top-2">✕</button>
      <h3 class="font-bold text-lg">الاعدادات</h3>
      <p class="py-4"></p>
      <div class="modal-content">

        <div class="collapse bg-base-200 collapse-plus mb-5">
          <input type="checkbox" />
          <div class="collapse-title text-xl font-medium">
            لينك المزامنه
          </div>
          <div class="collapse-content">
            <input type="text" class="input w-full p-3" placeholder="Syncing ID">
          </div>
        </div>

        <div class="collapse bg-base-200 collapse-plus">
          <input type="checkbox" />
          <div class="collapse-title text-xl font-medium">
            الثيمات
          </div>
          <div class="collapse-content">
            <div class="themes grid grid-cols-2 gap-3">
              <div v-for="theme in themes" class="theme" :key="theme" :data-theme="theme" @click="changeBodyTheme(theme)">
                <div class="p-5 rounded shadow cursor-pointer border border-base-800">
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
        </div>


      </div>
      <div class="modal-action">
        <button ref="closeButton" class="btn btn-primary">اغلاق</button>
      </div>
    </form>
  </dialog>
</template>
