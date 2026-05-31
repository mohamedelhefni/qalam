import { defineStore } from "pinia";
import { ref } from "vue";

export const useUIStore = defineStore("ui", () => {
    let isActive = ref(false)
    let theme = ref("cupcake")
    let vimEnabled = ref(false)

    const localStorageTheme = localStorage.getItem("theme");
    if (localStorageTheme) {
        theme.value = JSON.parse(localStorageTheme);
    }

    const localStorageVim = localStorage.getItem("vimEnabled");
    if (localStorageVim) {
        vimEnabled.value = JSON.parse(localStorageVim);
    }

    function toggleSidebar() {
        isActive.value = !isActive.value
    }

    function setTheme(value: string) {
        theme.value = value
        localStorage.setItem("theme", JSON.stringify(value));
    }

    function toggleVim() {
        vimEnabled.value = !vimEnabled.value
        localStorage.setItem("vimEnabled", JSON.stringify(vimEnabled.value));
    }

    return { toggleSidebar, isActive, theme, setTheme, vimEnabled, toggleVim }
})