<template>
    <div class="row">
        <div class="col-lg-6">
            <div class="row">
                <div class="col-lg-12">
                    <h1>{{ chi_tiet_khoa_hoc.ten_khoa_hoc }}</h1>
                    <span>{{ chi_tiet_khoa_hoc.mo_ta_ngan }}</span>
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
                                        <template v-if="check_mua_khoa_hoc === 1">
                                            <div class="d-flex justify-content-between align-items-center"
                                                v-on:click="link_video = value.link_bai_hoc">
                                                <p><i class="fa-solid fa-circle-play me-2" style="color: red;"></i>{{
                                                    value.tieu_de }}</p>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <p><i class="fa-solid fa-circle-play me-2" style="color: red;"></i>{{
                                                    value.tieu_de }}</p>
                                            </div>
                                        </template>
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
            <h4 class="text-danger mt-2 text-center">{{ formatVND(chi_tiet_khoa_hoc.gia_ban) }}</h4>
            <div class="d-flex justify-content-center">
                <button class="btn-register" v-on:click="confirmMuaKhoaHoc()">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
                        <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
                    </svg>
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
    props: ['id_khoa_hoc', 'slug_khoa_hoc'],
    data() {
        return {
            id_khoa_hoc: this.$route.params.id_khoa_hoc,
            chi_tiet_khoa_hoc: {},
            list_bai_hoc: [],
            link_video: "",
            check_mua_khoa_hoc: false
        }
    },
    mounted() {
        this.loadChiTietKhoaHoc();
        this.checkMuaKhoaHoc();
    },
    methods: {
        checkMuaKhoaHoc() {
            var payload = {
                id_khoa_hoc: this.id_khoa_hoc
            };
            axios
                .post("http://127.0.0.1:8000/api/check-mua-khoa-hoc", payload, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                    }
                })
                .then((res) => {
                    this.check_mua_khoa_hoc = res.data.status;
                }).catch((res) => {
                    this.$toast.error('Vui lòng đăng nhập để mua khóa học');
                })
        },
        confirmMuaKhoaHoc() {
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
                    this.muaKhoaHoc();
                }
            })
        },
        muaKhoaHoc() {
            var payload = {
                id_khoa_hoc: this.id_khoa_hoc,
                so_tien_mua: this.chi_tiet_khoa_hoc.gia_ban,
                ten_khoa_hoc: this.chi_tiet_khoa_hoc.ten_khoa_hoc
            }
            axios
                .post("http://127.0.0.1:8000/api/home-page/mua-khoa-hoc/create", payload, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.$toast.success(res.data.message)
                        this.$router.push('/danh-sach-khoa-hoc')
                    }
                    else if (res.data.status == 2) {
                        this.$toast.warning(res.data.message);
                        this.$router.push('/profile')
                    }
                    else {
                        this.$toast.error(res.data.message);
                    }
                }).catch((res) => {
                    this.$toast.error('Vui lòng đăng nhập để mua khóa học');
                })
        },
        formatVND(number) {
            return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(number,)
        },
        loadChiTietKhoaHoc() {
            axios
                .get("http://127.0.0.1:8000/api/home-page/loai-khoa-hoc/chi-tiet/" + this.id_khoa_hoc)
                .then((res) => {
                    if (res.data.status == 1) {
                        this.chi_tiet_khoa_hoc = res.data.data;
                        this.list_bai_hoc = res.data.list_bai_hoc;
                        this.link_video = this.chi_tiet_khoa_hoc.link_gioi_thieu;
                    }
                    else {
                        this.$toast.error(res.data.message);
                        this.$toast.push('/');
                    }
                });
        }
    },
}
</script>

<style></style>