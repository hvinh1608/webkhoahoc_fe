<template>
  <div class="container-fluid">
    <div class="row row-cols-lg-2">
      <div class="col mx-auto">
        <div class="mb-4 text-center">
          <img :src="'/src/assets/images/logo-1.png'" width="180">
        </div>
        <div class="card">
          <div class="card-body">
            <div class="border p-4 rounded">
              <div class="text-center">
                <h3 class="">ĐĂNG KÝ KHÓA HỌC CÙNG <br> DZFULLSTACK</h3>
              </div>
              <hr>
              <div class="form-body">
                <div class="row g-3">
                  <div class="col-6">
                    <label class="mb-2">Họ và Tên</label>
                    <input v-model="create.ho_va_ten" type="text" class="form-control">
                  </div>
                  <div class="col-6">
                    <label class="mb-2">Email</label>
                    <input v-model="create.email" type="text" class="form-control">
                  </div>
                  <div class="col-6">
                    <label class="mb-2">Số Điện Thoại</label>
                    <input v-model="create.so_dien_thoai" type="text" class="form-control">
                  </div>
                  <div class="col-6">
                    <label class="mb-2">Ngày Sinh</label>
                    <input v-model="create.ngay_sinh" type="date" class="form-control">
                  </div>
                  <div class="col-6">
                    <label class="mb-2">Mật Khẩu</label>
                    <input v-model="create.password" type="password" class="form-control">
                  </div>
                  <div class="col-6">
                    <label class="mb-2">Nhập Lại Mật Khẩu</label>
                    <input v-model="create.re_password" type="password" class="form-control">
                  </div>
                  <div class="col-12">
                    <div class="d-grid">
                      <button v-on:click="DangKyTaiKhoan" type="button" class="btn btn-primary" :disabled="loading">
                        <i v-if="loading" class="fas fa-spinner fa-spin me-2"></i>
                        <i v-else class="fa-regular fa-user me-2"></i>
                        Đăng Ký
                      </button>
                    </div>
                  </div>
                  <div class="col-12">
                    <router-link to="/khach-hang/dang-nhap">
                      <div class="d-grid">
                        <button type="button" class="btn btn-secondary"><i class="fa-solid fa-arrow-left"></i>Quay Lại
                          Đăng
                          Nhập</button>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      loading: false,
      create: {
        ho_va_ten: "",
        email: "",
        password: "",
        re_password: "",
        so_dien_thoai: "",
        ngay_sinh: "",
      }
    }
  },
  mounted() {

  },
  methods: {
    DangKyTaiKhoan() {
      this.loading = true;
      axios
        .post("http://127.0.0.1:8000/api/khach-hang/dang-ky", this.create)
        .then((res) => {
          if (res.data.status == 1) {
            this.$toast.success(res.data.message);
            this.create = {
              ho_va_ten: "",
              email: "",
              password: "",
              re_password: "",
              so_dien_thoai: "",
              ngay_sinh: "",
            };
          }
        })
        .catch((res) => {
          const list = Object.values(res.response.data.errors);
          list.forEach((v) => {
            this.$toast.error(v[0]);
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
}
</script>
<style></style>