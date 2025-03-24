<template>
<div class="card">
    <div class="card-header mt-2">
        <h4>Danh Sách Khóa Học</h4>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead class="text-center align-middle">
                    <tr>
                        <th>#</th>
                        <th>Tên Khóa Học</th>
                        <th>Ngày Đăng Ký</th>
                        <th>Giá Tiền</th>
                        <th>Hình Ảnh</th>
                    </tr>
                </thead>
                <tbody class="align-middle">
                    <tr v-for="(value, index) in list" :key="'paid-' + index">
                        <th class="text-center">{{ index + 1 }}</th>
                        <td>{{ value.ten_khoa_hoc }}</td>
                        <td class="text-center">{{ formatdate(value.created_at) }}</td>
                        <td class="text-center">{{ formatVND(value.so_tien_mua) }}</td>
                        <td class="text-center">
                            <img :src="value.hinh_anh" style="width: 200px;">
                        </td>
                    </tr>
                    <tr v-for="(khoaHoc, index) in list_khoa_hoc_dang_ky" :key="khoaHoc.id">
                        <th class="text-center">{{ index + 1 }}</th>
                        <td>{{ khoaHoc.title }}</td>
                        <td class="text-center">{{ formatdate(khoaHoc.created_at) }}</td>
                        <td class="text-center">
                            <span v-if="khoaHoc.is_free = 1" class="badge bg-success fs-5">Miễn phí</span>
                        </td>

                        <td class="text-center">
                            <img :src="khoaHoc.image" style="width: 200px;">
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

export default {
    data() {
        return {
            list: [],
            list_khoa_hoc_dang_ky: [],
        }
    },
    mounted() {
        this.loadDanhSachKhoaHoc();
        this.loadDanhSachKhoaHocDaDangKy();
    },
    methods: {
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
        }

    },
}
</script>

<style>

</style>
