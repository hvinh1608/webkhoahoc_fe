<template>
    <div class="row">
        <div class="col-lg-6">
            <div class="row">
                <div class="col-lg-12">
                    <h1>{{ chi_tiet_khoa_hoc_free.title }}</h1>
                    <span>{{ chi_tiet_khoa_hoc_free.description }}</span>
                </div>
                <hr class="mt-3 mb-3">
                <div class="col-lg-12">
                    <h4>Nội dung khóa học</h4>
                    <b>11</b> chương - <b>138</b> bài học - Thời lượng <b>10 giờ 29 phút</b>
                </div>
                <div class="col-lg-12 mt-3">
                    <div class="accordion" id="accordionExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                    <h6>Bài Học</h6>
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
                                data-bs-parent="#accordionExample" style="">
                                <div class="accordion-body">
                                    <template v-for="(value, index) in list_bai_hoc" :key="index">
                                        <div class="d-flex justify-content-between align-items-center"
                                            @click="playVideo(value)">
                                            <p>
                                                <i class="fa-solid fa-circle-play me-2" style="color: red;"></i>{{
                                                    value.tieu_de }}
                                            </p>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <iframe width="100%" height="515" style="border-radius: 20px;" v-bind:src="link_video" frameborder="0"
                allowfullscreen></iframe>
            <h4 class="text-danger mt-2 text-center">
                {{ chi_tiet_khoa_hoc_free.is_free == 1 ? 'Miễn phí' : formatVND(chi_tiet_khoa_hoc_free.is_free) }}
            </h4>

            <div class="d-flex justify-content-center">
                <button v-on:click="confirmDangKyKhoaHoc()" class="btn-register-free">
                    ĐĂNG KÝ HỌC
                </button>
            </div>
            <div class="d-flex justify-content-between mt-3">
                <p><i class="fa-solid fa-gauge-high"></i> Trình độ cơ bản</p>
                <p><i class="fa-solid fa-film"></i> Tổng số 138 bài học</p>
                <p><i class="fa-solid fa-clock"></i> Thời lượng 10 giờ 29 phút</p>
                <p><i class="fa-solid fa-battery-full"></i> Học mọi lúc, mọi nơi</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    props: ['id_khoa_hoc_free', 'slug'],
    data() {
        return {
            id_khoa_hoc_free: this.$route.params.id_khoa_hoc_free,
            chi_tiet_khoa_hoc_free: {},
            list_bai_hoc: [],
            link_video: "",
            isRegistered: false,
        }
    },
    mounted() {
        this.loadChiTietKhoaHoc()
    },
    methods: {
        playVideo(value) {
            if (!this.isRegistered) {
                this.$toast.error("Vui lòng ĐĂNG KÝ HỌC để xem bài học!");
                return;
            }
            this.link_video = value.link_bai_hoc;
        },

        formatVND(number) {
            return new Intl.NumberFormat('vi-VI', {
                style: 'currency',
                currency: 'VND'
            }).format(number,)
        },

        confirmDangKyKhoaHoc() {
            Swal.fire({
                title: 'Bạn có chắc chắn?',
                text: "Bạn có muốn đăng ký khóa học này không?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Đăng ký'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.dangKyKhoaHoc();
                }
            })
        },

        dangKyKhoaHoc() {
            if (!this.chi_tiet_khoa_hoc_free || !this.chi_tiet_khoa_hoc_free.id) {
                this.$toast.error("Không tìm thấy thông tin khóa học!");
                return;
            }

            var payload = {
                id_khoa_hoc: this.chi_tiet_khoa_hoc_free.id,
                title: this.chi_tiet_khoa_hoc_free.title,
            };

            axios.post(
                "http://127.0.0.1:8000/api/home-page/loai-khoa-hoc-free/dang-ky",
                payload, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                }
            }
            )
                .then((res) => {
                    if (res.data.status == 1) {
                        this.$toast.success(res.data.message);
                        this.isRegistered = true;
                        localStorage.setItem(`isRegistered_${this.id_khoa_hoc_free}`, 'true');
                        this.$router.push('/danh-sach-khoa-hoc');
                    } else if (res.data.status == 2) {
                        this.$toast.warning(res.data.message);
                        this.$router.push('/profile');
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        this.$toast.error(error.response.data.message || "Lỗi từ server!");
                    } else {
                        this.$toast.error("Vui lòng đăng nhập để đăng ký khóa học!");
                    }
                });
        },

        loadChiTietKhoaHoc() {
            axios
                .get("http://127.0.0.1:8000/api/home-page/khoa-hoc-free/chi-tiet/" + this.id_khoa_hoc_free)
                .then((res) => {
                    if (res.data.status == 1) {
                        this.chi_tiet_khoa_hoc_free = res.data.data;
                        this.list_bai_hoc = res.data.list_bai_hoc;
                        this.link_video = this.chi_tiet_khoa_hoc_free.link_gioi_thieu;
                        this.isRegistered = res.data.is_registered || localStorage.getItem(`isRegistered_${this.id_khoa_hoc_free}`) === 'true'; // Cập nhật trạng thái đăng ký từ API hoặc localStorage
                    } else {
                        this.$toast.error(res.data.message);
                        this.$router.push('/');
                    }
                });
        }
    },
}
</script>

<style></style>