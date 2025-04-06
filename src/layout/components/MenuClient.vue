<template>
  <div class="nav-container primary-menu">
    <div class="mobile-topbar-header">
      <div>
        <img src="https://dzfullstack.com/assets/images/logo-img.png" class="logo-icon" alt="logo icon" />
      </div>
      <div>
        <h4 class="logo-text">DZFULLSTACK</h4>
      </div>
      <div class="toggle-icon ms-auto">
        <i class="bx bx-arrow-to-left"></i>
      </div>
    </div>
    <nav class="navbar navbar-expand-xl w-100">
      <ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
        <li class="nav-item">
          <router-link to="/" class="nav-link">
            <div class="parent-icon"><i class="bx bx-home-circle"></i></div>
            <div class="menu-title">Home</div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/trac-nghiem" class="nav-link">
            <div class="parent-icon"><i class="fa-solid fa-list-check"></i></div>
            <div class="menu-title">Trắc Nghiệm</div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/danh-sach-khoa-hoc" class="nav-link">
            <div class="parent-icon"><i class="fa-solid fa-warehouse"></i></div>
            <div class="menu-title">Danh Sách Khóa Học</div>
          </router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-newspaper me-2"></i>
            Bài Viết
          </a>
          <ul class="dropdown-menu">
            <template v-for="(v, k) in ds_chuyen_muc" :key="k">
              <li>
                <router-link :to="'/bai-viet/' + v.slug_chuyen_muc" class="dropdown-item">
                  {{ v.ten_chuyen_muc }}
                </router-link>
              </li>
            </template>
          </ul>
        </li>
        <li class="nav-item">
          <router-link to="/danh-gia" class="nav-link">
            <div class="parent-icon"><i class="fa-solid fa-thumbs-up"></i></div>
            <div class="menu-title">Đánh Giá</div>
          </router-link>
        </li>
      </ul>
      <div class="cart-container">
        <router-link to="/gio-hang" class="cart-link">
          <i class="fa-solid fa-cart-shopping cart-icon"></i>
          <span class="cart-count">{{ cartItemCount }}</span>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
import { useCartStore } from "@/stores/modules/cart";
import { storeToRefs } from "pinia";
import axios from "axios";

export default {
  data() {
    return {
      ds_chuyen_muc: [],
    };
  },
  setup() {
    const cartStore = useCartStore();
    const { cartItemCount } = storeToRefs(cartStore);
    return { cartItemCount };
  },
  mounted() {
    this.layDuLieuChuyenMuc();
  },
  methods: {
    layDuLieuChuyenMuc() {
      axios
        .get("http://127.0.0.1:8000/api/client/chuyen-muc/data")
        .then((res) => {
          if (res.data && res.data.chuyen_muc && res.data.chuyen_muc.length > 0) {
            this.ds_chuyen_muc = res.data.chuyen_muc;
          } else {
            this.toaster.error("Không tìm thấy bài viết");
          }
        })
        .catch((error) => {
          this.toaster.error("Đã có lỗi xảy ra khi tải dữ liệu");
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
</style>
