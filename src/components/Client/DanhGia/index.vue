<template>
    <div class="danh-gia-container mt-4">
        <h2 class="text-center mb-4">Đánh giá khóa học</h2>
        <form @submit.prevent="submitDanhGia">
            <div class="mb-3">
                <label class="danh-gia-label">Họ Tên</label>
                <input disabled type="text" v-model="danhGia.ho_ten" class="danh-gia-input" required />
            </div>
            <div class="mb-3">
                <label for="avatar" class="form-label">Avatar</label>
                <input type="file" class="form-control danh-gia-input" id="avatar" @change="onFileChange">
            </div>
            <div class="mb-3">
                <label class="danh-gia-label">Chọn Khóa Học</label>
                <select v-model="danhGia.khoa_hoc" class="form-control" required>
                    <option value="" disabled>-- Chọn khóa học --</option>
                    <option v-for="khoa in list_khoa_hoc" :key="khoa.id" :value="khoa.id">
                        {{ khoa.title ? khoa.title : khoa.ten_khoa_hoc }} -
                        {{ khoa.loai === 'paid' ? 'Mất phí' : 'Miễn phí' }}
                    </option>
                </select>
            </div>
            <div class="mb-3">
                <label class="danh-gia-label">Chọn số sao</label>
                <div class="rating-stars">
                    <span v-for="star in 5" :key="star" @click="danhGia.rating = star" class="cursor-pointer">
                        <i
                            :class="star <= danhGia.rating ? 'fa-solid fa-star text-warning' : 'fa-regular fa-star text-secondary'"></i>
                    </span>
                    <span class="ms-2 text-secondary">({{ danhGia.rating }}/5)</span>
                </div>
            </div>
            <div class="mb-3">
                <label class="danh-gia-label">Vai Trò</label>
                <input type="text" v-model="danhGia.vai_tro" class="danh-gia-input" readonly />
            </div>
            <div class="mb-3">
                <label class="danh-gia-label">Đánh Giá</label>
                <textarea v-model="danhGia.noi_dung" class="danh-gia-input" required></textarea>
            </div>
            <button type="submit" class="danh-gia-btn" :disabled="isLoading">
                <span v-if="isLoading">Đang gửi...</span>
                <span v-else>Gửi đánh giá</span>
            </button>
        </form>
    </div>
</template>

<script>
import axios from "axios";

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
    mounted() {
        this.loadDataKHFR().then(() => this.loadDataLKH());
        this.loadUserInfo();
    },
    methods: {
        onFileChange(event) {
            this.danhGia.avatar = event.target.files[0];
        },
        async submitDanhGia() {
            if (!this.danhGia.khoa_hoc) {
                this.$toast.error("Vui lòng chọn khóa học!");
                return;
            }

            this.isLoading = true;
            try {
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

                const res = await axios.post("http://127.0.0.1:8000/api/danh-gia", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (res.data.status) {
                    this.$toast.success(res.data.message);
                    this.danhGia = {
                        ho_ten: "",
                        khoa_hoc: "",
                        vai_tro: "Học viên",
                        noi_dung: "",
                        rating: 0,
                        avatar: null
                    };
                } else {
                    this.$toast.error(res.data.message);
                }
            } catch (error) {
                this.$toast.error(error.response?.data?.message || "Lỗi không xác định!");
            } finally {
                this.isLoading = false;
            }
        },
        async loadDataKHFR() {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/admin/khoa-hoc-free/data", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_admin")
                    }
                });
                this.list_khoa_hoc = res.data.data.map(khoa => ({
                    ...khoa,
                    loai: "free"
                }));
            } catch (error) {
                console.error("Lỗi khi lấy danh sách khóa học miễn phí:", error);
            }
        },
        async loadDataLKH() {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/admin/loai-khoa-hoc/data", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_admin")
                    }
                });
                const khoaHocMatPhi = res.data.data1.map(khoa => ({
                    ...khoa,
                    loai: "paid"
                }));
                this.list_khoa_hoc = [...this.list_khoa_hoc, ...khoaHocMatPhi];
            } catch (error) {
                console.error("Lỗi khi lấy danh sách khóa học mất phí:", error);
            }
        },
        async loadUserInfo() {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/khach-hang/thong-tin", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                    }
                });
                if (res.data.status) {
                    this.danhGia.ho_ten = res.data.data.ho_va_ten; // Sử dụng đúng trường dữ liệu
                } else {
                    this.$toast.error(res.data.message);
                }
            } catch (error) {
                console.error("Lỗi khi lấy thông tin khách hàng:", error);
                this.$toast.error("Lỗi khi lấy thông tin khách hàng!");
            }
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