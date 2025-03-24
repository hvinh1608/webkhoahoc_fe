<template>
<div class="row">
    <div class="col-lg-4 col-md-12">
        <div class="card">
            <div class="card-header">
                <h5 class="mt-2">Thêm Mới Khóa Học Miễn Phí</h5>
            </div>
            <div class="card-body">
                <label class="mb-2">Tiêu Đề Khóa Học</label>
                <input v-model="create.title" type="text" name="title" class="form-control mb-2" required />

                <label class="mb-2">Slug Khóa Học</label>
                <input v-model="create.slug" type="text" name="slug" class="form-control mb-2" required />

                <label class="mb-2">Hình Ảnh</label>
                <input v-model="create.image" type="url" name="image" class="form-control mb-2" required />

                <label class="mb-2">Mô Tả Ngắn</label>
                <textarea v-model="create.description" name="description" class="form-control mb-2"></textarea>

                <label class="mb-2">Số Học Viên</label>
                <input v-model.number="create.students_count" type="number" name="students_count" class="form-control mb-2" min="0" />

                <label class="mb-2">Số Bài Học</label>
                <input v-model.number="create.lesson_count" type="number" name="lesson_count" class="form-control mb-2" min="0" />

                <label class="mb-2">Thời Lượng</label>
                <input v-model="create.duration" type="text" name="duration" class="form-control mb-2" />

                <label class="mb-2">Trạng Thái Miễn Phí</label>
                <select v-model="create.is_free" name="is_free" class="form-control mb-2">
                    <option value="1">Miễn Phí</option>
                    <option value="0">Trả Phí</option>
                </select>
            </div>
            <div class="card-footer text-end">
                <button v-on:click="themMoi()" type="button" class="btn btn-primary">Thêm Mới</button>

            </div>
        </div>
    </div>
    <div class="col-lg-8 col-md-12">
        <div class="card">
            <div class="card-header">
                <h5 class="mt-2">Danh Sách Khóa Học</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th colspan="100%">
                                    <div class="input-group w-100">
                                        <input v-on:keyup.enter="timKiem()" v-model="search.noi_dung" type="text" class="form-control search-control border border-1 border-secondary" placeholder="Search..." />
                                        <span class="position-absolute top-50 search-show translate-middle-y" style="left: 15px"><i class="bx bx-search"></i></span>
                                        <button v-on:click="timKiem()" class="btn btn-outline-secondary" type="button">
                                            Tìm Kiếm
                                        </button>
                                    </div>
                                </th>
                            </tr>
                            <tr class="text-center">
                                <th>STT</th>
                                <th>Tiêu Đề</th>
                                <th>Slug</th>
                                <th>Hình Ảnh</th>
                                <th>Mô Tả</th>
                                <th>Số Học Viên</th>
                                <th>Số Bài Học</th>
                                <th>Thời Lượng</th>
                                <th>Trạng Thái</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(v , k) in list" :key="k">
                                <tr class="text-center align-middle">
                                    <td>{{ k + 1 }}</td>
                                    <td class="text-start">{{ v.title }}</td>
                                    <td class="text-start">{{ v.slug }}</td>
                                    <td><img :src="v.image" alt="Hình Ảnh" width="50" /></td>
                                    <td class="text-center align-middle">
                                        <button v-on:click="showDescription(v.description)" class="btn" data-bs-toggle="modal" data-bs-target="#moTaModal">
                                            <i class="fa-solid fa-circle-info"></i>
                                        </button>
                                    </td>
                                    <td>{{ v.students_count }}</td>
                                    <td>{{ v.lesson_count }}</td>
                                    <td>{{ v.duration }}</td>
                                    <td><button v-on:click="doiTrangThai(v)" v-if="v.is_free == 1" class="btn btn-success">Miễn Phí</button>
                                        <button v-on:click="doiTrangThai(v)" v-else class="btn btn-secondary">Thu Phí</button>
                                    </td>
                                    <td>
                                        <!-- MODAL CẬP NHẬT -->
                                        <button v-on:click="Object.assign(edit, v)" class="btn btn-info me-2" data-bs-toggle="modal" data-bs-target="#capNhat">Cập Nhật</button>
                                        <button v-on:click="Object.assign(del, v)" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#XOA">Xóa</button>
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
<!-- Modal Cập Nhật -->
<div class="modal fade" id="capNhat" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Cập Nhật Khóa Học</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <label class="mb-2">Tiêu Đề Khóa Học</label>
                <input v-model="edit.title" type="text" name="title" class="form-control mb-2" required />

                <label class="mb-2">Slug Khóa Học</label>
                <input v-model="edit.slug" type="text" name="slug" class="form-control mb-2" required />

                <label class="mb-2">Hình Ảnh</label>
                <input v-model="edit.image" type="url" name="image" class="form-control mb-2" required />

                <label class="mb-2">Mô Tả Ngắn</label>
                <textarea v-model="edit.description" name="description" class="form-control mb-2"></textarea>

                <label class="mb-2">Số Học Viên</label>
                <input v-model.number="edit.students_count" type="number" name="students_count" class="form-control mb-2" min="0" />

                <label class="mb-2">Số Bài Học</label>
                <input v-model.number="edit.lesson_count" type="number" name="lesson_count" class="form-control mb-2" min="0" />

                <label class="mb-2">Thời Lượng</label>
                <input v-model="edit.duration" type="text" name="duration" class="form-control mb-2" />

                <label class="mb-2">Trạng Thái Miễn Phí</label>
                <select v-model="edit.is_free" name="is_free" class="form-control mb-2">
                    <option value="1">Miễn Phí</option>
                    <option value="0">Trả Phí</option>
                </select>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button v-on:click="sua()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Cập Nhật</button>
            </div>
        </div>
    </div>
</div>
<!-- Modal Xóa -->
<div class="modal fade" id="XOA" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa Khóa Học</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="alert alert-danger border-0 bg-danger alert-dismissible fade show py-2">
                    <div class="d-flex align-items-center">
                        <div class="font-35 text-white">
                            <i class="bx bxs-message-square-x"></i>
                        </div>
                        <div class="ms-1">
                            <h6 class="mb-1 text-white">
                                Bạn chắc chắc xóa Loại Khóa Học
                                <b style="color: yellow;">{{ del.title }}</b> này chứ !!!
                            </h6>
                            <div class="text-white text-nowrap">
                                <b>LƯU Ý !!!</b> Điều này không thể khôi phục khi ấn xác nhận
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
<!-- Modal Mô tả -->
<div class="modal fade" id="moTaModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Mô Tả Khóa Học</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <span v-html="description"></span>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
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
                title: "",
                slug: "",
                image: "",
                description: "",
                students_count: "",
                lesson_count: "",
                duration: "",
                is_free: ""
            },
            edit: {
                title: "",
                slug: "",
                image: "",
                description: "",
                students_count: "",
                lesson_count: "",
                duration: "",
                is_free: ""
            },
            del: {
                title: "",
            },
            search: {
                noi_dung: "",
            },
            description: "",
            list: [],
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        showDescription(description) {
            this.description = description;
        },
        timKiem() {
            axios
                .post(
                    "http://127.0.0.1:8000/api/admin/khoa-hoc-free/tim-kiem",
                    this.search,
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("key_admin"),
                        },
                    }
                )
                .then((res) => {
                    this.list = res.data.data;
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                });
        },
        doiTrangThai(v) {
            axios
                .post(
                    "http://127.0.0.1:8000/api/admin/khoa-hoc-free/change-status",
                    v,
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("key_admin"),
                        },
                    }
                )
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
                });
        },
        sua() {
            axios
                .post(
                    "http://127.0.0.1:8000/api/admin/khoa-hoc-free/update",
                    this.edit, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("key_admin"),
                        },
                    }
                )
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
                });
        },
        xoa() {
            axios
                .post(
                    "http://127.0.0.1:8000/api/admin/khoa-hoc-free/delete",
                    this.del, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("key_admin"),
                        },
                    }
                )
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
                });
        },
        themMoi() {
            axios
                .post(
                    "http://127.0.0.1:8000/api/admin/khoa-hoc-free/create",
                    this.create, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("key_admin"),
                        },
                    }
                )
                .then((res) => {
                    console.log(res);
                    this.loadData();
                    this.create = {
                        title: "",
                        slug: "",
                        image: "",
                        description: "",
                        students_count: "",
                        lesson_count: "",
                        duration: "",
                        is_free: ""
                    };
                    this.$toast.success(res.data.message);
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                });
        },
        loadData() {
            axios
                .get("http://127.0.0.1:8000/api/admin/khoa-hoc-free/data", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("key_admin"),
                    },
                })
                .then((res) => {
                    console.log(res);
                    this.list = res.data.data;
                });
        },
    }

}
</script>

<style>

</style>
