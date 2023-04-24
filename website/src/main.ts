import { inject } from "@vercel/analytics";
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
let pinia = createPinia();
inject();
createApp(App).use(pinia).mount("#app");
