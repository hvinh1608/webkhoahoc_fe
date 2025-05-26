<template>
<div class="row">
    <div class="col-lg-3 col-md-12">
        <div class="card">
            <div class="card-header">
                <h5>Thêm Mới Bài Học</h5>
            </div>
            <div class="card-body">
                <label class="mb-2 mt-2">Chọn Khóa Học</label>
                <select v-model="create.id_khoa_hoc_free" class="form-control">
                    <option v-for="(value, index) in list_khoa_hoc" :key="index" :value="value.id">{{ value.title }}</option>
                </select>
                <label class="mb-2 mt-2">Tiêu Đề</label>
                <input v-model="create.tieu_de" type="text" class="form-control">
                <label class="mb-2 mt-2">Bài Học Số</label>
                <input v-model="create.bai_hoc_so" type="text" class="form-control">
                <label class="mb-2 mt-2">Link Bài Học</label>
                <input v-model="create.link_bai_hoc" type="text" class="form-control">
                <label class="mb-2 mt-2">Tình Trạng</label>
                <select v-model="create.tinh_trang" class="form-control">
                    <option value="1">Miễn Phí</option>
                    <option value="0">Tạm Ngưng</option>
                </select>
            </div>
            <div class="card-footer text-end">
                <button @click="themMoi()" class="btn btn-primary">Thêm Mới</button>
            </div>
        </div>
    </div>
    <div class="col-lg-9 col-md-12">
        <div class="card">
            <div class="card-header">
                <h5>Danh Sách Bài Học</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover">
                        <thead class="text-center align-middle">
                            <tr>
                                <th colspan="100%">
                                    <div class="input-group w-100">
                                        <input v-on:keyup.enter="timKiem()" v-model="search.noi_dung" type="text" class="form-control search-control border border-1 border-secondary" placeholder="Search...">
                                        <span class="position-absolute top-50 search-show translate-middle-y" style="left: 15px;"><i class="bx bx-search"></i></span>
                                        <button v-on:click="timKiem()" class="btn btn-outline-secondary" type="button">Tìm
                                            Kiếm</button>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th>#</th>
                                <th>Tên Loại Khóa Học</th>
                                <th>Bài Học</th>
                                <th>Tiêu Đề</th>
                                <th>Tình Trạng</th>
                                <th>Link Video</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(value, index) in list" :key="index">
                                <tr class="align-middle">
                                    <th class="text-center">{{ index + 1 }}</th>
                                    <td class="text-center">{{ value.title }}</td>
                                    <td class="text-center">{{ value.bai_hoc_so }}</td>
                                    <td>{{ value.tieu_de }}</td>
                                    <td class="text-center">
                                        <button v-on:click="doiTrangThai(value)" v-if="value.tinh_trang == 0" class="btn btn-danger" style="width: 100px;">Tạm Ngưng</button>
                                        <button v-on:click="doiTrangThai(value)" v-else class="btn btn-success" style="width: 100px;">Miễn Phí</button>
                                    </td>

                                    <td class="text-center">
                                        <iframe width="300" height="200" :src="value.link_bai_hoc" title="Video bài học"></iframe>
                                    </td>
                                    <td class="text-center">
                                        <button v-on:click="Object.assign(edit, value)" class="btn btn-primary me-1" style="width: 100px;" data-bs-toggle="modal" data-bs-target="#updateModal">Cập Nhật</button>
                                        <button v-on:click="Object.assign(del, value)" class="btn btn-danger" style="width: 100px;" data-bs-toggle="modal" data-bs-target="#deleteModal">Xóa</button>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- MOdal cập nhật -->
<div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Cập Nhật Bài Học</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <label class="mb-2 mt-2">Chọn Khóa Học</label>
                <select v-model="edit.id_khoa_hoc_free" class="form-control">
                    <option v-for="(value, index) in list_khoa_hoc" :key="index" :value="value.id">{{ value.title }}</option>
                </select>
                <label class="mb-2 mt-2">Tiêu Đề</label>
                <input v-model="edit.tieu_de" type="text" class="form-control">
                <label class="mb-2 mt-2">Bài Học Số</label>
                <input v-model="edit.bai_hoc_so" type="text" class="form-control">
                <label class="mb-2 mt-2">Link Bài Học</label>
                <input v-model="edit.link_bai_hoc" type="text" class="form-control">
                <label class="mb-2 mt-2">Tình Trạng</label>
                <select v-model="edit.tinh_trang" class="form-control">
                    <option value="1">Miễn Phí</option>
                    <option value="0">Tạm Ngưng</option>
                </select>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button v-on:click="capNhat()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Cập
                    Nhật</button>
            </div>
        </div>
    </div>
</div>
<!-- Modal xoá-->
<div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Xóa Bài Học</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="alert alert-danger border-0 bg-danger alert-dismissible fade show py-2">
                    <div class="d-flex align-items-center">
                        <div class="font-35 text-white"><i class="bx bxs-message-square-x"></i>
                        </div>
                        <div class="ms-1">
                            <h6 class="mb-1 text-white">Bạn chắc chắc xóa Bài Học <b>{{ del.tieu_de
                                }}</b>
                                này chứ
                                !!!</h6>
                            <div class="text-white text-nowrap"><b>LƯU Ý !!!</b> Điều này không thể khôi
                                phục
                                khi ấn xác nhận
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button v-on:click="xoa()" type="button" class="btn btn-danger" data-bs-dismiss="modal">Xóa</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            create: {
                id_khoa_hoc_free: "",
                tieu_de: "",
                bai_hoc_so: "",
                link_bai_hoc: "",
                tinh_trang: 1,
            },
            edit: {
                id_khoa_hoc_free: "",
                tieu_de: "",
                bai_hoc_so: "",
                link_bai_hoc: "",
                tinh_trang: 1,
            },
            del: {
                id: "",
                tieu_de: "",
            },
            search: {},
            list_khoa_hoc: [],
            list: [],
        }
    },
    mounted() {
        this.loadData();
        this.loadDataKHFR();
    },
    methods: {
        themMoi() {
            axios
                .post("http://127.0.0.1:8000/api/admin/bai-hoc-free/create", this.create, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_admin")
                    }
                })
                .then(res => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadData();
                        this.resetCreateForm();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch(err => {
                    const errorMessages = Object.values(err.response.data.errors);
                    errorMessages.forEach(error => {
                        this.$toast.error(error[0]);
                    });
                });
        },
        capNhat() {
            axios
                .post("http://127.0.0.1:8000/api/admin/bai-hoc-free/update", this.edit, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.loadData();
                        this.$toast.success(res.data.message);
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                })
        },
        xoa() {
            axios
                .post("http://127.0.0.1:8000/api/admin/bai-hoc-free/delete", this.del, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.loadData();
                        this.$toast.success(res.data.message);
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                })
        },
        doiTrangThai(value) {
            axios
                .post("http://127.0.0.1:8000/api/admin/bai-hoc-free/change-status", value, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.loadData();
                        this.$toast.success(res.data.message);
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                })
        },
        timKiem() {
            axios
                .post("http://127.0.0.1:8000/api/admin/bai-hoc-free/tim-kiem", this.search, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_admin")
                    }
                })
                .then((res) => {
                    this.list = res.data.data
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                })
        },
        loadData() {
            axios
                .get("http://127.0.0.1:8000/api/admin/bai-hoc-free/data", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_admin")
                    }
                })
                .then(res => {
                    this.list = res.data.data;
                });
        },
        loadDataKHFR() {
            axios
                .get("http://127.0.0.1:8000/api/admin/khoa-hoc-free/data", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_admin")
                    }
                })
                .then(res => {
                    this.list_khoa_hoc = res.data.data;
                })
        }

    }
}
</script>
