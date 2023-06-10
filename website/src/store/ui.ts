import { defineStore } from "pinia";
import { ref } from "vue";

export const useUIStore = defineStore("ui", () => {
    let isActive = ref(false)
    function toggleSidebar() {
        isActive.value = !isActive.value
    }
    return { toggleSidebar, isActive }
})