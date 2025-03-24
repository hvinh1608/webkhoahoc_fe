<template>
    <div class="container-fluid">
        <div class="row row-cols-lg-2">
            <div class="col mx-auto">
                <div class="mb-4 text-center">
                    <img src="https://dzfullstack.com/assets/images/logo-1.png" width="180" alt="">
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="border p-4 rounded">
                            <div class="text-center">
                                <h3>ĐĂNG NHẬP TÀI KHOẢN ADMIN</h3>
                            </div>
                            <hr>
                            <div class="form-body">
                                <div class="row g-3">
                                    <div class="col-12">
                                        <label class="mb-2">Email</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fa-solid fa-envelope"></i></span>
                                            <input v-model="tai_Khoan.email" type="email" class="form-control" required>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <label class="mb-2">Mật khẩu</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
                                            <input :type="showPassword ? 'text' : 'password'" v-model="tai_Khoan.password" class="form-control" required>
                                            <button @click="showPassword = !showPassword" type="button" class="btn btn-outline-secondary">
                                                <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" id="rememberMe" v-model="rememberMe">
                                            <label class="form-check-label" for="rememberMe">Remember Me</label>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <label class="mb-2">Recaptcha</label>
                                        <div class="input-group">
                                            <div class="g-recaptcha" data-sitekey="6LcGsYwqAAAAAGbO3dMvso_ZzpESyqLJ3lOin-p0"></div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="d-grid">
                                            <button @click="dangNhap" :disabled="loading" type="submit" class="btn btn-primary">
                                                <span v-if="loading" class="spinner-border spinner-border-sm"></span>
                                                <i v-else class="fa-solid fa-lock-open"></i> Đăng Nhập
                                            </button>
                                        </div>
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
            tai_Khoan: {
                email: localStorage.getItem("admin_email") || "",
                password: localStorage.getItem("admin_password") || "",
            },
            showPassword: false,
            rememberMe: localStorage.getItem("remember_admin") === "true",
            loading: false, 
        };
    },
    computed: {
        isRemembered() {
            return this.rememberMe;
        }
    },
    watch: {
        rememberMe(newValue) {
            localStorage.setItem("remember_admin", newValue);
            if (!newValue) this.clearStoredCredentials();
        }
    },
    mounted() {
        this.kiemTraDangNhap();
        this.loadRecaptcha();
    },
    methods: {
        async dangNhap() {
            if (!this.tai_Khoan.email || !this.tai_Khoan.password) {
                return this.$toast.error("Vui lòng nhập email và mật khẩu.");
            }

            let code = grecaptcha.getResponse();
            if (!code) {
                return this.$toast.error("Bạn chưa chọn recaptcha");
            }

            this.loading = true;

            try {
                this.tai_Khoan.code = code;
                let res = await axios.post("http://127.0.0.1:8000/api/admin/dang-nhap", this.tai_Khoan);
                if (res.data.status === 1) {
                    this.$toast.success(res.data.message);
                    localStorage.setItem("key_admin", res.data.key);
                    localStorage.setItem("name", res.data.name);
                    localStorage.setItem("id_quyen", res.data.role);

                    if (this.rememberMe) {
                        this.saveCredentials();
                    } else {
                        this.clearStoredCredentials();
                    }

                    this.$router.push('/admin/nhan-vien');
                } else {
                    this.$toast.error(res.data.message);
                }
            } catch (error) {
                const list = Object.values(error.response?.data?.errors || {});
                list.forEach(msg => this.$toast.error(msg[0]));
            } finally {
                this.loading = false;
            }
        },
        async kiemTraDangNhap() {
            try {
                let res = await axios.get("http://127.0.0.1:8000/api/admin/nhan-vien/check-login", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_admin"),
                    },
                });
                if (res.data.status) {
                    this.$router.push('/admin/nhan-vien');
                }
            } catch (error) {
                console.error("Lỗi kiểm tra đăng nhập:", error);
            }
        },
        loadRecaptcha() {
            const script = document.createElement('script');
            script.setAttribute('src', 'https://www.google.com/recaptcha/api.js');
            script.onerror = () => {
                this.$toast.error("Không thể tải Recaptcha. Vui lòng thử lại sau.");
            };
            document.head.appendChild(script);
        },
        saveCredentials() {
            localStorage.setItem("admin_email", this.tai_Khoan.email);
            localStorage.setItem("admin_password", this.tai_Khoan.password);
        },
        clearStoredCredentials() {
            localStorage.removeItem("admin_email");
            localStorage.removeItem("admin_password");
            this.tai_Khoan.email = "";
            this.tai_Khoan.password = "";
        }
    }
};
</script>

<style></style>
