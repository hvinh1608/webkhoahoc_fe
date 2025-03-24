<template>
    <div class="row">
        <div class="col-lg-12">
            <div id="carouselExampleControls" class="carousel slide pointer-event" data-bs-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class=""></li>
                    <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" class=""></li>
                    <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" class="active"
                        aria-current="true"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active rounded-4" data-bs-interval="10000"
                        style="background-color: #1C2331;">
                        <div class="row">
                            <div class="col-6 d-flex align-items-center ">
                                <div class="container ms-5">
                                    <h2 class="text-white mb-4">Mở bán khóa JavaScript Pro
                                        <i class="fa-brands fa-square-web-awesome-stroke text-warning"></i>
                                    </h2>
                                    <span class="text-white">
                                        Từ 20/10/2024 khóa học sẽ có giá 1.399k (-200k nếu pre-order khóa
                                        HTML
                                        CSS Pro). Khi full khóa học sẽ trở về giá gốc.
                                    </span>
                                    <router-link to="/chi-tiet-khoa-hoc/2-java-script">
                                        <p class="mt-4">
                                            <button class="custom-button">
                                                <span>ĐĂNG KÝ NGAY</span>
                                            </button>
                                        </p>
                                    </router-link>
                                </div>
                            </div>
                            <div class="col-6">
                                <img src="https://files.fullstack.edu.vn/f8-prod/banners/37/66b5a6b16d31a.png"
                                    class="d-block w-100 rounded-4" alt="...">
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item rounded-4" data-bs-interval="2000" style="background-color: #1C2331;">
                        <div class="row">
                            <div class="col-6 d-flex align-items-center ">
                                <div class="container ms-5">
                                    <h2 class="text-white mb-4">Học HTML CSS cho người mới
                                        <i class="fa-brands fa-square-web-awesome-stroke text-warning"></i>
                                    </h2>
                                    <span class="text-white">
                                        Thực hành dự án với Figma, hàng trăm bài tập và thử thách, tặng kèm
                                        Flashcards, v.v.
                                    </span>
                                    <p class="mt-4">
                                        <button class="custom-button">
                                            <span>HỌC NGAY</span>
                                        </button>
                                    </p>
                                </div>
                            </div>
                            <div class="col-6">
                                <img src="https://files.fullstack.edu.vn/f8-prod/banners/20/6308a6bf603a4.png"
                                    class="d-block w-100 rounded-4" alt="...">
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item rounded-4" style="background-color: #1C2331;">
                        <div class="row">
                            <div class="col-6 d-flex align-items-center ">
                                <div class="container ms-5">
                                    <h2 class="text-white mb-4">Học ReactJS Miễn Phí!
                                    </h2>
                                    <span class="text-white">
                                        Khóa học ReactJS từ cơ bản tới nâng cao. Kết quả của khóa học này là
                                        bạn có thể làm hầu hết các dự án thường gặp với ReactJS.
                                    </span>
                                    <router-link to="/chi-tiet-khoa-hoc-free/2-reactjs-cho-nguoi-moi-bat-dau">
                                        <p class="mt-4">
                                            <button class="custom-button">
                                                <span>HỌC NGAY</span>
                                            </button>
                                        </p>
                                    </router-link>
                                </div>
                            </div>
                            <div class="col-6">
                                <img src="https://files.fullstack.edu.vn/f8-prod/banners/Banner_web_ReactJS.png"
                                    class="d-block w-100 rounded-4" alt="...">
                            </div>
                        </div>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </a>
            </div>
            <div class="row mt-3">
                <div class="col-lg-12">
                    <div class="alert-box">
                        <div class="alert-content">
                            <i class="bx bx-bell animated-bell"></i>
                            <p class="alert-text">
                                Với mong muốn mang đến kiến thức chất lượng, miễn phí cho mọi người, với tâm huyết phá
                                bỏ rào cản kiến thức từ việc giáo dục thu phí.
                                Chúng tôi - <strong>DZFullStack</strong> đã lập nên trang website này để thế giới phẳng
                                hơn.
                                Bất cứ ai có mong muốn khai phá thế giới, phá bỏ mọi thứ ngăn cản sự phát triển tất yếu
                                bền vững của xã hội đều là <strong>DZer</strong> (Thành viên của DZFullStack).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-lg-12 text-center">
                    <h2>
                        KHÓA HỌC PRO <i class="fa-brands fa-square-web-awesome-stroke text-warning"></i>
                    </h2>
                    <p>
                        Các khóa học lập trình online <span class="text-warning">PRO</span> vừa được DZFullStack ra mắt
                    </p>
                </div>
                <div class="col-lg-12 mt-2">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 product-grid">
                        <template v-for="(value, index) in displayedCourses" :key="index">
                            <template v-if="index < 21">
                                <div class="col d-flex">
                                    <div class="card rounded-4 flex-fill">
                                        <router-link :to="`/chi-tiet-khoa-hoc/` + value.id + '-' + value.slug_khoa_hoc">
                                            <img :src="value.hinh_anh" class="card-img-top"
                                                style="border-top-left-radius: 20px; border-top-right-radius: 20px; height: 180px"
                                                alt="..." />
                                        </router-link>
                                        <div class="position-absolute top-0 end-0 m-3 product-discount">
                                            <i class="fa-brands fa-square-web-awesome-stroke text-warning fa-xl"></i>
                                        </div>
                                        <div class="card-body d-flex flex-column">
                                            <h6 class="card-title cursor-pointer">{{ value.ten_khoa_hoc }}</h6>
                                            <div
                                                class="clearfix mt-auto d-flex justify-content-between align-items-center">
                                                <p class="mb-0">
                                                    <span class="me-2 text-decoration-line-through text-secondary">{{
                                                        formatVND(value.gia_goc) }}</span>
                                                    <b class="text-danger">{{ formatVND(value.gia_ban) }}</b>
                                                </p>
                                                <button @click="addToCart(value)"
                                                    class="btn btn-link p-0 text-dark ms-auto">
                                                    <i class="fa-solid fa-cart-plus"
                                                        style="font-size: 24px; color: black;"></i>
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
                <div class="col-lg-12 text-center mt-3">
                    <button class="btn-toggle-pro" @click="toggleProCourses()">
                        <span class="button_top">
                            {{ expandedPro ? "Thu gọn" : "Xem thêm" }}
                        </span>
                    </button>
                </div>
            </div>
            <div class="row mt-5 position-relative">
                <div class="col-lg-12">
                    <div class="card">
                        <img src="https://zendvn.com/frontend/assets/images/background/9.jpg" class="card-img"
                            alt="...">
                        <div class="card-img-overlay">
                            <div class="card-body d-flex align-items-center justify-content-between">
                                <div class="home-text">
                                    <h2 class="card-title">
                                        <span id="typed-title"></span>
                                    </h2>
                                    <p class="card-text-1">Trắc nghiệm lập trình và các bài tập lập trình được
                                        sắp xếp theo nhiều chuyên mục khác nhau, với nhiều cấp độ từ dễ
                                        đến khó, đây là nơi giúp các lập trình viên thực hành và luyện
                                        code.</p>
                                    <router-link to="/trac-nghiem">
                                        <button class="button-trac-nghiem me-1">
                                            Trắc nghiệm
                                        </button>
                                    </router-link>
                                    <router-link to="/">
                                        <button class="button-bai-tap me-1">
                                            Bài tập
                                        </button>
                                    </router-link>
                                    <router-link to="/">
                                        <button class="button-video">
                                            Video
                                        </button>
                                    </router-link>
                                </div>
                                <img src="https://zendvn.com/frontend/assets/images/background/index_background_link_to_resources_02.png"
                                    class="card-img" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-lg-12 text-center">
                    <h2>KHÓA HỌC MIỄN PHÍ <i class="fa-solid fa-fire-flame-curved text-danger"></i></h2>
                    <p>Các khóa học lập trình online <span class="text-danger">MIỄN PHÍ</span> vừa được DZFullStack ra
                        mắt.</p>
                    <p>Nội dung chi tiết trong từng video cung cấp đầy đủ kiến thức chuyên môn và giúp học viên trải
                        nghiệm môi
                        trường vừa học vừa làm trong thực tế, giúp các bạn tự tin khi đi làm</p>
                </div>
                <div class="col-lg-12 mt-2">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 product-grid">
                        <template v-for="(v, k) in displayedFreeCourses" :key="k">
                            <div class="col d-flex">
                                <router-link :to="`/chi-tiet-khoa-hoc-free/` + v.id + '-' + v.slug">
                                    <div class="card rounded-4 flex-fill">
                                        <img :src="v.image" class="card-img-top"
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
                <div class="col-lg-12 text-center mt-3">
                    <button class="btn-toggle-free" @click="toggleFreeCourses()">
                        <span class="button_top">
                            {{ expandedFree ? "Thu gọn" : "Xem thêm" }}
                        </span>
                    </button>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-lg-12 text-center">
                    <h2>CẢM NHẬN CỦA HỌC VIÊN VỀ KHÓA HỌC <i class="fa-regular fa-message text-primary"></i></h2>
                </div>
                <div class="col-lg-12 mt-2">
                    <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
                        <template v-for="(v, k) in displayedDanhGias" :key="k">
                            <div class="col d-flex">
                                <div class="card shadow flex-fill radius-30">
                                    <div class="card-body text-center">
                                        <div class="p-4 radius-15">
                                            <img :src="getAvatarUrl(v.avatar)" alt="" class="usercamnhan-img">
                                            <h4 class="mb-0 mt-5">{{ v.ho_ten }}</h4>
                                            <h5 class="mb-0" style="color: purple;">{{ v.vai_tro }}</h5>
                                            <h6 class="mt-1" style="color: green;">{{ v.khoa_hoc }}</h6>
                                            <span v-for="star in 5" :key="star">
                                                <i
                                                    :class="star <= v.rating ? 'fa-solid fa-star text-warning' : 'fa-regular fa-star text-secondary'"></i>
                                            </span> <br>
                                            <span>{{ v.noi_dung }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="col-lg-12 text-center">
                    <button class="btn-toggle-review" @click="toggleDanhGias()">
                        <span class="button_top">
                            {{ expandedDanhGia ? "Thu gọn" : "Xem thêm" }}
                        </span>
                    </button>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-lg-12 text-center">
                    <h2>BÀI VIẾT CỦA CHÚNG TÔI <i class="fa-regular fa-newspaper"></i></h2>
                    <p>DZFullStack tổng hợp bài viết kiến thức lập trình, thông báo và tin tức</p>
                </div>
                <div class="col-lg-12 mt-2">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-3 row-cols-xxl-3 product-grid">
                        <template v-for="(v, k) in displayedBaiViet" :key="k">
                            <div class="col d-flex">
                                <router-link :to="`/bai-viet/${v.id}`" class="card-link">
                                    <div class="card rounded-4 flex-fill">
                                        <img :src="v.hinh_anh" class="card-img-top"
                                            style="border-top-left-radius: 20px; border-top-right-radius: 20px; height: 300px;"
                                            alt="...">
                                        <div class="">
                                            <div class="position-absolute top-0 end-0 m-3 product-discount"></div>
                                        </div>
                                        <div class="card-body">
                                            <h5 class="card-title cursor-pointer">{{ v.tieu_de }}</h5>
                                            <div class="clearfix mt-auto">
                                                <p class="mb-0 float-start">{{ truncateText(v.noi_dung, 100) }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="col-lg-12 text-center">
                    <button class="btn-toggle-article" @click="toggleBaiViet()">
                        <span class="button_top">
                            {{ expandedBaiViet ? "Thu gọn" : "Xem thêm" }}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Typed from "typed.js";
import {
    useCartStore
} from "@/stores/modules/cart";

export default {
    data() {
        return {
            danhGias: [],
            list_bai_viet: [],
            list_khoa_hoc: [],
            list: [],
            limitPro: 5,
            limitFree: 5,
            limitBaiViet: 3,
            limitDanhGia: 3,
            expandedPro: false,
            expandedFree: false,
            expandedBaiViet: false,
            expandedDanhGia: false
        };
    },
    computed: {
        displayedCourses() {
            return this.list_khoa_hoc.slice(0, this.limitPro);
        },
        displayedFreeCourses() {
            return this.list.slice(0, this.limitFree);
        },
        displayedBaiViet() {
            return this.list_bai_viet.slice(0, this.limitBaiViet);
        },
        displayedDanhGias() {
            return this.danhGias.slice(0, this.limitDanhGia);
        }
    },
    mounted() {
        this.loadBaiViet();
        this.loadKhoaHoc();
        this.loadData();
        this.loadDanhGias();
        new Typed("#typed-title", {
            strings: [
                "Học lập trình để phát triển tương lai",
                "Học lập trình để tạo ra sản phẩm",
                "Học lập trình để thay đổi thế giới"
            ],
            typeSpeed: 30,
            backSpeed: 30,
            startDelay: 200,
            backDelay: 500,
            loop: true
        });

    },
    methods: {
        formatVND(number) {
            return new Intl.NumberFormat('vi-VI', {
                style: 'currency',
                currency: 'VND'
            }).format(number);
        },
        loadBaiViet() {
            axios.get("http://127.0.0.1:8000/api/bai-viet/data-open")
                .then((res) => {
                    this.list_bai_viet = res.data.data;
                });
        },
        loadKhoaHoc() {
            axios.get("http://127.0.0.1:8000/api/home-page/loai-khoa-hoc/data-open")
                .then((res) => {
                    this.list_khoa_hoc = res.data.data;
                });
        },
        loadData() {
            axios.get("http://127.0.0.1:8000/api/khoa-hoc-free/data-open")
                .then((res) => {
                    this.list = res.data.data1;
                });
        },
        async loadDanhGias() {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/danh-gia");
                this.danhGias = res.data;
            } catch (error) {
                this.$toast.error("Lỗi khi tải danh sách đánh giá!");
            }
        },
        toggleProCourses() {
            this.limitPro = this.expandedPro ? 5 : this.list_khoa_hoc.length;
            this.expandedPro = !this.expandedPro;
        },
        toggleFreeCourses() {
            this.limitFree = this.expandedFree ? 5 : this.list.length;
            this.expandedFree = !this.expandedFree;
        },
        toggleBaiViet() {
            this.limitBaiViet = this.expandedBaiViet ? 3 : this.list_bai_viet.length;
            this.expandedBaiViet = !this.expandedBaiViet;
        },
        toggleDanhGias() {
            this.limitDanhGia = this.expandedDanhGia ? 3 : this.danhGias.length;
            this.expandedDanhGia = !this.expandedDanhGia;
        },
        truncateText(text, length) {
            if (!text) return "";
            const plainText = text.replace(/<[^>]*>/g, "");
            return plainText.length > length ? plainText.substring(0, length) + "..." : plainText;
        },
        // 👉 Hàm thêm vào giỏ hàng
        addToCart(course) {
            const cartStore = useCartStore();
            cartStore.addToCart(course);
            this.$toast.success("Đã thêm vào giỏ hàng!");
        },
        getAvatarUrl(avatar) {
            return `http://127.0.0.1:8000/storage/${avatar}`;
        },
    },
};
</script>

<style scoped>
@import '@/assets/css/commonStyles.css'; 
</style>
