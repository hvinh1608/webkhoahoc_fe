<template>
    <div class="danh-gia-container mt-4">
        <h2 class="text-center mb-4">{{ $t('review_course') }}</h2>
        <form @submit.prevent="submitDanhGia">
            <div class="mb-3">
                <label class="danh-gia-label">{{ $t('full_name') }}</label>
                <input disabled type="text" v-model="danhGia.ho_ten" class="danh-gia-input" required />
            </div>
            <div class="mb-3">
                <label for="avatar" class="form-label">{{ $t('avatar') }}</label>
                <input type="file" class="form-control danh-gia-input" id="avatar" @change="onFileChange">
            </div>
            <div class="mb-3">
                <label class="danh-gia-label">{{ $t('select_course') }}</label>
                <select v-model="danhGia.khoa_hoc" class="form-control" required>
                    <option value="" disabled>{{ $t('select_course_placeholder') }}</option>
                    <option v-for="(value, index) in list_khoa_hoc" :key="index" :value="value.id">
                        {{ value.title ? value.title : value.ten_khoa_hoc }} -
                        {{ value.loai === 'paid' ? $t('paid') : $t('free') }}
                    </option>
                </select>
            </div>
            <div class="mb-3">
                <label class="danh-gia-label">{{ $t('select_rating') }}</label>
                <div class="rating-stars">
                    <span v-for="star in 5" :key="star" @click="danhGia.rating = star" class="cursor-pointer">
                        <i
                            :class="star <= danhGia.rating ? 'fa-solid fa-star text-warning' : 'fa-regular fa-star text-secondary'"></i>
                    </span>
                    <span class="ms-2 text-secondary">({{ danhGia.rating }}/5)</span>
                </div>
            </div>
            <div class="mb-3">
                <label class="danh-gia-label">{{ $t('role') }}</label>
                <input type="text" v-model="danhGia.vai_tro" class="danh-gia-input" readonly />
            </div>
            <div class="mb-3">
                <label class="danh-gia-label">{{ $t('review') }}</label>
                <textarea v-model="danhGia.noi_dung" class="danh-gia-input" required
                    :placeholder="$t('review_placeholder')"></textarea>
            </div>
            <button type="submit" class="danh-gia-btn" :disabled="isLoading">
                <span v-if="isLoading">{{ $t('sending') }}</span>
                <span v-else>{{ $t('send_review') }}</span>
            </button>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import { useToast } from 'vue-toastification';

export default {
    data() {
        return {
            danhGia: {
                ho_ten: "",
                khoa_hoc: "",
                vai_tro: "Học viên",
                noi_dung: "",
                rating: 0,
                avatar: null
            },
            list_khoa_hoc: [],
            isLoading: false
        };
    },
    setup() {
        const toast = useToast();
        return { toast };
    },
    mounted() {
        this.loadUserInfo();
        this.loadDataLKH();
    },
    methods: {
        onFileChange(event) {
            this.danhGia.avatar = event.target.files[0];
        },
        submitDanhGia() {
            if (!this.danhGia.khoa_hoc) {
                this.toast.error("Vui lòng chọn khóa học!");
                return;
            }

            this.isLoading = true;
            const khoaHoc = this.list_khoa_hoc.find(kh => kh.id === this.danhGia.khoa_hoc);
            const formData = new FormData();
            formData.append('ho_ten', this.danhGia.ho_ten);
            formData.append('khoa_hoc', khoaHoc ? (khoaHoc.title ? khoaHoc.title : khoaHoc.ten_khoa_hoc) : "");
            formData.append('vai_tro', this.danhGia.vai_tro);
            formData.append('noi_dung', this.danhGia.noi_dung);
            formData.append('rating', this.danhGia.rating);
            if (this.danhGia.avatar) {
                formData.append('avatar', this.danhGia.avatar);
            }

            axios.post("http://127.0.0.1:8000/api/danh-gia", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    if (res.data.status) {
                        this.toast.success(res.data.message);
                        this.danhGia = {
                            ho_ten: "",
                            khoa_hoc: "",
                            vai_tro: "Học viên",
                            noi_dung: "",
                            rating: 0,
                            avatar: null
                        };
                    } else {
                        this.toast.error(res.data.message);
                    }
                })
                .catch(error => {
                    this.toast.error(error.response?.data?.message || "Lỗi không xác định!");
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        loadDataLKH() {
            axios.get("http://127.0.0.1:8000/api/khach-hang/loai-khoa-hoc/data")
                .then(res => {
                    const data = Array.isArray(res.data.data) ? res.data.data : [];
                    const data_2 = Array.isArray(res.data.data_2) ? res.data.data_2 : [];

                    this.list_khoa_hoc = [
                        ...data.map(khoa => ({
                            ...khoa,
                            loai: "paid", // Giả sử loại này có phí
                        })),
                        ...data_2.map(khoa => ({
                            ...khoa,
                            loai: "free",
                        }))
                    ];
                })
                .catch(error => {
                    console.error("Lỗi khi lấy danh sách khóa học mất phí:", error);
                });
        },
        loadUserInfo() {
            axios.get("http://127.0.0.1:8000/api/khach-hang/thong-tin", {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                }
            })
                .then(res => {
                    if (res.data.status) {
                        this.danhGia.ho_ten = res.data.data.ho_va_ten;
                    } else {
                        this.toast.error(res.data.message);
                    }
                })
                .catch(error => {
                    console.error("Lỗi khi lấy thông tin khách hàng:", error);
                    this.toast.error("Lỗi khi lấy thông tin khách hàng!");
                });
        },
        resetForm() {
            this.danhGia = {
                ho_ten: "",
                khoa_hoc: "",
                vai_tro: "Học viên",
                noi_dung: "",
                rating: 0,
                avatar: null
            };
        }
    }
};  
</script>

<style scoped>
@import '@/assets/css/commonStyles.css';
</style>