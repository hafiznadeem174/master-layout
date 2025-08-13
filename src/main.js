import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaHome, FaUsers, FaCog, FaChartBar, FaEnvelope, FaUser } from "oh-vue-icons/icons";

addIcons(FaHome, FaUsers, FaCog, FaChartBar, FaEnvelope, FaUser);

createApp(App)
  .use(router)
  .component("v-icon", OhVueIcon)
  .mount("#app");
