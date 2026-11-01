import { defineStore } from "pinia";
import { ref } from "vue";

export const useUIStore = defineStore("ui", () => {
    let isActive = ref(false)
    let theme = ref(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    let vimEnabled = ref(false)

    const localStorageTheme = localStorage.getItem("theme");
    if (localStorageTheme === '"light"' || localStorageTheme === '"dark"') {
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