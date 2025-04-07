<template>
    <div class="overlay toggle-icon"></div>
    <footer class="text-center text-lg-start text-white" style="background-color: #1c2331">
        <!-- Section: Social media -->
        <section class="d-flex justify-content-between p-4" style="background-color: gray">
            <!-- Left -->
            <div class="me-5">
            </div>
            <!-- Left -->

            <!-- Right -->
            <div>
                <ul class="social">
                    <li class="social-item">
                        <a class="social-link" href="https://www.facebook.com/anhyeuemgatnhiu">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"
                                    fill="currentColor"></path>
                            </svg>
                        </a>
                    </li>
                    <li class="social-item">
                        <a class="social-link" href="/">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M8 3C9.10457 3 10 3.89543 10 5V8H16C17.1046 8 18 8.89543 18 10C18 11.1046 17.1046 12 16 12H10V14C10 15.6569 11.3431 17 13 17H16C17.1046 17 18 17.8954 18 19C18 20.1046 17.1046 21 16 21H13C9.13401 21 6 17.866 6 14V5C6 3.89543 6.89543 3 8 3Z"
                                    fill="currentColor"></path>
                            </svg>
                        </a>
                    </li>
                    <li class="social-item">
                        <a class="social-link" href="/">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6 12C6 15.3137 8.68629 18 12 18C14.6124 18 16.8349 16.3304 17.6586 14H12V10H21.8047V14H21.8C20.8734 18.5645 16.8379 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.445 2 18.4831 3.742 20.2815 6.39318L17.0039 8.68815C15.9296 7.06812 14.0895 6 12 6C8.68629 6 6 8.68629 6 12Z"
                                    fill="currentColor"></path>
                            </svg>
                        </a>
                    </li>
                    <li class="social-item">
                        <a class="social-link" href="https://www.instagram.com/h_zinhh/">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7ZM9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12Z"
                                    fill="currentColor"></path>
                                <path
                                    d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                                    fill="currentColor"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M5 1C2.79086 1 1 2.79086 1 5V19C1 21.2091 2.79086 23 5 23H19C21.2091 23 23 21.2091 23 19V5C23 2.79086 21.2091 1 19 1H5ZM19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                                    fill="currentColor"></path>
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
            <!-- Right -->
        </section>

        <section class="">
            <div class="container text-center text-md-start mt-5">
                <div class="row mt-3">
                    <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                        <h6 class="text-uppercase fw-bold" style="color: orange;">DZFullStack</h6>
                        <hr class=" mt-0 d-inline-block mx-auto"
                            style="width: 60px; background-color: #7c4dff; height: 2px" /><br>
                        <div class="text-center mb-2">
                            <img src="https://dzfullstack.com/assets/images/logo-img.png" class="img-fluid"
                                style="width: 100px; height: auto;" alt="">
                        </div>
                        <p>
                            Ở đây, Cung cấp các khóa học chất lượng, giúp người học nâng cao kỹ năng và kiến thức một
                            cách
                            hiệu quả. Đăng ký ngay để nhận thông tin mới nhất về các khóa học và chương trình khuyến
                            mãi.
                        </p>
                        <form class="subscribe-form" @submit.prevent="dangKyNhanThongTin">
                            <input v-model="email" type="email" placeholder="example@mail.com"
                                class="subscribe-input" />
                            <button class="subscribe-btn text-nowrap" :disabled="isLoading">
                                <span v-if="isLoading" class="spinner"></span>
                                <span v-else>Đăng Ký</span>
                            </button>
                        </form>
                    </div>
                    <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                        <h6 class="text-uppercase fw-bold" style="color: orange;">Products</h6>
                        <hr class="mb-4 mt-0 d-inline-block mx-auto"
                            style="width: 60px; background-color: #7c4dff; height: 2px" />
                        <p>
                            <a href="#!" class="text-white">Home</a>
                        </p>
                        <p>
                            <a href="#!" class="text-white">About</a>
                        </p>
                        <p>
                            <a href="#!" class="text-white">Product</a>
                        </p>
                        <p>
                            <a href="#!" class="text-white">Contact</a>
                        </p>
                    </div>
                    <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                        <h6 class="text-uppercase fw-bold" style="color: orange;">Useful links</h6>
                        <hr class="mb-4 mt-0 d-inline-block mx-auto"
                            style="width: 60px; background-color: #7c4dff; height: 2px" />
                        <p>
                            <a href="#!" class="text-white">Facebook</a>
                        </p>
                        <p>
                            <a href="#!" class="text-white">Instagram</a>
                        </p>
                        <p>
                            <a href="#!" class="text-white">Email</a>
                        </p>
                        <p>
                            <a href="#!" class="text-white">Twitter</a>
                        </p>
                    </div>
                    <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                        <h6 class="text-uppercase fw-bold" style="color: orange;">Contact</h6>
                        <hr class="mb-4 mt-0 d-inline-block mx-auto"
                            style="width: 60px; background-color: #7c4dff; height: 2px" />
                        <p><i class="fas fa-home mr-3"></i>53 Nguyễn Hữu Thận, Thanh Khê, Đà Nẵng</p>
                        <p><i class="fas fa-envelope mr-3"></i> hvinh.job@gmail.com</p>
                        <p><i class="fas fa-phone mr-3"></i> + 0335446435</p>
                        <p><i class="fas fa-print mr-3"></i> + 0376659652</p>
                    </div>
                </div>
            </div>
        </section>
        <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2)">
            © 2024 Copyright:
            <a class="text-white" href="/">DZFullStack Team</a>
        </div>
    </footer>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            isLoading: false, 
        };
    },
    methods: {
        dangKyNhanThongTin() {
            if (!this.email) {
                this.$toast.error('Vui lòng nhập email!');
                return;
            }

            this.isLoading = true; 

            axios
                .post('http://127.0.0.1:8000/api/nhan-thong-tin', { email: this.email })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.email = '';
                    } else {
                        this.$toast.error('Không thể đăng ký nhận thông tin.');
                    }
                })
                .catch((err) => {
                    if (err.response && err.response.status === 422) {
                        const errors = Object.values(err.response.data.errors);
                        this.$toast.error(errors[0][0]);
                    } else {
                        this.$toast.error('Có lỗi xảy ra.');
                    }
                })
                .finally(() => {
                    this.isLoading = false; 
                });
        },
    },
};
</script>
<style scoped>
.subscribe-form {
    --main-focus: #f09b2d;
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: #fff;
    --main-color: #323232;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    display: flex;
    flex-direction: row;
    width: 250px;
    height: 35px;
    border-radius: 5px;
    box-shadow: 4px 4px var(--main-color);
}

.subscribe-input {
    width: 100%;
    height: 100%;
    padding: 5px 10px;
    border: 2px solid var(--main-color);
    border-right: 0;
    border-radius: 5px 0 0 5px;
    font-size: 15px;
    font-weight: 500;
    color: var(--font-color);
    background: var(--bg-color);
}

.subscribe-btn {
    width: 100px;
    height: 100%;
    border: 2px solid var(--main-focus);
    border-radius: 0 5px 5px 0;
    background-color: var(--main-focus);
    font-size: 15px;
    letter-spacing: 1px;
    font-weight: 500;
    color: var(--bg-color);
    cursor: pointer;
}

.subscribe-input:focus {
    outline: none;
    border: 2px solid var(--main-focus);
    border-right: 0;
}

.spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid transparent;
    border-top: 2px solid white;
    /* Màu của vòng quay */
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>