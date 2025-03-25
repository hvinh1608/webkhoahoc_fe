<template>
    <div class="topbar d-flex align-items-center">
        <nav class="navbar navbar-expand">
            <router-link to="/">
                <div class="topbar-logo-header d-flex align-items-center">
                    <img src="https://dzfullstack.com/assets/images/logo-img.png" class="logo-icon" style="width: 70px;"
                        alt="logo icon">
                    <h4 class="mt-3 ms-2">DZFULLSTACK</h4>
                </div>
            </router-link>
            <div class="mobile-toggle-menu"><i class='bx bx-menu'></i></div>
            <div class="search-bar flex-grow-1">
                <div class="position-relative search-bar-box input-group w-100">
                    <input v-model="query" @input="debouncedSearch" type="text"
                        class="form-control search-control border border-1 border-secondary radius-30"
                        placeholder="Search..." autocomplete="off">
                    <span class="position-absolute top-50 search-show translate-middle-y"><i
                            class='bx bx-search'></i></span>
                    <span v-if="query" class="position-absolute top-50 search-close translate-middle-y"
                        @click="clearSearch"><i class='bx bx-x'></i></span>
                    <button class="btn btn-outline-secondary radius-30" type="button" @click="search">Tìm Kiếm</button>
                </div>
                <!-- Kết quả tìm kiếm -->
                <div v-if="searchResults && searchResults.khoaHocs.length" class="search-results">
                    <ul>
                        <!-- Khóa học có phí -->
                        <li v-for="(khoaHoc, index) in searchResults.khoaHocs" :key="'paid-' + index">
                            <router-link :to="`/chi-tiet-khoa-hoc/${khoaHoc.id}-${khoaHoc.slug_khoa_hoc}`"
                                class="d-flex align-items-center" @click="clearSearch">
                                <img :src="khoaHoc.hinh_anh" alt="Hình ảnh khóa học" class="search-image me-2">
                                <div>
                                    <h6 class="mb-0">{{ khoaHoc.ten_khoa_hoc }}</h6>
                                    <p class="text-muted small mb-0">{{ formatVND(khoaHoc.gia_ban) }} (Giá gốc: {{
                                        formatVND(khoaHoc.gia_goc) }})</p>
                                </div>
                            </router-link>
                        </li>
                        <!-- Khóa học miễn phí -->
                        <li v-for="(khoaHocFrees, index) in searchResults.khoaHocFrees" :key="'free-' + index">
                            <router-link :to="`/chi-tiet-khoa-hoc-free/${khoaHocFrees.id}-${khoaHocFrees.slug}`"
                                class="d-flex align-items-center" @click="clearSearch">
                                <img :src="khoaHocFrees.image" alt="Hình ảnh khóa học" class="search-image me-2">
                                <div>
                                    <h6 class="mb-0">{{ khoaHocFrees.title }}</h6>
                                    <p class="text-muted small mb-0 text-success">Miễn phí</p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div v-else-if="query && !searchResults.khoaHocs.length" class="search-results">
                    <p class="text-center mt-2">Không tìm thấy kết quả</p>
                </div>
            </div>
            <div class="user-box dropdown">
                <template v-if="user.check">
                    <a class="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret" href="#"
                        role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://dzfullstack.com/assets/images/logo-img.png" class="user-img"
                            alt="user avatar">
                        <div class="user-info ps-3">
                            <p class="user-name mt-1 mb-0">{{ user.name }}</p>
                            <p class="designattion mb-0">{{ user.email }}</p>
                            <p class="balance mt-1 mb-0"> Số Dư : {{ formatVND(user.balance) }}</p>
                        </div>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li>
                            <router-link to="/profile">
                                <a class="dropdown-item" href="/profile"><i
                                        class="bx bx-user"></i><span>Profile</span></a>
                            </router-link>
                        </li>
                        <li><a v-on:click="logout()" class="dropdown-item" href="javascript:;"><i
                                    class='bx bx-log-out-circle'></i><span>Đăng Xuất</span></a>
                        </li>
                        <li><a v-on:click="logoutAll()" class="dropdown-item" href="javascript:;"><i
                                    class='bx bx-log-out-circle'></i><span>Đăng Xuất Tất Cả</span></a>
                        </li>
                    </ul>
                </template>
                <template v-else>
                    <router-link to="/khach-hang/dang-nhap">
                        <button class="uiverse-login-btn me-2 ms-4">
                            Đăng Nhập
                        </button>
                    </router-link>

                    <router-link to="/khach-hang/dang-ky">
                        <button type="button" class="uiverse-register-btn">
                            Đăng Ký
                        </button>
                    </router-link>

                </template>
            </div>
        </nav>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from "sweetalert2";
import _ from 'lodash';

export default {
    data() {
        return {
            user: {},
            query: "",
            searchResults: null,
        }
    },
    mounted() {
        this.user = {
            name: localStorage.getItem("name_kh"),
            email: localStorage.getItem("email_kh"),
            balance: localStorage.getItem("so_du"),
            check: localStorage.getItem("check_kh")
        };
        this.fetchBalance();
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleClickOutside);
    },
    methods: {
        async search() {
            if (!this.query.trim()) {
                this.searchResults = null;
                return;
            }

            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/search?query=${this.query}`);
                this.searchResults = res.data;
            } catch (error) {
                console.error("Lỗi tìm kiếm:", error);
                Swal.fire({
                    title: "Lỗi!",
                    text: "Đã xảy ra lỗi khi tìm kiếm",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        },

        debouncedSearch: _.debounce(function () {
            this.search();
        }, 300),

        clearSearch() {
            this.query = "";
            this.searchResults = null;
        },

        fetchBalance() {
            axios
                .post('http://127.0.0.1:8000/api/khach-hang/lay-so-du', {}, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status === 1) {
                        this.user.balance = res.data.so_du;
                        localStorage.setItem("so_du", res.data.so_du);
                    }
                })
        },
        logout() {
            axios
                .get('http://127.0.0.1:8000/api/khach-hang/logout', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status === 1) {
                        // Xóa toàn bộ trạng thái đăng ký khóa học
                        Object.keys(localStorage).forEach((key) => {
                            if (key.startsWith("isRegistered_")) {
                                localStorage.removeItem(key);
                            }
                        });

                        // Xóa thông tin tài khoản
                        localStorage.removeItem('key_khach_hang');
                        localStorage.removeItem("name_kh");
                        localStorage.removeItem("email_kh");
                        localStorage.removeItem("so_du");
                        localStorage.removeItem("check_kh");
                        localStorage.removeItem("chatHistory");
                        localStorage.removeItem("cart");


                        Swal.fire({
                            title: "Thông báo!",
                            text: res.data.message,
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false
                        }).then(() => {
                            window.location.href = '/khach-hang/dang-nhap';
                        });

                    } else {
                        Swal.fire({
                            title: "Lỗi!",
                            text: res.data.message,
                            icon: "error",
                            confirmButtonText: "OK"
                        });
                    }
                })
                .catch(() => {
                    Swal.fire({
                        title: "Lỗi!",
                        text: "Đã xảy ra lỗi khi đăng xuất",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                });
        },

        logoutAll() {
            axios
                .get('http://127.0.0.1:8000/api/khach-hang/logout-all', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status === 1) {
                        // Xóa toàn bộ trạng thái đăng ký khóa học
                        Object.keys(localStorage).forEach((key) => {
                            if (key.startsWith("isRegistered_")) {
                                localStorage.removeItem(key);
                            }
                        });

                        // Xóa thông tin tài khoản
                        localStorage.removeItem('key_khach_hang');
                        localStorage.removeItem("name_kh");
                        localStorage.removeItem("email_kh");
                        localStorage.removeItem("so_du");
                        localStorage.removeItem("check_kh");
                        localStorage.removeItem("chatHistory");
                        localStorage.removeItem("cart");


                        Swal.fire({
                            title: "Thông báo!",
                            text: res.data.message,
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false
                        }).then(() => {
                            window.location.href = '/khach-hang/dang-nhap';
                        });

                    } else {
                        Swal.fire({
                            title: "Lỗi!",
                            text: res.data.message,
                            icon: "error",
                            confirmButtonText: "OK"
                        });
                    }
                })
                .catch(() => {
                    Swal.fire({
                        title: "Lỗi!",
                        text: "Đã xảy ra lỗi khi đăng xuất tất cả thiết bị",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                });
        },
        formatVND(number) {
            return new Intl.NumberFormat('vi-VI', {
                style: 'currency',
                currency: 'VND'
            }).format(number,)
        },
        handleClickOutside(event) {
            const searchBar = this.$el.querySelector('.search-bar');
            if (searchBar && !searchBar.contains(event.target)) {
                this.clearSearch();
            }
        }
    },
}
</script>

<style>
.search-results {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    width: 100%;
    max-width: 70%;
    max-height: 300px;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.search-results ul {
    list-style: none;
    padding: 10px;
    margin: 0;
}

.search-results li {
    padding: 10px;
    border-bottom: 1px solid #f1f1f1;
}

.search-results li:last-child {
    border-bottom: none;
}

.search-results li:hover {
    background: #f8f9fa;
}

.search-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 5px;
}


</style>
