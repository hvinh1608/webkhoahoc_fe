import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import Default from "./layout/wrapper/index.vue";
import Blank from "./layout/wrapper/index_blank.vue";
import Client from "./layout/wrapper/index_client.vue";
import Toaster from "@meforma/vue-toaster";
import vue3GoogleLogin from "vue3-google-login";
import Chatbox from "@/components/KhachHang/ChatBox/index.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "./assets/css/commonStyles.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import i18n from "./i18n";
import AOS from "aos";
import "aos/dist/aos.css";
import VueLazyLoad from "vue-lazyload";

const app = createApp(App);
const chatboxApp = createApp(Chatbox);
chatboxApp.mount("#chatbox");

app.use(VueLazyLoad, {
  loading: "/src/assets/images/loading.gif", // Đường dẫn ảnh loading (có thể thay bằng ảnh khác)
  error: "/src/assets/images/error.png", // Đường dẫn ảnh lỗi (có thể thay bằng ảnh khác)
});
app.use(createPinia());
app.use(router);
app.use(vue3GoogleLogin, {
  clientId:
    "22054037281-lebrk8ki9dk13j29n5htrr9m9a564tg0.apps.googleusercontent.com",
});
app.use(Toaster, {
  position: "top-right",
});
app.use(Toast, {
  position: "top-right",
  timeout: 3000,
});
app.component("default-layout", Default);
app.component("blank-layout", Blank);
app.component("client-layout", Client);
Client;
app.mount("#app");
app.use(i18n);
AOS.init();
