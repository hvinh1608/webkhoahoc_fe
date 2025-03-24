<template>
    <div class="wrapper">
      <div class="header-wrapper">
        <TopClient></TopClient>
        <MenuClient></MenuClient>
      </div>
      <div class="page-wrapper">
        <div class="page-content">
          <router-view></router-view>
        </div>
      </div>
      <BotClient></BotClient>
      <Chatbox v-if="isChatboxVisible" />
    </div>
  </template>
  
  <script>
  import Swal from "sweetalert2";
  import TopClient from "../components/TopClient.vue";
  import BotClient from "../components/BotClient.vue";
  import MenuClient from "../components/MenuClient.vue";
  import Chatbox from "@/components/KhachHang/ChatBox/index.vue";
  
  export default {
    name: "Client",
    components: {
      TopClient,
      MenuClient,
      BotClient,
      Chatbox,
    },
    data() {
      return {
        isChatboxVisible: false,
      };
    },
    mounted() {
      this.checkLoginStatus();
      this.showPopup();
    },
    watch: {
      $route() {
        this.showPopup(); 
      }
    },
    methods: {
      checkLoginStatus() {
        this.isChatboxVisible = !!localStorage.getItem("key_khach_hang");
      },
      showPopup() {
        if (this.$route.path.includes("/admin")) {
          return; 
        }
  
        if (!sessionStorage.getItem("popupShown")) {
          Swal.fire({
            title: "Chào mừng bạn!",
            text: "Giảm giá 50% khi đăng ký khóa học hôm nay!",
            icon: "info",
            confirmButtonText: "OK",
          });
          sessionStorage.setItem("popupShown", "true"); 
        }
      }
    },
  };
  </script>
  <style>
  @import "../../assets/plugins/simplebar/css/simplebar.css";
  @import "../../assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css";
  @import "../../assets/plugins/metismenu/css/metisMenu.min.css";
  @import "../../assets/css/pace.min.css";
  @import "../../assets/css/bootstrap.min.css";
  @import "../../assets/css/bootstrap-extended.css";
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");
  @import "../../assets/css/app.css";
  @import "../../assets/css/icons.css";
  @import "../../assets/css/dark-theme.css";
  @import "../../assets/css/semi-dark.css";
  @import "../../assets/css/header-colors.css";
  @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css");
  </style>
  