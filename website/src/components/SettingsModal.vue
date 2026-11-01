<script setup lang="ts">
import { useUIStore } from "../store/ui"
import { ref } from "vue"
import { PhKeyboard } from "@phosphor-icons/vue"

const uiStore = useUIStore()

const themes = [
    { id: "light", name: "أبيض" },
    { id: "dark", name: "أسود" },
]

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
      <h3>الاعدادات</h3>
      <p class="py-4"></p>
      <div class="modal-content">

        <div class="flex items-center justify-between bg-base-200 rounded px-4 py-3 mb-5">
          <div class="flex items-center gap-2">
            <PhKeyboard :size="24" />
            <span class="font-medium">وضع Vim</span>
          </div>
          <input type="checkbox" class="toggle" :checked="uiStore.vimEnabled" @change="uiStore.toggleVim()" />
        </div>

        <div class="collapse bg-base-200 collapse-plus mb-5">
          <input type="checkbox" />
          <div class="collapse-title font-head font-medium text-[20px] leading-8">
            لينك المزامنه
          </div>
          <div class="collapse-content">
            <input type="text" dir="ltr" class="input input-bordered w-full text-end" aria-label="لينك المزامنه" placeholder="Syncing ID">
          </div>
        </div>

        <div class="collapse bg-base-200 collapse-plus">
          <input type="checkbox" />
          <div class="collapse-title font-head font-medium text-[20px] leading-8">
            المظهر
          </div>
          <div class="collapse-content">
            <div class="themes grid grid-cols-2 gap-3">
              <button v-for="theme in themes" type="button" :key="theme.id" :data-theme="theme.id"
                class="theme p-5 rounded-box border text-start font-medium"
                :class="uiStore.theme === theme.id ? 'border-primary' : 'border-base-300'"
                @click="changeBodyTheme(theme.id)">
                {{ theme.name }}
              </button>
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
