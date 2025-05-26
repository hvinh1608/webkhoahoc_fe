<template>
  <div class="multi-channel-group" @mouseenter="showChannels = true" @mouseleave="hidePopup">
    <button class="multi-channel-toggle">
      <i class="fa-solid fa-comments"></i>
    </button>
    <div v-if="showChannels" class="multi-channel-popup" @mouseenter="showChannels = true" @mouseleave="hidePopup">
      <a href="https://m.me/ten_fanpage_cua_ban" target="_blank"
        style="display: flex; align-items: center; gap: 6px; text-decoration: none;">
        <img
          src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.8562-6/475210330_598195142840489_9172482348551739153_n.png?_nc_cat=1&ccb=1-7&_nc_sid=f537c7&_nc_ohc=HCOsIDtzMX4Q7kNvwECVLt2&_nc_oc=AdmYBw-Q6voCrR82YPBX9n6kEKEPuGqx7AqfTK0elqqPcUJo-J_akwshGbxK3JQrsXs&_nc_zt=14&_nc_ht=scontent.fhan14-3.fna&_nc_gid=LCeznWhMtuxmDA50Y_icIw&oh=00_AfICIdjOuKtjNQ_ZhStAdXynmgzsjxFi6wcB0QhmBp-Hvw&oe=68264BD8"
          width="28" alt="Messenger" />
        <span>Messenger</span>
      </a>

      <a href="https://zalo.me/yourzaloid" target="_blank" class="channel-btn zalo">
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" width="28" /> Zalo
      </a>
    </div>
  </div>
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
      showChannels: false,
      hideTimeout: null,
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
          html: `
        <div style="text-align:left">
          <p>🎉 <b>Ưu đãi đặc biệt cho học viên chăm chỉ!</b></p>
          <ul style="padding-left: 20px;">
            <li>Học <b>7 ngày liên tiếp</b> nhận <span style="color:#d84315"><b>mã giảm giá 50%</b></span></li>
            <li>Học đủ <b>30 ngày liên tiếp</b> nhận <span style="color:#388e3c"><b>mã giảm giá 100%</b></span> (miễn phí khóa học!)</li>
          </ul>
        </div>
      `,
          icon: "info",
          confirmButtonText: "OK",
        });
        sessionStorage.setItem("popupShown", "true");
      }
    },
    hidePopup() {
      this.hideTimeout = setTimeout(() => {
        this.showChannels = false;
      }, 200); // 200ms trễ, đủ để di chuột sang popup
    },
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