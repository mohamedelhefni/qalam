import { defineStore } from "pinia";
import { ref } from "vue";
import { generateUserToken } from "../utils/token";

export const useUserStore = defineStore("user", () => {
    let userToken = ref("")

    function getUserToken() {
        let storedToken = localStorage.getItem("userToken")
        if (storedToken) {
            userToken.value = storedToken
        }
        if (!userToken.value) {
            userToken.value = generateUserToken()
            localStorage.setItem("userToken", userToken.value)
        }
        return userToken.value
    }

    return {
        getUserToken,
    }

})