import { createApp } from "vue";
import App from "./App.vue";
import { i18n } from "./i18n";
import router from "./router";
import store from "./store";

const app = createApp(App);

// * Multi-language support
app.config.globalProperties.t = i18n.t.bind(i18n);

app.use(router).use(store).mount("#app");
