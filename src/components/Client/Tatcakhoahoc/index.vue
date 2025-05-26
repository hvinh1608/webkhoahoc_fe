<template>
    <div class="row">
        <h1 class="text-center mb-4" style="color: red;">DANH SÁCH KHÓA HỌC MẤT PHÍ</h1>
        <div class="filter-bar">
            <input v-model="search" class="form-control" placeholder="Tìm kiếm tên khóa học...">
            <select v-model="sortBy" class="form-select">
                <option value="">Sắp xếp</option>
                <option value="price_asc">Giá tăng dần</option>
                <option value="price_desc">Giá giảm dần</option>
            </select>
            <div>
                <label>Giá tối đa: <b>{{ formatVND(maxPrice) }}</b></label>
                <input type="range" min="0" :max="maxPriceLimit" v-model.number="maxPrice" class="form-range">
            </div>
        </div>
        <div class="col-lg-12 mt-2">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 product-grid">
                <template v-for="(value, index) in filteredList" :key="index">
                    <template v-if="index < 21">
                        <div class="col d-flex" data-aos="zoom-in" :data-aos-delay="k * 100" data-aos-duration="800">
                            <div class="card rounded-4 flex-fill">
                                <router-link :to="`/chi-tiet-khoa-hoc/` + value.id + '-' + value.slug_khoa_hoc">
                                    <img v-lazy="value.hinh_anh" class="card-img-top"
                                        style="border-top-left-radius: 20px; border-top-right-radius: 20px; height: 180px"
                                        alt="..." />
                                </router-link>
                                <div class="position-absolute top-0 end-0 m-3 product-discount">
                                    <i class="fa-brands fa-square-web-awesome-stroke text-warning fa-xl"></i>
                                </div>
                                <div class="card-body d-flex flex-column">
                                    <h6 class="card-title cursor-pointer">{{ value.ten_khoa_hoc }}</h6>
                                    <div class="clearfix mt-auto d-flex justify-content-between align-items-center">
                                        <p class="mb-0">
                                            <span class="me-2 text-decoration-line-through text-secondary">{{
                                                formatVND(value.gia_goc) }}</span>
                                            <b class="text-danger">{{ formatVND(value.gia_ban) }}</b>
                                        </p>
                                        <button @click="addToCart(value)" class="btn btn-link p-0 text-dark ms-auto">
                                            <i class="fa-solid fa-cart-plus" style="font-size: 24px; color: black;"></i>
                                        </button>
                                    </div>
                                    <div class="d-flex justify-content-between mt-4">
                                        <p class="text-secondary">
                                            <i class="fa-solid fa-users me-1"></i> 131.495
                                        </p>
                                        <p class="text-secondary">
                                            <i class="fa-solid fa-circle-play me-1"></i> 100
                                        </p>
                                        <p class="text-secondary">
                                            <i class="fa-solid fa-clock me-1"></i> 116h44p
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import emitter from "@/event-bus";
import 'shepherd.js/dist/css/shepherd.css';
import { useToast } from 'vue-toastification';
import { debounce } from 'lodash';
export default {
    data() {
        return {
            list_khoa_hoc: [],
            search: '',
            sortBy: '',
            maxPrice: 27000,
            maxPriceLimit: 27000,
            debouncedMaxPrice: 27000 
        }
    },
    watch: {
        maxPrice: {
            handler: debounce(function (val) {
                this.debouncedMaxPrice = val;
            }, 200),
            immediate: true
        }
    },
    computed: {
        filteredList() {
            let arr = this.list_khoa_hoc;
            if (this.search) {
                arr = arr.filter(v => v.ten_khoa_hoc.toLowerCase().includes(this.search.toLowerCase()));
            }
            arr = arr.filter(v => v.gia_ban <= this.debouncedMaxPrice);
            if (this.sortBy === 'price_asc') arr = arr.slice().sort((a, b) => a.gia_ban - b.gia_ban);
            if (this.sortBy === 'price_desc') arr = arr.slice().sort((a, b) => b.gia_ban - a.gia_ban);
            return arr;
        }
    },
    setup() {
        const toast = useToast();
        return { toast };
    },
    mounted() {
        this.loadKhoaHoc();
    },
    methods: {
        loadKhoaHoc() {
            axios.get("http://127.0.0.1:8000/api/home-page/loai-khoa-hoc/data-open")
                .then((res) => {
                    this.list_khoa_hoc = res.data.data;
                    const max = Math.max(...this.list_khoa_hoc.map(v => v.gia_ban));
                    this.maxPriceLimit = max > 0 ? max : 2000000;
                    this.maxPrice = this.maxPriceLimit;
                });
        },
        formatVND(number) {
            return new Intl.NumberFormat('vi-VI', {
                style: 'currency',
                currency: 'VND'
            }).format(number);
        },
        addToCart(course) {
            axios.post("http://127.0.0.1:8000/api/gio-hang/add", {
                id_khoa_hoc: course.id,
                gia_ban: course.gia_ban,
                quantity: 1,
                coupon_code: ""
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("key_khach_hang"),
                },
            })
                .then((res) => {
                    if (res.data.status === 2) {
                        this.toast.warning("Khóa học đã có trong giỏ hàng!");
                    } else {
                        this.toast.success("Đã thêm vào giỏ hàng!");
                        emitter.emit('update-cart-count');
                    }
                })
                .catch(() => {
                    this.toast.error("❌ Thêm vào giỏ hàng thất bại!");
                });
        },
    },

}
</script>
<style>
.filter-bar {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
    padding: 18px 24px;
    margin-bottom: 24px;
    display: flex;
    flex-wrap: wrap;
    gap: 18px;
    align-items: center;
}

.filter-bar .form-control,
.filter-bar .form-select {
    min-width: 200px;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    box-shadow: none;
    transition: border 0.2s;
}

.filter-bar .form-control:focus,
.filter-bar .form-select:focus {
    border: 1.5px solid #007bff;
    box-shadow: 0 0 0 2px #e3f0ff;
}

.filter-bar .form-range {
    accent-color: #007bff;
    width: 180px;
}

.filter-bar label {
    font-weight: 500;
    color: #333;
    margin-bottom: 4px;
    display: block;
}
</style>