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
                                data-bs-parent="#accordionExample">
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
            <h4 class="text-danger mt-2 text-center">
                {{ isRegistered ? formatVND(0) : formatVND(chi_tiet_khoa_hoc.gia_ban) }}
            </h4>
            <div class="d-flex justify-content-center">
                <button class="btn-register" v-on:click="confirmMuaKhoaHoc()" v-if="!isRegistered">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
                        <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
                    </svg>
                    ĐĂNG KÝ HỌC
                </button>
                <button class="btn-register" v-if="isRegistered" disabled>
                    ĐÃ ĐĂNG KÝ
                </button>
            </div>

            <div class="d-flex justify-content-between mt-3">
                <p><i class="fa-solid fa-gauge-high"></i> Trình độ cơ bản</p>
                <p><i class="fa-solid fa-film"></i> Tổng số 138 bài học</p>
                <p><i class="fa-solid fa-clock"></i> Thời lượng 10 giờ 29 phút</p>
                <p><i class="fa-solid fa-battery-full"></i> Học mọi lúc, mọi nơi</p>
            </div>
        </div>

        <div class="col-lg-12">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h4 class="text-body mb-0">Bình luận khóa học</h4>
            </div>

            <!-- Form bình luận -->
            <div class="card mb-4">
                <div class="card-body">
                    <textarea class="form-control mb-2" v-model="noi_dung_binh_luan" rows="3"
                        placeholder="Viết bình luận của bạn..."></textarea>
                    <button class="btn btn-primary" @click="guiBinhLuan()">Gửi bình luận</button>
                </div>
            </div>

            <!-- Khung cuộn danh sách bình luận -->
            <div class="card mb-4" style="max-height: 500px; overflow-y: auto;" ref="khungBinhLuan">
                <div class="card-body">
                    <div v-for="bl in ds_binh_luan" :key="bl.id" class="mb-3 border-bottom pb-3">
                        <div class="d-flex align-items-start mb-3 border-bottom pb-3">
                            <img class="rounded-circle shadow-1-strong me-3"
                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(20).webp" width="40" height="40"
                                style="object-fit: cover;" />
                            <div class="w-100">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <h6 class="text-primary fw-bold mb-0">
                                        {{ bl.ten_nguoi_dung }}
                                        <span class="text-body ms-2">{{ bl.noi_dung }}</span>
                                    </h6>
                                    <p class="mb-0 text-muted small">Vừa xong</p>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <p class="small mb-0 text-muted">
                                        <a href="javascript:void(0)"
                                            @click="id_binh_luan_dang_tra_loi = (id_binh_luan_dang_tra_loi === bl.id ? null : bl.id)">Reply</a>
                                    </p>
                                </div>

                                <!-- Chỉ hiện textarea nếu người dùng đang bấm reply vào đúng bình luận đó -->
                                <div v-if="id_binh_luan_dang_tra_loi === bl.id" class="mt-3">
                                    <textarea class="form-control mb-2" rows="2" placeholder="Nhập nội dung phản hồi..."
                                        v-model="noi_dung_tra_loi[bl.id]"></textarea>
                                    <button class="btn btn-sm btn-primary" @click="guiTraLoi(bl.id)">Gửi trả
                                        lời</button>

                                </div>

                                <!-- Hiển thị các trả lời (nếu có) -->
                                <div v-for="tl in bl.ds_tra_loi" :key="tl.id" class="p-3 bg-light rounded border mb-2">
                                    <strong>
                                        {{ tl.ten_nguoi_dung }}
                                        <span v-if="tl.vai_tro" class="text-muted small">({{ tl.vai_tro }})</span>:
                                    </strong>
                                    {{ tl.noi_dung }}

                                    <!-- Nút reply cho trả lời con -->
                                    <div>
                                        <a href="javascript:void(0)" class="small text-primary"
                                            @click="id_tra_loi_dang_tra_loi = (id_tra_loi_dang_tra_loi === tl.id ? null : tl.id)">
                                            Reply
                                        </a>
                                    </div>

                                    <!-- Khung nhập trả lời nếu đang active -->
                                    <div v-if="id_tra_loi_dang_tra_loi === tl.id" class="mt-2">
                                        <textarea class="form-control mb-2" rows="2"
                                            placeholder="Nhập nội dung phản hồi..."
                                            v-model="noi_dung_tra_loi_con[tl.id]"></textarea>
                                        <button class="btn btn-sm btn-secondary" @click="guiTraLoiCon(bl.id, tl.id)">Gửi
                                            trả
                                            lời</button>
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
import Swal from 'sweetalert2';
export default {
    props: ['id_khoa_hoc', 'slug_khoa_hoc'],
    data() {
        return {
            id_khoa_hoc: this.$route.params.id_khoa_hoc,
            chi_tiet_khoa_hoc: {},
            list_bai_hoc: [],
            link_video: "",
            check_mua_khoa_hoc: false,
            isRegistered: false,
            ds_binh_luan: [],
            noi_dung_binh_luan: "",
            id_binh_luan_dang_tra_loi: null,
            noi_dung_tra_loi: {},
            id_tra_loi_dang_tra_loi: null,
            noi_dung_tra_loi_con: {},
        }
    },
    mounted() {
        this.loadChiTietKhoaHoc();
        this.checkMuaKhoaHoc();
        this.loadBinhLuan();
    },
    methods: {
        loadBinhLuan() {
            axios
                .get(`http://127.0.0.1:8000/api/binh-luan/${this.id_khoa_hoc}`)
                .then((res) => {
                    this.ds_binh_luan = res.data.data;
                    this.$nextTick(() => {
                        const khung = this.$refs.khungBinhLuan;
                        if (khung) {
                            khung.scrollTop = khung.scrollHeight;
                        }
                    });
                });
        },

        guiBinhLuan() {
            if (!this.noi_dung_binh_luan.trim()) {
                this.$toast.warning("Vui lòng nhập nội dung bình luận");
                return;
            }

            const payload = {
                id_khoa_hoc: this.id_khoa_hoc,
                noi_dung: this.noi_dung_binh_luan
            };

            axios
                .post("http://127.0.0.1:8000/api/binh-luan/create", payload, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.$toast.success("Đã gửi bình luận");
                        this.noi_dung_binh_luan = "";
                        this.loadBinhLuan();
                    }
                });
        },
        guiTraLoi(id_binh_luan_cha) {
            const noi_dung = this.noi_dung_tra_loi[id_binh_luan_cha];

            if (!noi_dung || !noi_dung.trim()) {
                this.$toast.warning("Vui lòng nhập nội dung trả lời");
                return;
            }

            const payload = {
                id_khoa_hoc: this.id_khoa_hoc,
                binh_luan_id: id_binh_luan_cha,
                noi_dung: noi_dung
            };


            axios.post("http://127.0.0.1:8000/api/tra-loi-binh-luan", payload, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                }
            })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.$toast.success("Đã gửi trả lời");
                        this.noi_dung_tra_loi[id_binh_luan_cha] = "";
                        this.id_binh_luan_dang_tra_loi = null;
                        this.loadBinhLuan();
                    }
                });
        },

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
                    if (this.check_mua_khoa_hoc === 1) {
                        this.isRegistered = true;
                    }
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
                        this.isRegistered = true;
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
            return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(number);
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
                        this.$router.push('/');
                    }
                });
        }
    },
}
</script>

<style></style>
