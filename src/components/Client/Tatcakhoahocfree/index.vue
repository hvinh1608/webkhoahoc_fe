<template>
    <div class="row">
        <h1 class="text-center mb-4" style="color: red;">DANH SÁCH KHÓA HỌC MIỄN PHÍ</h1>
        <div class="mb-3 d-flex gap-2">
            <input v-model="search" class="form-control" placeholder="Tìm kiếm tên khóa học...">
            <select v-model="sortBy" class="form-select" style="max-width:180px">
                <option value="">Sắp xếp</option>
                <option value="students">Nhiều học viên nhất</option>
                <option value="lessons">Nhiều bài học nhất</option>
                <option value="duration">Thời lượng dài nhất</option>
            </select>
        </div>
        <div class="col-lg-12 mt-2">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 product-grid">
                <template v-for="(v, k) in filteredList" :key="k">
                    <div class="col d-flex" data-aos="fade-up" :data-aos-delay="k * 100" data-aos-duration="800">
                        <router-link :to="`/chi-tiet-khoa-hoc-free/` + v.id + '-' + v.slug">
                            <div class="card rounded-4 flex-fill">
                                <img v-lazy="v.image" class="card-img-top"
                                    style="border-top-left-radius: 20px; border-top-right-radius: 20px; height: 180px;"
                                    alt="...">
                                <div class="card-body d-flex flex-column">
                                    <h6 class="card-title cursor-pointer">{{ v.title }}</h6>
                                    <div class="clearfix mt-auto">
                                        <p class="mb-0 float-start"><b class="text-danger">Miễn Phí</b></p>
                                    </div>
                                    <div class="d-flex justify-content-between mt-4">
                                        <p class="text-secondary"><i class="fa-solid fa-users me-1"></i> {{
                                            v.students_count }}</p>
                                        <p class="text-secondary"><i class="fa-solid fa-circle-play me-1"></i>
                                            {{ v.lesson_count }}</p>
                                        <p class="text-secondary"><i class="fa-solid fa-clock me-1"></i> {{
                                            v.duration }}</p>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Typed from "typed.js";
import dayjs from 'dayjs';
import emitter from "@/event-bus";
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            list: [],
            search: '',
            sortBy: ''
        }
    },
    mounted() {
        this.loadData();
    },
    computed: {
        filteredList() {
            let arr = this.list;
            if (this.search) {
                arr = arr.filter(v => v.title.toLowerCase().includes(this.search.toLowerCase()));
            }
            if (this.sortBy === 'students') {
                arr = arr.slice().sort((a, b) => b.students_count - a.students_count);
            }
            if (this.sortBy === 'lessons') {
                arr = arr.slice().sort((a, b) => b.lesson_count - a.lesson_count);
            }
            if (this.sortBy === 'duration') {
                arr = arr.slice().sort((a, b) => b.duration.localeCompare(a.duration));
            }
            return arr;
        }
    },
    methods: {
        loadData() {
            axios.get("http://127.0.0.1:8000/api/khoa-hoc-free/data-open")
                .then((res) => {
                    this.list = res.data.data1;
                });
        },
    },

}
</script>
<style></style>