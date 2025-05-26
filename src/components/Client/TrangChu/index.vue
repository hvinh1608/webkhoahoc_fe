<template>
    <div class="row">
        <div class="col-lg-12">
            <div id="carouselExampleControls" class="carousel slide pointer-event" data-bs-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-bs-target="#carouselExampleControls" data-bs-slide-to="0" class=""></li>
                    <li data-bs-target="#carouselExampleControls" data-bs-slide-to="1" class=""></li>
                    <li data-bs-target="#carouselExampleControls" data-bs-slide-to="2" class="active"
                        aria-current="true"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active rounded-4" data-bs-interval="10000"
                        style="background-color: #1C2331;">
                        <div class="row">
                            <div class="col-6 d-flex align-items-center ">
                                <div class="container ms-5">
                                    <h2 class="title-banner text-white mb-4">{{ $t('js_pro_title') }}
                                        <i class="fa-brands fa-square-web-awesome-stroke text-warning"></i>
                                    </h2>
                                    <span class="text-white">{{ $t('js_pro_desc') }}</span>
                                    <router-link to="/chi-tiet-khoa-hoc/2-java-script">
                                        <p class="mt-4">
                                            <button class="custom-button">
                                                <span>{{ $t('register_now') }}</span>
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
                                    <h2 class="text-white mb-4">{{ $t('html_css_title') }}
                                        <i class="fa-brands fa-square-web-awesome-stroke text-warning"></i>
                                    </h2>
                                    <span class="text-white">{{ $t('html_css_desc') }}</span>
                                    <p class="mt-4">
                                        <button class="custom-button">
                                            <span>{{ $t('learn_now') }}</span>
                                        </button>
                                    </p>
                                </div>
                            </div>
                            <div class="col-6">
                                <img src="https://files.fullstack.edu.vn/f8-prod/banners/20/68010e5598e64.png"
                                    class="d-block w-100 rounded-4" alt="...">
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item rounded-4" style="background-color: #1C2331;">
                        <div class="row">
                            <div class="col-6 d-flex align-items-center ">
                                <div class="container ms-5">
                                    <h2 class="text-white mb-4">{{ $t('reactjs_title') }}</h2>
                                    <span class="text-white">{{ $t('reactjs_desc') }}</span>
                                    <router-link to="/chi-tiet-khoa-hoc-free/2-reactjs-cho-nguoi-moi-bat-dau">
                                        <p class="mt-4">
                                            <button class="custom-button">
                                                <span>{{ $t('learn_now') }}</span>
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
                            <p class="alert-text" v-html="$t('alert_text')"></p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-7 gap-1 mt-3">
                <div>
                    <h1 class="title-attendance text-center">{{ $t('attendance') }}</h1>
                    <div class="diem-danh-grid">
                        <div class="diem-danh-github">
                            <div v-for="(ngay, index) in getAllDaysInMonth()" :key="index" class="ngay-diem-danh-github"
                                :class="getDayClass(ngay)" :title="formatTooltip(ngay)"></div>
                        </div>
                    </div>
                    <p class="text-center mt-2">{{ $t('streak', { count: streak }) }}</p>
                </div>
                <div>
                    <input type="date" v-model="fakeNgay">
                    <button @click="fakeDiemDanh">Fake điểm danh</button>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-lg-12 text-center">
                    <h2 class="title-pro-courses">{{ $t('pro_courses') }} <i
                            class="fa-brands fa-square-web-awesome-stroke text-warning"></i></h2>
                    <p v-html="$t('pro_courses_desc')"></p>
                </div>
                <div class="col-lg-12 mt-2">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 product-grid">
                        <template v-for="(value, index) in displayedCourses" :key="index">
                            <template v-if="index < 21">
                                <div class="col d-flex" data-aos="zoom-in" :data-aos-delay="k * 100"
                                    data-aos-duration="800">
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
                    <router-link to="/tat-ca-khoa-hoc">
                        <button class="btn-toggle-pro">
                            <span class="button_top">
                                {{ expandedPro ? $t('collapse') : $t('see_more') }}
                            </span>
                        </button>
                    </router-link>
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
                                    <p class="card-text-1">{{ $t('practice_title') }}</p>
                                    <router-link to="/trac-nghiem">
                                        <button class="button-trac-nghiem me-1">{{ $t('quiz') }}</button>
                                    </router-link>
                                    <router-link to="/">
                                        <button class="button-bai-tap me-1">{{ $t('exercise') }}</button>
                                    </router-link>
                                    <router-link to="/">
                                        <button class="button-video">{{ $t('video') }}</button>
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
                    <h2 class="title-free-courses">{{ $t('free_courses') }} <i
                            class="fa-solid fa-fire-flame-curved text-danger"></i></h2>
                    <p v-html="$t('free_courses_desc')"></p>
                    <p>{{ $t('free_courses_desc2') }}</p>
                </div>
                <div class="col-lg-12 mt-2">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 product-grid">
                        <template v-for="(v, k) in displayedFreeCourses" :key="k">
                            <div class="col d-flex" data-aos="fade-up" :data-aos-delay="k * 100"
                                data-aos-duration="800">
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
                <div class="col-lg-12 text-center mt-3">
                    <router-link to="/tat-ca-khoa-hoc-free">
                        <button class="btn-toggle-free">
                            <span class="button_top">
                                {{ expandedFree ? $t('collapse') : $t('see_more') }}
                            </span>
                        </button>
                    </router-link>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-lg-12 text-center">
                    <h2 class="title-feedback">{{ $t('student_feedback') }} <i
                            class="fa-regular fa-message text-primary"></i></h2>
                </div>
                <div class="col-lg-12 mt-2">
                    <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
                        <template v-for="(v, k) in displayedDanhGias" :key="k">
                            <div class="col d-flex" data-aos="flip-left" :data-aos-delay="k * 100"
                                data-aos-duration="800">
                                <div class="card shadow flex-fill radius-30">
                                    <div class="card-body text-center">
                                        <div class="p-4 radius-15">
                                            <img v-lazy="getAvatarUrl(v.avatar)" alt="" class="usercamnhan-img">
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
                            {{ expandedDanhGia ? $t('collapse') : $t('see_more') }}
                        </span>
                    </button>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-lg-12 text-center">
                    <h2 class="title-articles">{{ $t('articles') }} <i class="fa-regular fa-newspaper"></i></h2>
                    <p>{{ $t('articles_desc') }}</p>
                </div>
                <div class="col-lg-12 mt-2">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-3 row-cols-xxl-3 product-grid">
                        <template v-for="(v, k) in displayedBaiViet" :key="k">
                            <div class="col d-flex" data-aos="fade-right" :data-aos-delay="k * 100"
                                data-aos-duration="800">
                                <router-link :to="`/chi-tiet-bai-viet/${v.id}`" class="card-link">
                                    <div class="card rounded-4 flex-fill" style="height: 400px;">
                                        <img v-lazy="v.hinh_anh" class="card-img-top"
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
                            {{ expandedBaiViet ? $t('collapse') : $t('see_more') }}
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
import dayjs from 'dayjs';
import emitter from "@/event-bus";
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
import { useToast } from 'vue-toastification';
import Swal from 'sweetalert2';

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
            expandedDanhGia: false,
            diemDanhDays: [],
            totalDaysInMonth: 30,
            currentDate: new Date(),
            streak: 0,
            fakeNgay: null,
            typedInstance: null,
        };
    },
    setup() {
        const toast = useToast();
        return { toast };
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
        },
    },
    watch: {
        '$i18n.locale'() {
            this.initTyped();
        }
    },
    mounted() {
        this.loadBaiViet();
        this.loadKhoaHoc();
        this.loadData();
        this.loadDanhGias();
        this.layLichSuDiemDanh();
        this.layStreak();
        this.initTyped();

        // axios.get('http://127.0.0.1:8000/api/check-onboarding', {
        //     headers: {
        //         Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang"),
        //     }
        // }).then(res => {
        //     if (res.data.is_first_login) {
        //         this.startTour();
        //     }
        // });

        if (localStorage.getItem("showTourAfterOnboarding") === "1") {
            this.startTour();
            localStorage.removeItem("showTourAfterOnboarding");
        }
    },
    methods: {
        startTour() {
            const tour = new Shepherd.Tour({
                defaultStepOptions: {
                    scrollTo: true,
                    scrollToHandler: (element) => {
                        const y = element.getBoundingClientRect().top + window.scrollY - 150;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                    },
                    cancelIcon: { enabled: true },
                    classes: 'shepherd-theme-arrows'
                },
                useModalOverlay: true
            });


            tour.addStep({
                title: 'Menu Trang chủ',
                text: 'Đây là nút về trang chủ.',
                attachTo: { element: '.menu-home-link', on: 'bottom' },
                buttons: [
                    { text: 'Tiếp', action: tour.next }
                ]
            });

            tour.addStep({
                title: 'Menu Khóa học',
                text: 'Xem danh sách các khóa học tại đây.',
                attachTo: { element: '.menu-course-link', on: 'bottom' },
                buttons: [
                    { text: 'Quay lại', action: tour.back },
                    { text: 'Tiếp', action: tour.next }
                ]
            });

            tour.addStep({
                title: 'Chuyên mục bài viết',
                text: 'Chọn chuyên mục để xem các bài viết liên quan.',
                attachTo: { element: '.menu-post-link', on: 'bottom' },
                buttons: [
                    { text: 'Quay lại', action: tour.back },
                    { text: 'Tiếp', action: tour.next }
                ]
            });

            tour.addStep({
                title: 'Menu Đánh giá',
                text: 'Xem đánh giá học viên tại đây.',
                attachTo: { element: '.menu-review-link', on: 'bottom' },
                buttons: [
                    { text: 'Quay lại', action: tour.back },
                    { text: 'Tiếp', action: tour.next }
                ]
            });

            tour.addStep({
                title: 'Menu Bảng xếp hạng',
                text: 'Xem bảng xếp hạng tại đây.',
                attachTo: { element: '.menu-ranking-link', on: 'bottom' },
                buttons: [
                    { text: 'Quay lại', action: tour.back },
                    { text: 'Tiếp', action: tour.next }
                ]
            });

            tour.addStep({
                title: 'Banner chính',
                text: 'Đây là banner chính của trang chủ.',
                attachTo: { element: '.title-banner', on: 'bottom' },
                buttons: [
                    { text: 'Tiếp', action: tour.next }
                ]
            });

            tour.addStep({
                title: 'Khóa học mất phí',
                text: 'Đây là danh sách các khóa học mất phí.',
                attachTo: { element: '.title-pro-courses', on: 'bottom' },
                buttons: [
                    { text: 'Quay lại', action: tour.back },
                    { text: 'Tiếp', action: tour.next }
                ]
            });

            tour.addStep({
                title: 'Khóa học miễn phí',
                text: 'Đây là danh sách các khóa học miễn phí.',
                attachTo: { element: '.title-free-courses', on: 'bottom' },
                buttons: [
                    { text: 'Quay lại', action: tour.back },
                    { text: 'Tiếp', action: tour.next }
                ]
            });

            tour.addStep({
                title: 'Điểm danh',
                text: 'Bạn có thể điểm danh mỗi ngày tại đây.',
                attachTo: { element: '.title-attendance', on: 'bottom' },
                buttons: [
                    { text: 'Quay lại', action: tour.back },
                    { text: 'Tiếp', action: tour.next }
                ]
            });

            tour.addStep({
                title: 'Đánh giá học viên',
                text: 'Đây là các đánh giá từ học viên.',
                attachTo: { element: '.title-feedback', on: 'bottom' },
                buttons: [
                    { text: 'Quay lại', action: tour.back },
                    { text: 'Tiếp', action: tour.next }
                ]
            });

            tour.addStep({
                title: 'Bài viết',
                text: 'Đây là nơi bạn có thể đọc các bài viết mới nhất.',
                attachTo: { element: '.title-articles', on: 'bottom' },
                buttons: [
                    { text: 'Quay lại', action: tour.back },
                    { text: 'Kết thúc', action: tour.complete }
                ]
            });

            // Khi kết thúc hoặc hủy, gọi API cập nhật trạng thái
            tour.on('complete', () => {
                // axios.post('http://127.0.0.1:8000/api/finish-onboarding', {}, {
                //     headers: {
                //         Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang"),
                //     }
                // });
            });
            tour.on('cancel', () => {
                // axios.post('http://127.0.0.1:8000/api/finish-onboarding', {}, {
                //     headers: {
                //         Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang"),
                //     }
                // });
            });

            tour.start();
        },

        kiemTraGoiDaMua() {
            axios.get('http://127.0.0.1:8000/api/goi-da-mua', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                }
            })
                .then(res => {
                    if (res.data.status === 1) {
                        this.goiDaMua = res.data;
                    } else {
                        this.goiDaMua = null;
                    }
                })
                .catch(() => {
                    this.goiDaMua = null;
                });
        },
        initTyped() {
            if (this.typedInstance) {
                this.typedInstance.destroy();
            }
            this.typedInstance = new Typed("#typed-title", {
                strings: [
                    this.$t('home_typed_1'),
                    this.$t('home_typed_2'),
                    this.$t('home_typed_3')
                ],
                typeSpeed: 30,
                backSpeed: 30,
                startDelay: 200,
                backDelay: 500,
                loop: true
            });
        },
        fakeDiemDanh() {
            axios.post('http://127.0.0.1:8000/api/fake-diem-danh', {
                ngay: this.fakeNgay,
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang"),
                }
            }).then(res => {
                this.toast.success('Fake điểm danh thành công!');
                this.layLichSuDiemDanh(); // Gọi lại hàm load điểm danh
            });
        },
        layLichSuDiemDanh() {
            axios.get('http://127.0.0.1:8000/api/lich-su-diem-danh', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang"),
                },
            })
                .then(res => {
                    console.log('Dữ liệu điểm danh:', res.data);
                    this.diemDanhDays = res.data;
                    this.layStreak(); // Gọi hàm lấy streak sau khi có dữ liệu điểm danh
                })
                .catch(error => {
                    console.error('Lỗi lấy lịch sử điểm danh:', error);
                });
        },
        getDayClass(ngay) {
            const today = new Date().toISOString().split('T')[0];
            const isToday = today === ngay;

            if (this.diemDanhDays.includes(ngay)) {
                return isToday ? 'completed today' : 'completed';
            }
            return '';
        },

        getAllDaysInMonth() {
            const days = [];
            const now = new Date();
            for (let i = 191; i >= 0; i--) {
                const day = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
                const yyyy = day.getFullYear();
                const mm = String(day.getMonth() + 1).padStart(2, '0');
                const dd = String(day.getDate()).padStart(2, '0');
                days.push(`${yyyy}-${mm}-${dd}`);
            }
            return days;
        },

        layStreak() {
            axios.get('http://127.0.0.1:8000/api/streak', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang"),
                },
            }).then(res => {
                this.streak = res.data.streak;
                this.phanThuong7 = res.data.phan_thuong_7;
                this.phanThuong30 = res.data.phan_thuong_30;
                this.kiemTraPhanThuong();
            }).catch(err => {
                console.error('Lỗi lấy streak:', err);
            });
        },

        nhanPhanThuong(ngayLienTuc) {
            axios.post('http://127.0.0.1:8000/api/nhan-phan-thuong', {
                ngay_lien_tuc: ngayLienTuc
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('key_khach_hang')
                }
            }).then(res => {
                this.toast.success(res.data.message);
                if (res.data.coupon) {
                    this.toast.success(`🎁 Mã coupon của bạn: ${res.data.coupon.code} - Giảm ${res.data.coupon.value}% (HSD: ${res.data.coupon.expiry_date})`);
                }
                this.layStreak();
            }).catch(err => {
                const msg = err.response?.data?.message || 'Không thể nhận phần thưởng!';
                this.toast.error('❌ ' + msg);
            });
        },

        kiemTraPhanThuong() {
            if (this.streak === 30 && !this.phanThuong30) {
                this.nhanPhanThuong(30);
            } else if (this.streak === 7 && !this.phanThuong7) {
                this.nhanPhanThuong(7);
            }
        },

        formatTooltip(date) {
            return dayjs(date).format('DD/MM/YYYY');
        },
        formatVND(number) {
            return new Intl.NumberFormat('vi-VI', {
                style: 'currency',
                currency: 'VND'
            }).format(number);
        },
        loadBaiViet() {
            axios.get("http://127.0.0.1:8000/api/bai-viet/data-open")
                .then((res) => {
                    this.list_bai_viet = this.shuffleArray(res.data.data);
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
        loadDanhGias() {
            axios.get("http://127.0.0.1:8000/api/danh-gia")
                .then(res => {
                    this.danhGias = res.data;
                })
                .catch(() => {
                    this.toast.error("Lỗi khi tải danh sách đánh giá!");
                });
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
            if (this.limitBaiViet === 3) {
                this.limitBaiViet = 6;
            } else {
                this.limitBaiViet = 3;
            }
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
        getAvatarUrl(avatar) {
            return `http://127.0.0.1:8000/storage/${avatar}`;
        },
        shuffleArray(array) {
            return array.sort(() => Math.random() - 0.5);
        },
    },
};
</script>

<style scoped>
@import '@/assets/css/commonStyles.css';
</style>
