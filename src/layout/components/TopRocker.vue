<template>
    <div class="topbar d-flex align-items-center">
        <nav class="navbar navbar-expand">
            <div class="topbar-logo-header">
                <div class="">
                    <h4 class="logo-text">Rocker</h4>
                </div>
            </div>
            <div class="mobile-toggle-menu"><i class='bx bx-menu'></i></div>
            <div class="search-bar flex-grow-1">
                <div class="position-relative search-bar-box">
                    <input type="text" class="form-control search-control" placeholder="Tìm Kiếm?">
                    <span class="position-absolute top-50 search-show translate-middle-y"><i class='bx bx-search'></i></span>
                    <span class="position-absolute top-50 search-close translate-middle-y"><i class='bx bx-x'></i></span>
                </div>
            </div>
            <div class="top-menu ms-auto">
                <ul class="navbar-nav align-items-center">
                    
                </ul>
            </div>
            <div class="user-box dropdown">
                <a class="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://dzfullstack.com/assets/images/logo-img.png" class="user-img" alt="user avatar">
                    <div class="user-info ps-3">
                        <p class="user-name mb-0">{{ user.name }}</p>
                        <p class="designattion mb-0">{{ userRole }}</p>
                    </div>
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                        <router-link to="/admin/profile">
                            <a class="dropdown-item" href="/admin/profile"><i class="bx bx-user"></i><span>Profile</span></a>
                        </router-link>
                    </li>
                    <li><a v-on:click="logout()" class="dropdown-item" href="javascript:;"><i class='bx bx-log-out-circle'></i><span>Logout</span></a>
                    </li>
                    <li><a v-on:click="logoutAll()" class="dropdown-item" href="javascript:;"><i class='bx bx-log-out-circle'></i><span>Logout Tất Cả</span></a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from "sweetalert2";

export default {
    data() {
        return {
            user: {
                name: localStorage.getItem("name"),
                id_quyen: localStorage.getItem("id_quyen"),
            },
        }
    },
    computed: {
        userRole() {
            return this.user.id_quyen === '1' ? 'Admin' : 'Nhân Viên';
        }
    },
    methods: {
        logout() {
            axios
                .get('http://127.0.0.1:8000/api/admin/logout', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status === 1) {
                        localStorage.removeItem('key_admin');
                        localStorage.removeItem("name");
                        localStorage.removeItem("id_quyen");
                        Swal.fire({
                            title: "Thông báo!",
                            text: res.data.message,
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false
                        }).then(() => {
                            this.$router.push('/admin/dang-nhap');
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
                .get('http://127.0.0.1:8000/api/admin/logout-all', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status === 1) {
                        localStorage.removeItem('key_admin');
                        localStorage.removeItem("name");
                        localStorage.removeItem("id_quyen");
                        Swal.fire({
                            title: "Thông báo!",
                            text: res.data.message,
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false
                        }).then(() => {
                            this.$router.push('/admin/dang-nhap');
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
        }
    },
}
</script>

<style>
.search-bar {
    flex-grow: 1;
    display: flex;
}

.search-bar-box {
    flex-grow: 1;
    width: 100%;
}

</style>