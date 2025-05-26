<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <ul class="nav nav-tabs nav-primary" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" data-bs-toggle="tab" href="#primaryhome" role="tab"
                                aria-selected="true">
                                <div class="d-flex align-items-center">
                                    <div class="tab-icon"><i class="fa-solid fa-user font-18 me-1"></i>
                                    </div>
                                    <div class="tab-title">{{ $t('profile') }}</div>
                                </div>
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-bs-toggle="tab" href="#primarycontact" role="tab"
                                aria-selected="false" tabindex="-1">
                                <div class="d-flex align-items-center">
                                    <div class="tab-icon"><i class="fa-solid fa-lock font-18 me-1"></i>
                                    </div>
                                    <div class="tab-title">{{ $t('change_password_tab') }}</div>
                                </div>
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-bs-toggle="tab" href="#naptienTK" role="tab" aria-selected="false"
                                tabindex="-1">
                                <div class="d-flex align-items-center">
                                    <div class="tab-icon me-1"><i class="fa-solid fa-money-check-dollar"></i>
                                    </div>
                                    <div class="tab-title">{{ $t('recharge_tab') }}</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <div class="tab-content py-3">
                        <div class="tab-pane fade show active" id="primaryhome" role="tabpanel">
                            <div class="row">
                                <div class="col-lg-4 d-flex">
                                    <div class="card flex-fill">
                                        <div class="card-body">
                                            <div class="d-flex flex-column align-items-center text-center">
                                                <img :src="getAvatarUrl(thong_tin.avatar)"
                                                    style="width: 140px; height: 140px; cursor: pointer;" alt="Avatar"
                                                    class="rounded-circle p-1 bg-primary" @click="triggerAvatarInput">
                                                <input ref="avatarInput" type="file" @change="onAvatarChange"
                                                    accept="image/*" class="form-control mt-2" style="display: none;">
                                                <div class="mt-3">
                                                    <h4>{{ thong_tin.ho_va_ten }}</h4>
                                                    <p class="text-secondary mb-1">{{ thong_tin.email }}</p>
                                                    <p class="text-muted font-size-sm">{{ thong_tin.ngay_sinh }}</p>
                                                    <p>{{ $t('balance') }}: {{ formatVND(thong_tin.so_du) }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-8 d-flex">
                                    <div class="card flex-fill">
                                        <div class="card-body">
                                            <div class="row mb-3">
                                                <div class="col-lg-3">
                                                    <h6 class="mb-0">{{ $t('full_name') }}</h6>
                                                </div>
                                                <div class="col-lg-9 text-secondary">
                                                    <input type="text" v-model="thong_tin.ho_va_ten"
                                                        class="form-control" :placeholder="$t('full_name')">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-lg-3">
                                                    <h6 class="mb-0">{{ $t('email') }}</h6>
                                                </div>
                                                <div class="col-lg-9 text-secondary">
                                                    <input disabled v-model="thong_tin.email" type="text"
                                                        class="form-control" :placeholder="$t('email')">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-lg-3">
                                                    <h6 class="mb-0">{{ $t('phone') }}</h6>
                                                </div>
                                                <div class="col-lg-9 text-secondary">
                                                    <input v-model="thong_tin.so_dien_thoai" type="text"
                                                        class="form-control" :placeholder="$t('phone')">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-lg-3">
                                                    <h6 class="mb-0">{{ $t('birthday') }}</h6>
                                                </div>
                                                <div class="col-lg-9 text-secondary">
                                                    <input v-model="thong_tin.ngay_sinh" type="date"
                                                        class="form-control" :placeholder="$t('birthday')">
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-3"></div>
                                                <div class="col-lg-9 text-secondary">
                                                    <button type="button" class="button-thay-doi"
                                                        @click="thayDoiThongTin()">{{ $t('save') }}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="primarycontact" role="tabpanel">
                            <div class="col">
                                <h4>{{ $t('change_password') }}</h4>
                            </div>
                            <div class="col">{{ $t('password_manage') }}</div>
                            <hr>
                            <div class="row mb-2">
                                <div class="col-lg-2">
                                    <label>{{ $t('old_password') }}</label>
                                </div>
                                <div class="col-lg-3">
                                    <input v-model="doi_mat_khau.old_password" type="password"
                                        :placeholder="$t('old_password')" class="form-control">
                                </div>
                            </div>

                            <div class="row mb-2">
                                <div class="col-lg-2">
                                    <label>{{ $t('new_password') }}</label>
                                </div>
                                <div class="col-lg-3">
                                    <input v-model="doi_mat_khau.new_password" type="password"
                                        :placeholder="$t('new_password')" class="form-control">
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col-lg-2">
                                    <label>{{ $t('re_password') }}</label>
                                </div>
                                <div class="col-lg-3">
                                    <input v-model="doi_mat_khau.re_password" type="password"
                                        :placeholder="$t('re_password')" class="form-control">
                                </div>
                            </div>
                            <button class="button-thay-doi" @click="doiMatKhau()">{{ $t('save') }}</button>
                        </div>
                        <div class="tab-pane fade" id="naptienTK" role="tabpanel">
                            <div class="col">
                                <h4>{{ $t('recharge_title') }}</h4>
                            </div>
                            <div class="col">{{ $t('recharge_history') }}</div>
                            <hr>
                            <hr>
                            <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <div class="card">
                                        <div class="card-body">
                                            <label class="mb-2">{{ $t('enter_amount') }}</label>
                                            <input v-model="so_tien_nap" type="text" class="form-control">
                                            <hr>
                                            <div class="row">
                                                <div class="col-lg-12 text-end">
                                                    <button v-on:click="xacNhanNapTien()" class="button-nap-tien"
                                                        data-bs-toggle="modal" data-bs-target="#xacNhanNapTienModal">
                                                        {{ $t('recharge') }}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div v-if="napTienStatus === 'waiting'"
                                        class="alert alert-info d-flex align-items-center gap-2">
                                        <i class="fa-solid fa-spinner fa-spin"></i>
                                        <span>Đang gửi yêu cầu nạp tiền...</span>
                                    </div>
                                    <div v-else-if="napTienStatus === 'pending'"
                                        class="alert alert-warning d-flex align-items-center gap-3 flex-wrap">
                                        <div>
                                            <i class="fa-solid fa-qrcode fa-2x"></i>
                                        </div>
                                        <div>
                                            <div class="fw-bold mb-1">Vui lòng quét mã QR để thanh toán</div>
                                            <div class="small text-muted mb-1">Sử dụng app ngân hàng để quét mã QR bên
                                                cạnh.</div>
                                            <div class="small text-danger">Mã QR sẽ hết hạn sau <b>{{ formattedCountdown
                                                    }}</b></div>
                                        </div>
                                        <div>
                                            <img v-if="link_qr" :src="link_qr" alt="QR"
                                                style="height: 300px; width: 300px; border-radius: 8px; border: 1px solid #eee;">
                                        </div>
                                        <div class="w-100 mt-2">
                                            <button class="btn btn-danger" @click="huyNapTien">
                                                <i class="fa-solid fa-xmark"></i> Hủy nạp
                                            </button>
                                        </div>
                                    </div>
                                    <div v-else-if="napTienStatus === 'expired'"
                                        class="alert alert-danger d-flex align-items-center gap-2">
                                        <i class="fa-solid fa-clock"></i>
                                        <span>Mã QR đã hết hạn, vui lòng tạo lại yêu cầu nạp tiền.</span>
                                    </div>
                                    <div v-else-if="napTienStatus === 'fail'"
                                        class="alert alert-danger d-flex align-items-center gap-2">
                                        <i class="fa-solid fa-circle-xmark"></i>
                                        <span>Nạp tiền thất bại, vui lòng thử lại!</span>
                                    </div>
                                    <div v-else-if="napTienStatus === 'success'"
                                        class="alert alert-success d-flex align-items-center gap-2">
                                        <i class="fa-solid fa-circle-check"></i>
                                        <span>Nạp tiền thành công!</span>
                                    </div>
                                    <div v-else>
                                        <!-- Không có trạng thái -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal nạp tiền -->
    <div class="modal fade" id="xacNhanNapTienModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">{{ $t('recharge_confirm') }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                    <div class="alert alert-success" role="alert">{{ $t('scan_qr') }}</div>
                                    <img v-if="qrVisible" :src="link_qr" class="img-fluid">
                                    <div v-if="qrVisible" class="alert alert-danger" role="alert">
                                        {{ $t('qr_expire') }} {{ formattedCountdown }}
                                    </div>
                                    <div v-else class="alert alert-warning" role="alert">
                                        {{ $t('qr_expired') }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('close') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
    data() {
        return {
            so_tien_nap: 0,
            link_qr: '',
            thong_tin: {},
            doi_mat_khau: {},
            qrVisible: true,
            countdown: 300,
            countdownInterval: null,
            napTienStatus: "",
            napTienCheckInterval: null,
        }
    },
    setup() {
        const toast = useToast();
        return { toast };
    },
    mounted() {
        this.layThongTinKhachHang();
    },
    computed: {
        formattedCountdown() {
            const minutes = Math.floor(this.countdown / 60);
            const seconds = this.countdown % 60;
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    },
    methods: {
        huyNapTien() {
            // Dừng countdown và polling
            if (this.countdownInterval) {
                clearInterval(this.countdownInterval);
                this.countdownInterval = null;
            }
            if (this.napTienCheckInterval) {
                clearInterval(this.napTienCheckInterval);
                this.napTienCheckInterval = null;
            }
            this.napTienStatus = "";
            this.link_qr = "";
            this.qrVisible = false;
            this.countdown = 300;
        },
        pollNapTienStatus(ma_giao_dich) {
            this.napTienCheckInterval = setInterval(() => {
                axios.get("http://127.0.0.1:8000/api/khach-hang/check-trang-thai-nap-tien", {
                    params: { hash: ma_giao_dich },
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                    }
                }).then(res => {
                    if (res.data.status === "success") {
                        clearInterval(this.napTienCheckInterval);
                        this.napTienStatus = "success";
                        this.layThongTinKhachHang(); // Cập nhật số dư ngay
                        this.toast.success("Nạp tiền thành công!");
                    }
                });
            }, 5000); // Kiểm tra mỗi 5 giây
        },
        triggerAvatarInput() {
            this.$refs.avatarInput.click();
        },
        getAvatarUrl(avatar) {
            if (!avatar) return 'https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/09/19/465/avatar-trang-1.jpg';
            return `http://127.0.0.1:8000/storage/avatars/${avatar}`;
        },
        onAvatarChange(e) {
            const file = e.target.files[0];
            if (!file) return;
            const formData = new FormData();
            formData.append('avatar', file);
            axios.post('http://127.0.0.1:8000/api/khach-hang/thay-doi-avatar', formData, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang"),
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                if (res.data.status) {
                    this.toast.success(res.data.message || "Đổi avatar thành công!");
                    localStorage.setItem("avatar_kh", res.data.avatar);
                    window.dispatchEvent(new Event("avatar-updated"));
                    this.layThongTinKhachHang();
                } else {
                    this.toast.error(res.data.message || "Đổi avatar thất bại!");
                }
            });
        },
        doiMatKhau() {
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/doi-mat-khau-profile", this.doi_mat_khau, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.toast.success(res.data.message);
                        this.layThongTinKhachHang();

                    } else {
                        this.toast.error(res.data.message);
                        // this.$router.push('/');
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.toast.error(v[0]);
                    });
                })
        },
        layThongTinKhachHang() {
            axios
                .get("http://127.0.0.1:8000/api/khach-hang/lay-thong-tin-profile", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.thong_tin = res.data.thong_tin;
                    } else {
                        this.toast.error(res.data.message);
                        this.$router.push('/');
                    }
                })
        },
        thayDoiThongTin() {
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/thay-doi-thong-tin-profile", this.thong_tin, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.toast.success(res.data.message);
                        this.layThongTinKhachHang();

                    } else {
                        this.toast.error(res.data.message);
                        this.$router.push('/');
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.toast.error(v[0]);
                    });
                })
        },
        xacNhanNapTien() {
            var payload = {
                'so_tien_nap': this.so_tien_nap
            }
            this.napTienStatus = "waiting"; // Đang chờ thanh toán
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/xac-nhan-nap-tien", payload, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.toast.success(res.data.message)
                        var noi_dung_chuyen_tien = res.data.noi_dung_chuyen_tien;
                        this.link_qr = "https://img.vietqr.io/image/MB-56700112233-compact2.png?amount=" +
                            this.so_tien_nap +
                            "&addInfo=" + encodeURIComponent(noi_dung_chuyen_tien) +
                            "&accountName=" + encodeURIComponent("Trần Ngô Hồng Vinh");

                        this.qrVisible = true;
                        this.countdown = 300;
                        this.napTienStatus = "pending"; // Đang chờ thanh toán

                        const ma_giao_dich = res.data.noi_dung_chuyen_tien; // hoặc res.data.hash nếu BE trả về
                        this.pollNapTienStatus(ma_giao_dich);

                        // Xóa interval cũ nếu tồn tại
                        if (this.countdownInterval) {
                            clearInterval(this.countdownInterval);
                        }

                        // Tạo interval mới
                        this.countdownInterval = setInterval(() => {
                            this.countdown--;
                            if (this.countdown === 0) {
                                clearInterval(this.countdownInterval);
                                clearInterval(this.napTienCheckInterval);
                                this.qrVisible = false;
                                this.napTienStatus = "expired"; // Hết hạn
                            }
                        }, 1000);
                    } else {
                        this.napTienStatus = "fail"; // Thất bại
                    }
                })
                .catch(() => {
                    this.napTienStatus = "fail"; // Thất bại
                });
        },
        formatVND(number) {
            return new Intl.NumberFormat('vi-VI', {
                style: 'currency',
                currency: 'VND'
            }).format(number,)
        },
    },
}
</script>

<style></style>
