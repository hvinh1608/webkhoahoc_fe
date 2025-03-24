<template>
    <div class="container-fluid">
        <div class="row row-cols-lg-2">
            <div class="col mx-auto">
                <div class="mb-4 text-center">
                    <img src="https://dzfullstack.com/assets/images/logo-1.png" width="180" alt="" />
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="border p-4 rounded">
                            <div class="text-center">
                                <h3>ĐĂNG NHẬP TÀI KHOẢN</h3>
                            </div>
                            <hr />
                            <div class="form-body">
                                <form class="row g-3" @submit.prevent="dangNhap">
                                    <div class="col-12">
                                        <label class="mb-2">Email</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fa-solid fa-envelope"></i></span>
                                            <input v-model="tai_Khoan.email" type="email" class="form-control"
                                                required />
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <label class="mb-2">Password</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
                                            <input :type="showPassword ? 'text' : 'password'"
                                                v-model="tai_Khoan.password" class="form-control" required />
                                            <button @click="showPassword = !showPassword" type="button"
                                                class="btn btn-outline-secondary">
                                                <i
                                                    :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="checkbox-wrapper-5">
                                            <div class="check">
                                                <input id="rememberMe" type="checkbox" v-model="rememberMe">
                                                <label for="rememberMe"></label>
                                            </div>
                                            <span class="checkbox-label">Remember Me</span>
                                        </div>

                                    </div>
                                    <div class="col-md-6 text-end">
                                        <router-link to="/khach-hang/reset-password">Forgot Password?</router-link>
                                    </div>
                                    <div class="col-12">
                                        <label class="mb-2">Recaptcha</label>
                                        <div class="input-group">
                                            <div class="g-recaptcha"
                                                data-sitekey="6LcGsYwqAAAAAGbO3dMvso_ZzpESyqLJ3lOin-p0"></div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="d-grid">
                                            <button type="submit" class="btn btn-primary" :disabled="loading">
                                                <i v-if="loading" class="fa-solid fa-spinner fa-spin"></i>
                                                <i v-else class="fa-solid fa-lock-open"></i> Đăng Nhập
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <router-link to="/khach-hang/dang-ky">
                                            <div class="d-grid">
                                                <button type="button" class="btn btn-secondary">
                                                    Đăng Ký Tài Khoản <i class="ms-2 fa-solid fa-arrow-right"></i>
                                                </button>
                                            </div>
                                        </router-link>
                                    </div>
                                    <hr />
                                    <div class="col-12">
                                        <GoogleLogin :callback="callbackFunction" style="width: 100%" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import {
    GoogleLogin
} from "vue3-google-login";

export default {
    components: {
        GoogleLogin
    },
    data() {
        return {
            tai_Khoan: {
                email: "",
                password: ""
            },
            rememberMe: false,
            showPassword: false,
            loading: false,
        };
    },
    mounted() {
        this.kiemTraDangNhap();
        this.loadRecaptcha();

        const savedEmail = localStorage.getItem("remember_email");
        if (savedEmail) {
            this.tai_Khoan.email = savedEmail;
            this.rememberMe = true;
        }
    },
    methods: {
        loadRecaptcha() {
            const script = document.createElement("script");
            script.src = "https://www.google.com/recaptcha/api.js";
            script.onerror = () => this.$toast.error("Không thể tải Recaptcha. Vui lòng thử lại sau.");
            document.head.appendChild(script);
        },
        async kiemTraDangNhap() {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/khach-hang/check-login", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("key_khach_hang")
                    },
                });
                if (res.data.status) this.$router.push("/trac-nghiem");
            } catch (error) {
                console.warn("Kiểm tra đăng nhập thất bại", error);
            }
        },
        async dangNhap() {
            if (!this.tai_Khoan.email || !this.tai_Khoan.password) {
                this.$toast.error("Vui lòng nhập email và mật khẩu!");
                return;
            }

            let code = grecaptcha.getResponse();
            if (!code) {
                this.$toast.error("Bạn chưa chọn Recaptcha");
                return;
            }

            this.loading = true;
            this.tai_Khoan.code = code;

            try {
                const res = await axios.post("http://127.0.0.1:8000/api/khach-hang/dang-nhap", this.tai_Khoan);
                if (res.data.status === 1) {
                    this.$toast.success(res.data.message);
                    localStorage.setItem("key_khach_hang", res.data.key);

                    if (this.rememberMe) {
                        localStorage.setItem("remember_email", this.tai_Khoan.email);
                    } else {
                        localStorage.removeItem("remember_email");
                    }

                    this.$router.push("/trac-nghiem");
                } else {
                    this.$toast.error(res.data.message);
                }
            } catch (error) {
                this.$toast.error("Lỗi kết nối, vui lòng thử lại!");
            } finally {
                this.loading = false;
            }
        },
        async callbackFunction(response) {
            try {
                const res = await axios.post("http://127.0.0.1:8000/api/khach-hang/dang-nhap-google", {
                    credential: response.credential,
                });
                if (res.data.status === 1) {
                    this.$toast.success(res.data.message);
                    localStorage.setItem("key_khach_hang", res.data.key);
                    this.$router.push("/trac-nghiem");
                } else {
                    this.$toast.error(res.data.message);
                }
            } catch (error) {
                console.error("Google Sign-In error:", error);
                this.$toast.error("Đăng nhập Google thất bại");
            }
        },
    },
};
</script>
<style></style
