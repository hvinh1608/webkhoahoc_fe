<template>
    <div class="container-fluid">
        <div class="row row-cols-lg-2">
            <div class="col mx-auto">
                <div class="mb-4 text-center">
                    <img src="/images/logo.jpg" width="180" alt="" />
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
                                    <!-- <div class="col-12">
                                        <GoogleLogin :callback="callbackFunction" style="width: 100%" />
                                    </div> -->
                                    <div class="row">
                                        <div class="col-lg-6 mt-2">
                                            <button class="button-git w-100" type="button" @click="loginWithGithub">
                                                <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24">
                                                    <title>github</title>
                                                    <rect fill="none" height="24" width="24"></rect>
                                                    <path
                                                        d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z">
                                                    </path>
                                                </svg>
                                                Continue with Github
                                            </button>
                                        </div>
                                        <div class="col-lg-6 mt-2">
                                            <button class="button-fb w-100" type="button" @click="loginWithFacebook">
                                                <svg stroke="#ffffff" xml:space="preserve" viewBox="-143 145 512 512"
                                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                                    xmlns="http://www.w3.org/2000/svg" id="Layer_1" version="1.1"
                                                    fill="#ffffff">
                                                    <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                                                    <g stroke-linejoin="round" stroke-linecap="round"
                                                        id="SVGRepo_tracerCarrier"></g>
                                                    <g id="SVGRepo_iconCarrier">
                                                        <path
                                                            d="M329,145h-432c-22.1,0-40,17.9-40,40v432c0,22.1,17.9,40,40,40h432c22.1,0,40-17.9,40-40V185C369,162.9,351.1,145,329,145z M169.5,357.6l-2.9,38.3h-39.3v133H77.7v-133H51.2v-38.3h26.5v-25.7c0-11.3,0.3-28.8,8.5-39.7c8.7-11.5,20.6-19.3,41.1-19.3 c33.4,0,47.4,4.8,47.4,4.8l-6.6,39.2c0,0-11-3.2-21.3-3.2c-10.3,0-19.5,3.7-19.5,14v29.9H169.5z">
                                                        </path>
                                                    </g>
                                                </svg>
                                                Continue with Facebook
                                            </button>
                                        </div>
                                        <div class="col-lg-6 mt-3">
                                            <button class="button-google w-100" type="button" @click="loginWithGoogle">
                                                <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"
                                                    viewBox="0 0 256 262">
                                                    <path fill="#4285F4"
                                                        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027">
                                                    </path>
                                                    <path fill="#34A853"
                                                        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1">
                                                    </path>
                                                    <path fill="#FBBC05"
                                                        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782">
                                                    </path>
                                                    <path fill="#EB4335"
                                                        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251">
                                                    </path>
                                                </svg>
                                                Continue with Google
                                            </button>
                                        </div>
                                        <div class="col-lg-6 mt-3">
                                            <button class="button-dribbble w-100" type="button"
                                                @click="loginWithDribbble">
                                                <svg viewBox="0 0 46 46" version="1.1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000">
                                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                        stroke-linejoin="round"></g>
                                                    <g id="SVGRepo_iconCarrier">
                                                        <title>Dribbble-color</title>
                                                        <desc>Created with Sketch.</desc>
                                                        <defs> </defs>
                                                        <g id="Icons" stroke="none" stroke-width="1" fill="none"
                                                            fill-rule="evenodd">
                                                            <g id="Color-"
                                                                transform="translate(-601.000000, -161.000000)"
                                                                fill="#ffffff">
                                                                <path
                                                                    d="M634.977303,200.290258 C634.777151,199.105709 633.730405,193.33982 631.152761,186.262273 C637.495443,185.248104 642.988828,186.987066 643.394543,187.119584 C642.520903,192.593392 639.386076,197.312658 634.977303,200.290258 L634.977303,200.290258 L634.977303,200.290258 Z M624.001352,203.643777 C619.246369,203.643777 614.886282,201.953495 611.486388,199.140867 C611.746046,199.351814 611.927265,199.484332 611.927265,199.484332 C611.927265,199.484332 615.692303,191.27362 627.341742,187.21424 C627.385018,187.198013 627.430999,187.187195 627.474275,187.173673 C630.238549,194.353989 631.377256,200.368687 631.669371,202.086013 C629.313518,203.08666 626.719645,203.643777 624.001352,203.643777 L624.001352,203.643777 L624.001352,203.643777 Z M604.356618,183.998648 C604.356618,183.790405 604.367437,183.584867 604.372846,183.379329 C604.721762,183.387442 614.426471,183.606502 624.539601,180.580222 C625.102193,181.680934 625.640442,182.803281 626.13271,183.920219 C625.873052,183.990534 625.616099,184.068963 625.359146,184.155506 C614.759158,187.57934 609.382078,197.115233 609.382078,197.115233 C609.382078,197.115233 609.390192,197.123346 609.390192,197.126051 C606.260775,193.645423 604.356618,189.045153 604.356618,183.998648 L604.356618,183.998648 L604.356618,183.998648 Z M615.619274,166.238521 C615.881637,166.587395 619.514141,171.512199 622.914035,177.553942 C613.482507,180.060968 605.295173,179.960903 604.778562,179.95279 C606.052508,173.867776 610.139413,168.823976 615.619274,166.238521 L615.619274,166.238521 L615.619274,166.238521 Z M619.295055,164.929567 C619.295055,164.932271 619.29235,164.934976 619.29235,164.934976 C619.29235,164.934976 619.268007,164.940385 619.232845,164.945793 C619.254483,164.940385 619.273417,164.93768 619.295055,164.929567 L619.295055,164.929567 L619.295055,164.929567 Z M636.973423,169.262097 C636.924737,169.335117 634.128006,173.594626 626.711531,176.372097 C623.354913,170.203245 619.665608,165.302781 619.370788,164.91334 C620.855706,164.553648 622.405539,164.358928 624.001352,164.358928 C628.972717,164.358928 633.514024,166.214181 636.973423,169.262097 L636.973423,169.262097 L636.973423,169.262097 Z M643.637973,183.803927 C643.353972,183.741725 636.705651,182.311071 629.957253,183.160268 C629.816605,182.824916 629.678662,182.48686 629.532604,182.148804 C629.124184,181.186019 628.683307,180.234053 628.226201,179.298313 C635.983477,176.131401 639.131828,171.579811 639.169695,171.525722 C641.923149,174.871127 643.591992,179.144159 643.637973,183.803927 L643.637973,183.803927 L643.637973,183.803927 Z M646.53478,179.371333 C646.231846,177.894703 645.777445,176.437004 645.19051,175.046916 C644.617099,173.683873 643.900335,172.36951 643.069971,171.14169 C642.250426,169.924687 641.303757,168.778 640.265126,167.739491 C639.22379,166.698277 638.079673,165.754424 636.859822,164.932271 C635.631857,164.0993 634.31734,163.38803 632.954137,162.809277 C631.563885,162.225116 630.10872,161.770768 628.631916,161.470574 C627.117246,161.159563 625.559299,161 624.001352,161 C622.440701,161 620.882754,161.159563 619.368084,161.470574 C617.89128,161.770768 616.436115,162.225116 615.045863,162.809277 C613.68266,163.38803 612.368143,164.0993 611.137473,164.932271 C609.920327,165.754424 608.77621,166.698277 607.734874,167.739491 C606.696243,168.778 605.752278,169.924687 604.930029,171.14169 C604.099665,172.36951 603.382901,173.683873 602.80949,175.046916 C602.219851,176.437004 601.768154,177.894703 601.46522,179.371333 C601.156877,180.883121 601,182.440884 601,183.998648 C601,185.56182 601.156877,187.119584 601.46522,188.634076 C601.768154,190.110706 602.219851,191.565701 602.80949,192.953084 C603.382901,194.316127 604.099665,195.635899 604.930029,196.863719 C605.752278,198.080722 606.696243,199.222 607.734874,200.265918 C608.77621,201.304427 609.920327,202.245576 611.137473,203.070433 C612.368143,203.9007 613.68266,204.614675 615.045863,205.190723 C616.436115,205.780293 617.89128,206.229232 619.368084,206.529426 C620.882754,206.843142 622.440701,207 624.001352,207 C625.559299,207 627.117246,206.843142 628.631916,206.529426 C630.10872,206.229232 631.563885,205.780293 632.954137,205.190723 C634.31734,204.614675 635.631857,203.9007 636.859822,203.070433 C638.079673,202.245576 639.22379,201.304427 640.265126,200.265918 C641.303757,199.222 642.250426,198.080722 643.069971,196.863719 C643.900335,195.635899 644.617099,194.316127 645.19051,192.953084 C645.777445,191.565701 646.231846,190.110706 646.53478,188.634076 C646.843123,187.119584 647,185.56182 647,183.998648 C647,182.440884 646.843123,180.883121 646.53478,179.371333 L646.53478,179.371333 L646.53478,179.371333 Z"
                                                                    id="Dribbble"> </path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                                Continue with Dribbble
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal điền thông tin profile -->
    <div class="modal fade" id="completeProfileModal" tabindex="-1" aria-labelledby="completeProfileLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="completeProfileLabel">Hoàn thành thông tin tài khoản</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" :disabled="true"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">Số điện thoại</label>
                        <input type="tel" v-model="profileData.so_dien_thoai" class="form-control" placeholder="0123456789">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Ngày sinh</label>
                        <input type="date" v-model="profileData.ngay_sinh" class="form-control">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="updateProfile" :disabled="profileLoading">
                        <i v-if="profileLoading" class="fa-solid fa-spinner fa-spin me-2"></i>
                        Lưu thông tin
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { useToast } from 'vue-toastification';
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
            profileData: {
                so_dien_thoai: "",
                ngay_sinh: ""
            },
            profileLoading: false,
        };
    },
    setup() {
        const toast = useToast();
        return { toast };
    },
    mounted() {
        this.kiemTraDangNhap();
        this.loadRecaptcha();

        const url = new URL(window.location.href);
        const token = url.searchParams.get('token');
        const isFirstLogin = url.searchParams.get('is_first_login');
        const provider = url.searchParams.get('provider');

        let providerText = '';
        if (provider === 'github') providerText = 'GitHub';
        else if (provider === 'facebook') providerText = 'Facebook';
        else if (provider === 'google') providerText = 'Google';
        else if (provider === 'dribbble') providerText = 'Dribbble';

        if (url.searchParams.get('error') === 'email_exists') {
            this.toast && this.toast.error('Email này đã đăng nhập trước đó, vui lòng dùng phương thức cũ!');
            window.history.replaceState({}, document.title, window.location.pathname);
            return;
        }

        if (token) {
            localStorage.setItem("key_khach_hang", token);
            if (isFirstLogin === "1") {
                this.toast && this.toast.success(`Đăng ký bằng tài khoản${providerText ? ' ' + providerText : ''} thành công!`);
                // Redirect to onboarding only on first login
                this.$router.replace("/onboarding");
            } else {
                this.toast && this.toast.success(`Đăng nhập bằng tài khoản${providerText ? ' ' + providerText : ''} thành công!`);
                // Regular login, go to home
                this.$router.replace("/trang-chu");
            }
        }

        const savedEmail = localStorage.getItem("remember_email");
        if (savedEmail) {
            this.tai_Khoan.email = savedEmail;
            this.rememberMe = true;
        }
    },
    methods: {
        loginWithDribbble() {
            window.location.href = 'http://127.0.0.1:8000/api/auth/dribbble/redirect';
        },
        loginWithGoogle() {
            window.location.href = 'http://127.0.0.1:8000/api/auth/google/redirect';
        },
        loginWithFacebook() {
            window.location.href = 'http://127.0.0.1:8000/api/auth/facebook/redirect';
        },
        loginWithGithub() {
            window.location.href = 'http://127.0.0.1:8000/api/auth/github/redirect';
        },
        loadRecaptcha() {
            const script = document.createElement("script");
            script.src = "https://www.google.com/recaptcha/api.js";
            script.onerror = () => this.toast.error("Không thể tải Recaptcha. Vui lòng thử lại sau.");
            document.head.appendChild(script);
        },
        kiemTraDangNhap() {
            axios.get("http://127.0.0.1:8000/api/khach-hang/check-login", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("key_khach_hang")
                },
            })
                .then(res => {
                    if (res.data.status) this.$router.push("/trang-chu");
                })
                .catch(error => {
                    console.warn("Kiểm tra đăng nhập thất bại", error);
                });
        },

        dangNhap() {
            if (!this.tai_Khoan.email || !this.tai_Khoan.password) {
                this.toast.error("Vui lòng nhập email và mật khẩu!");
                return;
            }

            let code = grecaptcha.getResponse();
            if (!code) {
                this.toast.error("Bạn chưa chọn Recaptcha");
                return;
            }

            this.loading = true;
            this.tai_Khoan.code = code;

            axios.post("http://127.0.0.1:8000/api/khach-hang/dang-nhap", this.tai_Khoan)
                .then(res => {
                    if (res.data.status === 1) {
                        this.toast.success(res.data.message);
                        localStorage.setItem("key_khach_hang", res.data.key);

                        if (this.rememberMe) {
                            localStorage.setItem("remember_email", this.tai_Khoan.email);
                        } else {
                            localStorage.removeItem("remember_email");
                        }

                        // Kiểm tra lần đầu đăng nhập - nếu có is_first_login=1 thì redirect onboarding
                        const isFirstLogin = res.data.is_first_login;
                        if (isFirstLogin === 1 || isFirstLogin === "1") {
                            this.$router.push("/onboarding");
                        } else {
                            this.$router.push("/trang-chu");
                        }
                    } else {
                        this.toast.error(res.data.message);
                    }
                })
                .catch(() => {
                    this.toast.error("Lỗi kết nối, vui lòng thử lại!");
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        // async callbackFunction(response) {
        //     try {
        //         const res = await axios.post("http://127.0.0.1:8000/api/khach-hang/dang-nhap-google", {
        //             credential: response.credential,
        //         });
        //         if (res.data.status === 1) {
        //             this.toast.success(res.data.message);
        //             localStorage.setItem("key_khach_hang", res.data.key);
        //             this.$router.push("/trang-chu");
        //         } else {
        //             this.toast.error(res.data.message);
        //         }
        //     } catch (error) {
        //         console.error("Google Sign-In error:", error);
        //         this.toast.error("Đăng nhập Google thất bại");
        //     }
        // },

        checkProfileComplete() {
            const token = localStorage.getItem("key_khach_hang");
            axios.get("http://127.0.0.1:8000/api/khach-hang/check-profile-complete", {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then(res => {
                if (res.data.status && !res.data.is_complete) {
                    // Profile chưa hoàn thành, hiển thị modal
                    const modal = new window.bootstrap.Modal(document.getElementById('completeProfileModal'));
                    modal.show();
                } else {
                    // Profile đã hoàn thành, redirect
                    this.$router.replace("/trang-chu");
                }
            }).catch(error => {
                console.error("Lỗi khi check profile:", error);
                // Nếu lỗi, vẫn redirect (cho trường hợp endpoint chưa được tạo)
                this.$router.replace("/trang-chu");
            });
        },

        updateProfile() {
            if (!this.profileData.so_dien_thoai || !this.profileData.ngay_sinh) {
                this.toast.error("Vui lòng điền đầy đủ thông tin!");
                return;
            }

            this.profileLoading = true;
            const token = localStorage.getItem("key_khach_hang");
            
            axios.post("http://127.0.0.1:8000/api/khach-hang/update-profile-complete", {
                so_dien_thoai: this.profileData.so_dien_thoai,
                ngay_sinh: this.profileData.ngay_sinh
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then(res => {
                if (res.data.status) {
                    this.toast.success(res.data.message || "Cập nhật thông tin thành công!");
                    // Đóng modal và redirect
                    const modal = window.bootstrap.Modal.getInstance(document.getElementById('completeProfileModal'));
                    modal.hide();
                    setTimeout(() => {
                        this.$router.replace("/trang-chu");
                    }, 1000);
                } else {
                    this.toast.error(res.data.message || "Cập nhật thất bại!");
                }
            }).catch(error => {
                console.error("Lỗi cập nhật profile:", error);
                this.toast.error("Lỗi cập nhật thông tin!");
            }).finally(() => {
                this.profileLoading = false;
            });
        },
    },
};
</script>
<style></style>
