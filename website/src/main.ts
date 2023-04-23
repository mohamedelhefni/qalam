import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
let pinia = createPinia();

createApp(App).use(pinia).mount("#app");
