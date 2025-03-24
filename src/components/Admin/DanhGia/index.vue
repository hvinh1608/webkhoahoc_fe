<template>
    <div class="col d-flex">
        <div class="card shadow flex-fill radius-30">
            <div class="card-body text-center">
                <div class="p-4 radius-15">
                    <h2 class="mb-4">Đánh giá từ học viên</h2>
                    <div class="table-responsive">
                        <table class="table table-hover table-bordered text-center align-middle shadow-sm">
                            <thead class="table-dark">
                                <tr>
                                    <th>Avatar</th>
                                    <th>Khách hàng</th>
                                    <th>Khóa học</th>
                                    <th>Số Sao</th>
                                    <th>Vai Trò</th>
                                    <th>Đánh giá</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(danhGia, index) in danhGias" :key="index">
                                    <td>
                                        <img v-if="danhGia.avatar" :src="getAvatarUrl(danhGia.avatar)" alt="Avatar" class="img-thumbnail rounded-circle avatar">
                                        <span v-else>Không có</span>
                                    </td>
                                    <td>{{ danhGia.ho_ten }}</td>
                                    <td class="text-start">{{ danhGia.khoa_hoc }}</td>
                                    <td>
                                        <span v-for="star in 5" :key="star">
                                            <i :class="star <= danhGia.rating ? 'fa-solid fa-star text-warning' : 'fa-regular fa-star text-secondary'"></i>
                                        </span>
                                    </td>
                                    <td><span class="text-warning">{{ danhGia.vai_tro }}</span></td>
                                    <td class="text-start">{{ danhGia.noi_dung }}</td>
                                    <td>
                                        <button @click="xoaDanhGia(danhGia.id)" class="btn btn-danger btn-sm">
                                            <i class="fas fa-trash"></i> Xóa
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
    data() {
        return {
            danhGias: [],
        };
    },
    async mounted() {
        this.loadDanhGias();
    },
    methods: {
        async loadDanhGias() {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/danh-gia");
                this.danhGias = res.data;
            } catch (error) {
                this.$toast.error("Lỗi khi tải danh sách đánh giá!");
            }
        },
        getAvatarUrl(avatar) {
            return `http://127.0.0.1:8000/storage/${avatar}`;
        },
        async xoaDanhGia(id) {
            Swal.fire({
                title: "Xác nhận xóa?",
                text: "Bạn có chắc chắn muốn xóa đánh giá này?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Xóa ngay",
                cancelButtonText: "Hủy",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await axios.delete(`http://127.0.0.1:8000/api/danh-gia/${id}`);
                        this.danhGias = this.danhGias.filter((dg) => dg.id !== id);
                        Swal.fire("Đã xóa!", "Đánh giá đã được xóa.", "success");
                    } catch (error) {
                        Swal.fire("Lỗi!", "Không thể xóa đánh giá. Vui lòng thử lại!", "error");
                    }
                }
            });
        },
    },
};
</script>

<style scoped>
@import '@/assets/css/commonStyles.css';

.avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
}
</style>
