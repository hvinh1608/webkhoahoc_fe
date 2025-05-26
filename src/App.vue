<template>
  <component :is="layout">
    <transition name="fade-page" mode="out-in">
      <router-view />
    </transition>
  </component>
  <!-- Modal học toàn cục -->
  <div v-if="showGoiHocModal" class="goi-hoc-modal-backdrop" @click.self="showGoiHocModal = false">
    <div class="goi-hoc-modal-content">
      <button class="btn-close float-end" @click="showGoiHocModal = false"></button>
      <h2 class="mb-4 text-center">Chọn Gói Học</h2>
      <div class="goi-hoc-card-group d-flex flex-wrap justify-content-center gap-4">
        <!-- Gói tháng -->
        <div class="goi-hoc-card bg-white shadow rounded-4 p-4 text-center">
          <img src="/images/goi_thang.png" class="goi-hoc-image" alt="Gói tháng">
          <div class="goi-hoc-title bg-primary text-white rounded-3 mb-3 py-2">Gói tháng</div>
          <h3 class="goi-hoc-price text-danger mb-3">{{ formatVND(150000) }}</h3>
          <ul class="goi-hoc-list list-unstyled mb-3">
            <li><i class="fa fa-check text-success"></i> Học tất cả khóa học</li>
            <li><i class="fa fa-check text-success"></i> Hỗ trợ 24/7</li>
            <li><i class="fa fa-check text-success"></i> Tiết kiệm hơn mua lẻ</li>
          </ul>
          <button class="btn btn-mua-goi-thang w-100" @click="chonGoi('thang')">Mua gói tháng</button>
        </div>
        <!-- Gói năm -->
        <div class="goi-hoc-card bg-white shadow rounded-4 p-4 text-center">
          <img src="/images/goi_nam.png" class="goi-hoc-image" alt="Gói năm">
          <div class="goi-hoc-title bg-success text-white rounded-3 mb-3 py-2">Gói năm</div>
          <h3 class="goi-hoc-price text-danger mb-3">{{ formatVND(1200000) }}</h3>
          <ul class="goi-hoc-list list-unstyled mb-3">
            <li><i class="fa fa-check text-success"></i> Học tất cả khóa học</li>
            <li><i class="fa fa-check text-success"></i> Hỗ trợ 24/7</li>
            <li><i class="fa fa-check text-success"></i> Tiết kiệm nhiều nhất</li>
            <li><i class="fa fa-gift text-warning"></i> Tặng thêm 1 tháng</li>
          </ul>
          <button class="btn btn-mua-goi-nam w-100" @click="chonGoi('nam')">Mua gói năm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from "@/event-bus";
import axios from "axios";
import { useToast } from 'vue-toastification';
const default_layout = "default";

export default {
  data() {
    return {
      isDarkMode: false,
      showGoiHocModal: false,
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  mounted() {
    if (localStorage.getItem('darkMode') === 'true') {
      this.isDarkMode = true;
      document.body.classList.add('dark-mode');
    }

    emitter.on('open-goi-hoc-modal', () => {
      console.log('on open-goi-hoc-modal');
      this.showGoiHocModal = true;
    });
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    },
  },
  beforeUnmount() {
    emitter.off('open-goi-hoc-modal');
  },
  methods: {
    chonGoi(loaiGoi) {
      let gia = loaiGoi === 'thang' ? 150000 : 1200000;
      let tenGoi = loaiGoi === 'thang' ? 'Gói tháng' : 'Gói năm';
      this.showGoiHocModal = false;
      setTimeout(() => {
        Swal.fire({
          title: `Xác nhận mua ${tenGoi}?`,
          text: `Bạn sẽ được học tất cả các khóa với giá ${this.formatVND(gia)}.`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Mua',
          cancelButtonText: 'Hủy'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.post('http://127.0.0.1:8000/api/mua-goi', {
              loai_goi: loaiGoi,
              so_tien: gia
            }, {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
              }
            }).then(res => {
              if (res.data.status === 1) {
                this.toast.success('Mua gói thành công!');
                this.$router.push('/danh-sach-khoa-hoc');
              } else {
                this.toast.error(res.data.message);
                if (res.data.message && res.data.message.includes('không đủ tiền')) {
                  this.$router.push('/profile');
                }
              }
            }).catch(() => {
              this.toast.error('Có lỗi khi mua gói!');
            });
          }
        });
      }, 200);
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      if (this.isDarkMode) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
      }
    },
    formatVND(number) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
    }
  }
};
</script>
<style>
.fade-page-enter-active,
.fade-page-leave-active {
  transition: opacity 0.5s;
}

.fade-page-enter-from,
.fade-page-leave-to {
  opacity: 0;
}

.fade-page-enter-to,
.fade-page-leave-from {
  opacity: 1;
}

.goi-hoc-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.goi-hoc-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.goi-hoc-modal-content {
  background: #fff;
  border-radius: 16px;
  padding: 32px 24px 24px 24px;
  min-width: 340px;
  max-width: 700px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  position: relative;
  animation: modalFadeIn 0.2s;
}

@keyframes modalFadeIn {
  from {
    transform: translateY(40px) scale(0.95);
    opacity: 0;
  }

  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

.goi-hoc-card-group {
  gap: 32px;
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  /* Đảm bảo các card cao bằng nhau */
}

.goi-hoc-card {
  width: 280px;
  min-height: 440px;
  /* Đặt chiều cao tối thiểu cho card */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* Đẩy nút xuống dưới */
  /* align-items: center; */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  background: #fff;
  margin-bottom: 16px;
}

.goi-hoc-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
}

.goi-hoc-title {
  font-size: 1.25rem;
  font-weight: 700;
  border-radius: 16px;
  color: #fff;
  letter-spacing: 1px;
  padding: 10px 0 10px 0;
  margin-bottom: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  text-align: center;
  background: inherit;
}

.goi-hoc-title.bg-primary {
  background: linear-gradient(90deg, #36d1c4 0%, #5b86e5 100%);
}

.goi-hoc-title.bg-success {
  background: linear-gradient(90deg, #ff512f 0%, #dd2476 100%);
}

.goi-hoc-price {
  font-size: 1.8rem;
  font-weight: bold;
}

.goi-hoc-list li {
  margin-bottom: 8px;
  font-size: 0.95rem;
  text-align: left;
}

.goi-hoc-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 12px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.btn-mua-goi-thang {
  background: linear-gradient(90deg, #36d1c4 0%, #5b86e5 100%);
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  margin-top: 12px;
  box-shadow: 0 2px 8px rgba(91, 134, 229, 0.12);
  transition: background 0.2s, transform 0.15s;
}

.btn-mua-goi-thang:hover {
  background: linear-gradient(90deg, #5b86e5 0%, #36d1c4 100%);
  color: #fff;
  transform: translateY(-2px) scale(1.04);
}

/* Nút mua gói năm */
.btn-mua-goi-nam {
  background: linear-gradient(90deg, #ff512f 0%, #dd2476 100%);
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  margin-top: 12px;
  box-shadow: 0 2px 8px rgba(221, 36, 118, 0.12);
  transition: background 0.2s, transform 0.15s;
}

.btn-mua-goi-nam:hover {
  background: linear-gradient(90deg, #dd2476 0%, #ff512f 100%);
  color: #fff;
  transform: translateY(-2px) scale(1.04);
}
</style>
