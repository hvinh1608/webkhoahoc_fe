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
          <router-link to="/trang-chu" class="nav-link menu-home-link">
            <div class="parent-icon"><i class="bx bx-home-circle"></i></div>
            <div class="menu-title">{{ $t('home') }}</div>
          </router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <div class="parent-icon"><i class="fa-solid fa-book"></i></div>
            <div class="menu-title">{{ $t('khoa_hoc') }}</div>
          </a>
          <ul class="dropdown-menu">
            <li>
              <router-link to="/tat-ca-khoa-hoc" class="dropdown-item">
                <i class="fa-solid fa-user-graduate me-2"></i>
                {{ $t('khoa_hoc_mat_phi') }}
              </router-link>
            </li>
            <li>
              <router-link to="/tat-ca-khoa-hoc-free" class="dropdown-item">
                <i class="fa-solid fa-book-open-reader me-2"></i>
                {{ $t('khoa_hoc_mien_phi') }}
              </router-link>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <router-link to="/danh-sach-khoa-hoc" class="nav-link menu-course-link">
            <div class="parent-icon"><i class="fa-solid fa-warehouse"></i></div>
            <div class="menu-title">{{ $t('course_list') }}</div>
          </router-link>
        </li>
        <li class="nav-item dropdown menu-post-link">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-newspaper me-2"></i>
            {{ $t('post') }}
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
          <router-link to="/danh-gia" class="nav-link menu-review-link">
            <div class="parent-icon"><i class="fa-solid fa-thumbs-up"></i></div>
            <div class="menu-title">{{ $t('review') }}</div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/bang-xep-hang" class="nav-link menu-ranking-link">
            <div class="parent-icon"><i class="fa-solid fa-ranking-star"></i></div>
            <div class="menu-title">{{ $t('ranking') }}</div>
          </router-link>
        </li>
      </ul>
      <div class="goi-hoc-float-icon me-2" @click="openGoiHocModal" title="Xem các gói học">
        <i class="fa-solid fa-gem fa-2x"></i>
      </div>
      <button class="darkmode-switch" @click="$root.toggleDarkMode()"
        :aria-label="isDarkMode ? 'Light mode' : 'Dark mode'">
        <i :class="$root.isDarkMode ? 'fa-solid fa-moon' : 'fa-solid fa-sun'"></i>
      </button>
      <button class="lang-flag me-4" @click="toggleLang" :aria-label="$i18n.locale === 'vi' ? 'Tiếng Việt' : 'English'">
        <img :src="$i18n.locale === 'vi'
          ? 'https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/vn.svg'
          : 'https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/us.svg'"
          :alt="$i18n.locale === 'vi' ? 'VN' : 'EN'" class="flag-icon" />
      </button>
      <div class="cart-container mt-2">
        <router-link to="/gio-hang" class="cart-link">
          <i class="fa-solid fa-cart-shopping cart-icon"></i>
          <span class="cart-count">{{ cartCount }}</span>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
import emitter from "@/event-bus";

export default {
  data() {
    return {
      ds_chuyen_muc: [],
      cartCount: 0,
    };
  },
  mounted() {
    this.layDuLieuChuyenMuc();
    this.fetchCartCount();
    emitter.on('update-cart-count', this.fetchCartCount);
  },
  watch: {
    $route() {
      this.fetchCartCount();
    }
  },
  methods: {
    openGoiHocModal() {
      console.log('emit open-goi-hoc-modal');
      emitter.emit('open-goi-hoc-modal');
    },
    beforeUnmount() {
      emitter.off('update-cart-count', this.fetchCartCount);
    },
    async fetchCartCount() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/gio-hang", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("key_khach_hang"),
          },
        });
        this.cartCount = res.data.cart?.items?.length || 0;
      } catch {
        this.cartCount = 0;
      }
    },
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
    toggleLang() {
      this.$i18n.locale = this.$i18n.locale === 'vi' ? 'en' : 'vi';
    }
  },
};
</script>

<style scoped></style>
