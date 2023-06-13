import { defineStore } from "pinia";
import { ref } from "vue";

export const useUIStore = defineStore("ui", () => {
    let isActive = ref(false)
    let theme = ref("cupcake")

    const localStorageTheme = localStorage.getItem("theme");
    if (localStorageTheme) {
        theme.value = JSON.parse(localStorageTheme);
    }

    function toggleSidebar() {
        isActive.value = !isActive.value
    }

    function setTheme(value: string) {
        theme.value = value
        localStorage.setItem("theme", JSON.stringify(value));
    }
    return { toggleSidebar, isActive, theme, setTheme }
})