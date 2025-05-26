<template>
    <div class="card">
        <div class="card-header mt-2">
            <h4>{{ $t('course_list_title') }}</h4>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered table-hover">
                    <thead class="text-center align-middle">
                        <tr>
                            <th>{{ $t('course_table_index') }}</th>
                            <th>{{ $t('course_table_name') }}</th>
                            <th>{{ $t('course_table_date') }}</th>
                            <th>{{ $t('course_table_price') }}</th>
                            <th>{{ $t('course_table_image') }}</th>
                            <th>Tình trạng</th>
                            <th>{{ $t('refund') }}</th>
                        </tr>
                    </thead>
                    <tbody class="align-middle">
                        <tr v-for="(value, index) in list" :key="'paid-' + index">
                            <th class="text-center">{{ index + 1 }}</th>
                            <!-- Tên khóa học/gói -->
                            <td class="khoa-hoc-link"
                                :style="{ cursor: 'pointer', color: value.is_goi ? '#6366f1' : '' }"
                                @click="value.is_goi ? goToTatCaKhoaHoc() : goToKhoaHoc(value.id_khoa_hoc, value.slug || toSlug(value.ten_khoa_hoc))">
                                {{ value.ten_khoa_hoc }}
                            </td>
                            <td class="text-center">{{ formatdate(value.created_at) }}</td>
                            <td class="text-center">{{ formatVND(value.so_tien_mua) }}</td>
                            <!-- Ảnh khóa học/gói -->
                            <td class="text-center">
                                <img :src="value.hinh_anh" style="width: 150px; height: 100px; cursor:pointer"
                                    @click="value.is_goi ? goToTatCaKhoaHoc() : goToKhoaHoc(value.id_khoa_hoc, value.slug || toSlug(value.ten_khoa_hoc))">
                            </td>
                            <td class="text-center">
                                <span v-if="value.ngay_ket_thuc">
                                    <span v-if="new Date(value.ngay_ket_thuc) > new Date()" class="badge bg-success">Còn
                                        hạn</span>
                                    <span v-else class="badge bg-danger">Hết hạn</span>
                                </span>
                                <span v-else>Vĩnh viễn</span>
                            </td>
                            <td class="text-center">
                                <button v-if="value.is_goi" class="btn btn-warning btn-sm"
                                    @click.stop="hoanTienGoi(value)">
                                    Hoàn tiền gói
                                </button>
                                <button v-else class="btn btn-warning btn-sm"
                                    @click.stop="yeuCauHoanTien(value.id_khoa_hoc)">
                                    {{ $t('request_refund') }}
                                </button>
                            </td>
                        </tr>
                        <tr v-for="(khoaHoc, index) in list_khoa_hoc_dang_ky" :key="khoaHoc.id">
                            <th class="text-center">{{ index + 1 }}</th>
                            <td>{{ khoaHoc.title }}</td>
                            <td class="text-center">{{ formatdate(khoaHoc.created_at) }}</td>
                            <td class="text-center">
                                <span v-if="khoaHoc.is_free == 1" class="badge bg-success fs-5">{{ $t('free_badge')
                                    }}</span>
                            </td>
                            <td class="text-center">
                                <img :src="khoaHoc.image" style="width: 150px; height: 100px;">
                            </td>
                            <td class="text-center">Vĩnh viễn</td>
                            <td class="text-center">
                                <span v-if="khoaHoc.is_free == 1" class="text-muted">Không áp dụng</span>
                                <button v-else class="btn btn-warning btn-sm" @click="yeuCauHoanTien(khoaHoc.id)">
                                    {{ $t('request_refund') }}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
            list: [],
            list_khoa_hoc_dang_ky: [],
        }
    },
    setup() {
        const toast = useToast();
        return { toast };
    },
    mounted() {
        this.loadDanhSachKhoaHoc();
        this.loadDanhSachKhoaHocDaDangKy();
    },
    methods: {
        goToKhoaHoc(id, slug) {
            if (!id || !slug) {
                this.toast && this.toast.error('Không tìm thấy đường dẫn khóa học!');
                return;
            }
            this.$router.push({ name: 'KhoaHocChiTiet', params: { id_khoa_hoc: id, slug_khoa_hoc: slug } });
        },
        goToTatCaKhoaHoc() {
            this.$router.push({ path: '/tat-ca-khoa-hoc' });
        },
        toSlug(str) {
            return str
                .toLowerCase()
                .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // bỏ dấu tiếng Việt
                .replace(/[^a-z0-9]+/g, '-') // thay ký tự đặc biệt bằng -
                .replace(/^-+|-+$/g, ''); // bỏ - ở đầu/cuối
        },
        formatdate(thoi_gian) {
            const date = new Date(thoi_gian);
            return date.toLocaleString();
        },
        formatVND(number) {
            return new Intl.NumberFormat('vi-VI', {
                style: 'currency',
                currency: 'VND'
            }).format(number);
        },
        loadDanhSachKhoaHoc() {
            axios
                .get("http://127.0.0.1:8000/api/home-page/loai-khoa-hoc/danh-sach-khoa-hoc", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                    }
                })
                .then((res) => {
                    this.list = res.data.data;
                });
        },
        loadDanhSachKhoaHocDaDangKy() {
            axios
                .get("http://127.0.0.1:8000/api/home-page/loai-khoa-hoc-free/danh-sach-khoa-hoc", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                    }
                })
                .then((res) => {
                    this.list_khoa_hoc_dang_ky = res.data.data;
                })
        },

        yeuCauHoanTien(khoaHocId) {
            const REASON_OTHER_KEY = 'other_reason';
            const inputOptions = {
                not_satisfied: this.$t('reason_not_satisfied'),
                not_suitable: this.$t('reason_not_suitable'),
                technical: this.$t('reason_technical'),
                [REASON_OTHER_KEY]: this.$t('reason_other')
            };

            Swal.fire({
                title: `<span class="swal-title-custom">${this.$t('select_refund_reason')}</span>`,
                input: 'select',
                inputOptions,
                inputPlaceholder: this.$t('select_reason'),
                showCancelButton: true,
                confirmButtonText: this.$t('continue'),
                cancelButtonText: this.$t('cancel'),
                customClass: {
                    popup: 'swal-popup-custom',
                    confirmButton: 'swal-confirm-btn',
                    cancelButton: 'swal-cancel-btn',
                    input: 'swal-input-custom'
                },
                icon: 'question'
            }).then(({ value: lyDoKey }) => {
                if (!lyDoKey) return;

                let lyDoCuoi = inputOptions[lyDoKey];
                if (lyDoKey === REASON_OTHER_KEY) {
                    Swal.fire({
                        title: `<span class="swal-title-custom">${this.$t('enter_refund_reason')}</span>`,
                        input: 'text',
                        inputPlaceholder: this.$t('enter_your_reason'),
                        showCancelButton: true,
                        confirmButtonText: this.$t('send'),
                        cancelButtonText: this.$t('cancel'),
                        customClass: {
                            popup: 'swal-popup-custom',
                            confirmButton: 'swal-confirm-btn',
                            cancelButton: 'swal-cancel-btn',
                            input: 'swal-input-custom'
                        },
                        icon: 'edit'
                    }).then(({ value: lyDoKhac }) => {
                        if (!lyDoKhac) return;
                        lyDoCuoi = lyDoKhac;
                        // Gửi yêu cầu hoàn tiền với lý do khác
                        axios.post('http://127.0.0.1:8000/api/hoan-tien-khoa-hoc', {
                            id_khoa_hoc: khoaHocId,
                            ly_do: lyDoCuoi
                        }, {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                            }
                        }).then(res => {
                            this.toast && this.toast.success(res.data.message || this.$t('refund_request_sent'));
                            this.loadDanhSachKhoaHoc();
                        }).catch(err => {
                            this.toast && this.toast.error(err.response?.data?.message || this.$t('error_occurred'));
                        });
                    });
                } else {
                    // Gửi yêu cầu hoàn tiền với lý do đã chọn
                    axios.post('http://127.0.0.1:8000/api/hoan-tien-khoa-hoc', {
                        id_khoa_hoc: khoaHocId,
                        ly_do: lyDoCuoi
                    }, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                        }
                    }).then(res => {
                        this.toast && this.toast.success(res.data.message || this.$t('refund_request_sent'));
                        this.loadDanhSachKhoaHoc();
                    }).catch(err => {
                        this.toast && this.toast.error(err.response?.data?.message || this.$t('error_occurred'));
                    });
                }
            });
        },

        hoanTienGoi(goi) {
            const REASON_OTHER_KEY = 'other_reason';
            const inputOptions = {
                not_satisfied: this.$t('reason_not_satisfied'),
                not_suitable: this.$t('reason_not_suitable'),
                technical: this.$t('reason_technical'),
                [REASON_OTHER_KEY]: this.$t('reason_other')
            };

            // Bước 1: Chọn lý do
            Swal.fire({
                title: `<span class="swal-title-custom">Chọn lý do hoàn tiền gói</span>`,
                input: 'select',
                inputOptions,
                inputPlaceholder: 'Chọn lý do',
                showCancelButton: true,
                confirmButtonText: 'Tiếp tục',
                cancelButtonText: 'Hủy',
                customClass: {
                    popup: 'swal-popup-custom',
                    confirmButton: 'swal-confirm-btn',
                    cancelButton: 'swal-cancel-btn',
                    input: 'swal-input-custom'
                },
                icon: 'question'
            }).then(({ value: lyDoKey }) => {
                if (!lyDoKey) return;

                let lyDoCuoi = inputOptions[lyDoKey];
                // Nếu chọn lý do khác
                if (lyDoKey === REASON_OTHER_KEY) {
                    Swal.fire({
                        title: `<span class="swal-title-custom">Nhập lý do hoàn tiền</span>`,
                        input: 'text',
                        inputPlaceholder: 'Nhập lý do của bạn',
                        showCancelButton: true,
                        confirmButtonText: 'Gửi',
                        cancelButtonText: 'Hủy',
                        customClass: {
                            popup: 'swal-popup-custom',
                            confirmButton: 'swal-confirm-btn',
                            cancelButton: 'swal-cancel-btn',
                            input: 'swal-input-custom'
                        },
                        icon: 'edit'
                    }).then(({ value: lyDoKhac }) => {
                        if (!lyDoKhac) return;
                        lyDoCuoi = lyDoKhac;

                        // Bước 2: Xác nhận hoàn tiền
                        Swal.fire({
                            title: 'Xác nhận hoàn tiền gói?',
                            text: 'Bạn sẽ bị thu hồi quyền truy cập tất cả khóa học từ gói này.',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Hoàn tiền',
                            cancelButtonText: 'Hủy'
                        }).then((confirm) => {
                            if (!confirm.isConfirmed) return;
                            axios.post('http://127.0.0.1:8000/api/hoan-tien-goi', {
                                ly_do: lyDoCuoi
                            }, {
                                headers: {
                                    Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                                }
                            }).then(res => {
                                this.toast && this.toast.success(res.data.message || 'Hoàn tiền gói thành công!');
                                this.loadDanhSachKhoaHoc();
                            }).catch(err => {
                                this.toast && this.toast.error(err.response?.data?.message || 'Có lỗi xảy ra!');
                            });
                        });
                    });
                } else {
                    // Nếu chọn lý do có sẵn
                    Swal.fire({
                        title: 'Xác nhận hoàn tiền gói?',
                        text: 'Bạn sẽ bị thu hồi quyền truy cập tất cả khóa học từ gói này.',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Hoàn tiền',
                        cancelButtonText: 'Hủy'
                    }).then((confirm) => {
                        if (!confirm.isConfirmed) return;
                        axios.post('http://127.0.0.1:8000/api/hoan-tien-goi', {
                            ly_do: lyDoCuoi
                        }, {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                            }
                        }).then(res => {
                            this.toast && this.toast.success(res.data.message || 'Hoàn tiền gói thành công!');
                            this.loadDanhSachKhoaHoc();
                        }).catch(err => {
                            this.toast && this.toast.error(err.response?.data?.message || 'Có lỗi xảy ra!');
                        });
                    });
                }
            });
        },
    },
}
</script>

<style>
.swal-popup-custom {
    border-radius: 16px !important;
    padding: 32px 24px !important;
    background: #f8fafc !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.swal-title-custom {
    color: #1e293b;
    font-size: 1.25rem;
    font-weight: 600;
}

.swal-confirm-btn {
    background: #16a34a !important;
    color: #fff !important;
    border-radius: 8px !important;
    font-weight: 600;
    padding: 8px 24px;
}

.swal-cancel-btn {
    background: #e11d48 !important;
    color: #fff !important;
    border-radius: 8px !important;
    font-weight: 600;
    padding: 8px 24px;
}

.swal-input-custom {
    border-radius: 6px !important;
    border: 1px solid #cbd5e1 !important;
    padding: 8px 12px !important;
    font-size: 1rem !important;
}
</style>
