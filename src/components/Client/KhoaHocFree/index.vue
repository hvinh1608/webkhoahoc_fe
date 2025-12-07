    <template>
        <div class="row">
            <div class="col-lg-6">
                <div class="row">
                    <div class="col-lg-12">
                        <h1>{{ chi_tiet_khoa_hoc_free.title }}</h1>
                        <span>{{ chi_tiet_khoa_hoc_free.description }}</span>
                    </div>
                    <hr class="mt-3 mb-3">
                    <div class="col-lg-12">
                        <h4>Nội dung khóa học</h4>
                        <b>11</b> chương - <b>{{ chi_tiet_khoa_hoc_free.lesson_count }}</b> bài học - Thời lượng <b>1{{
                            chi_tiet_khoa_hoc_free.duration }}</b>
                    </div>
                    <div class="mt-2">
                        <label v-if="tong_bai > 0">
                            Tiến độ học tập: {{ da_hoc }}/{{ tong_bai }} bài ({{ tien_do }}%)
                        </label>
                        <div class="progress-container mt-2">
                            <div class="progress-bar-custom" :style="{ width: tien_do + '%' }">
                                {{ tien_do }}%
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12 mt-3">
                        <div class="accordion" id="accordionExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingOne">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                        <h6>Bài Học</h6>
                                    </button>
                                </h2>
                                <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
                                    data-bs-parent="#accordionExample" style="">
                                    <div class="accordion-body">
                                        <template v-for="(value, index) in list_bai_hoc" :key="index">
                                            <div class="d-flex justify-content-between align-items-center" :style="{
                                                cursor: isRegistered && (index === 0 || completedLessons.includes(list_bai_hoc[index - 1].id)) ? 'pointer' : 'not-allowed',
                                                opacity: isRegistered && (index === 0 || completedLessons.includes(list_bai_hoc[index - 1].id)) ? 1 : 0.5
                                            }" @click="
                                                isRegistered && (index === 0 || completedLessons.includes(list_bai_hoc[index - 1].id))
                                                    ? chuyenVideo(value)
                                                    : null
                                                ">
                                                <p>
                                                    <i class="fa-solid fa-circle-play me-2" style="color: red;"></i>{{
                                                        value.tieu_de }}
                                                </p>
                                                <i v-if="completedLessons.includes(value.id)"
                                                    class="fa-solid fa-check text-success"></i>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12 mt-4 mb-4">
                        <div class="d-flex justify-content-between align-items-center">
                            <template v-if="tien_do === 100">
                                <button class="cert-download-btn" type="button" @click="taiChungChi()">
                                    <span class="cert-download-btn__text">Chứng Chỉ</span>
                                    <span class="cert-download-btn__icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" class="svg">
                                            <path
                                                d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z">
                                            </path>
                                            <path
                                                d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z">
                                            </path>
                                            <path
                                                d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z">
                                            </path>
                                        </svg>
                                    </span>
                                </button>
                            </template>
                            <h4 class="text-end">
                                <!-- Icon Ghi chú -->
                                <i class="fa fa-sticky-note" @click="toggleGhiChuEditor" style="cursor: pointer;"></i>

                                <!-- Icon Xem ghi chú -->
                                <i class="fa fa-eye" @click="toggleGhiChuList"
                                    style="cursor: pointer; margin-left: 10px;"></i>
                            </h4>
                        </div>

                        <!-- Ô nhập ghi chú -->
                        <div v-if="isGhiChuEditorVisible" class="mt-3">
                            <textarea class="form-control mb-2" v-model="noi_dung_ghi_chu" rows="4"
                                placeholder="Nhập ghi chú của bạn..."></textarea>

                            <div class="d-flex gap-2">
                                <button class="btn btn-primary" @click="luuGhiChu()">
                                    {{ idDangChinhSua ? 'Cập nhật' : 'Lưu ghi chú' }}
                                </button>

                                <!-- Nút hủy thao tác cập nhật -->
                                <button v-if="idDangChinhSua" class="btn btn-secondary" @click="huyCapNhat()">
                                    Hủy
                                </button>
                            </div>
                        </div>

                        <!-- Ghi chú đã lưu -->
                        <div v-if="isGhiChuListVisible" class="saved-notes-list">
                            <h5 class="saved-notes-header">Ghi chú đã lưu:</h5>
                            <div v-if="ghi_chu.length > 0" class="saved-notes-body">
                                <div v-for="(ghiChu, index) in ghi_chu" :key="ghiChu.id" class="mb-2">
                                    <div class="d-flex justify-content-between align-items-start">
                                        <p class="mb-0"><strong>Ghi chú {{ index + 1 }}:</strong> {{ ghiChu.noi_dung }}
                                        </p>
                                        <div>
                                            <!-- Icon chỉnh sửa -->
                                            <i class="fa fa-edit text-warning me-2" style="cursor: pointer;"
                                                @click="editNote(ghiChu.id)" title="Chỉnh sửa"></i>

                                            <!-- Icon xóa -->
                                            <i class="fa fa-trash text-danger" style="cursor: pointer;"
                                                @click="deleteNote(ghiChu.id)" title="Xóa"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p v-else class="text-muted">Chưa có ghi chú nào.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div id="yt-player" style="width: 100%; height: 515px; border-radius: 20px;"></div>
                <h4 class="text-danger mt-2 text-center">
                    {{ chi_tiet_khoa_hoc_free.is_free == 1 ? 'Miễn phí' : formatVND(chi_tiet_khoa_hoc_free.is_free) }}
                </h4>

                <div class="d-flex justify-content-center">
                    <!-- Nếu chưa đăng ký thì hiển thị nút "Đăng ký học" -->
                    <button v-if="!isRegistered" v-on:click="confirmDangKyKhoaHoc(id_khoa_hoc_free)"
                        class="btn-register-free">
                        ĐĂNG KÝ HỌC
                    </button>

                    <!-- Nếu đã đăng ký thì hiển thị thông báo "Đã đăng ký" -->
                    <button v-else class="btn-register-free" disabled>
                        ĐÃ ĐĂNG KÝ
                    </button>
                </div>
                <div class="d-flex justify-content-between mt-3">
                    <p><i class="fa-solid fa-gauge-high"></i> Trình độ cơ bản</p>
                    <p><i class="fa-solid fa-film"></i> Tổng số 138 bài học</p>
                    <p><i class="fa-solid fa-clock"></i> Thời lượng 10 giờ 29 phút</p>
                    <p><i class="fa-solid fa-battery-full"></i> Học mọi lúc, mọi nơi</p>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h4 class="text-body mb-0">Bình luận khóa học</h4>
                </div>

                <!-- Form bình luận -->
                <div class="card mb-4">
                    <div class="card-body">
                        <textarea class="form-control mb-2" v-model="noi_dung_binh_luan" rows="3"
                            placeholder="Viết bình luận của bạn..."></textarea>
                        <button class="btn btn-primary" @click="guiBinhLuan()">Gửi bình luận</button>
                    </div>
                </div>

                <!-- Khung cuộn danh sách bình luận -->
                <div class="card mb-4" style="max-height: 500px; overflow-y: auto;" ref="khungBinhLuan">
                    <div class="card-body">
                        <!-- Danh sách bình luận -->
                        <div v-for="bl in ds_binh_luan" :key="bl.id" class="mb-4 pb-3 border-bottom">
                            <div class="d-flex align-items-start">
                                <img class="rounded-circle me-3"
                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(20).webp" width="48"
                                    height="48" style="object-fit: cover;" />
                                <div class="flex-grow-1">
                                    <div class="d-flex justify-content-between">
                                        <h6 class="mb-0">{{ bl.ten_nguoi_dung }}</h6>
                                        <small class="text-muted">{{ formatTime(bl.created_at) }}</small>
                                    </div>
                                    <p class="mb-1">{{ bl.noi_dung }}</p>
                                    <a href="javascript:void(0)" class="text-primary small"
                                        @click="id_binh_luan_dang_tra_loi = (id_binh_luan_dang_tra_loi === bl.id ? null : bl.id)">Phản
                                        hồi</a>

                                    <div class="d-flex align-items-center mt-2">
                                        <!-- Biểu tượng like -->
                                        <i :class="{
                                            'fa-solid fa-heart text-danger': bl.da_like,
                                            'fa-regular fa-heart text-secondary': !bl.da_like
                                        }" style="cursor: pointer;" @click="likeBinhLuan(bl)">
                                        </i>
                                        <!-- Hiển thị số lượt like -->
                                        <span class="ms-1">{{ bl.likes_count }}</span>
                                    </div>

                                    <!-- Khung nhập trả lời -->
                                    <div v-if="id_binh_luan_dang_tra_loi === bl.id" class="mt-2">
                                        <textarea class="form-control mb-2" rows="2" v-model="noi_dung_tra_loi[bl.id]"
                                            placeholder="Nhập nội dung phản hồi..."></textarea>
                                        <button class="btn btn-sm btn-primary" @click="guiTraLoi(bl.id)">Gửi trả
                                            lời</button>
                                    </div>

                                    <!-- Danh sách trả lời -->
                                    <div v-for="tl in bl.ds_tra_loi" :key="tl.id"
                                        class="mt-3 ms-4 p-3 bg-light rounded border">
                                        <div class="d-flex justify-content-between">
                                            <strong>{{ tl.ten_nguoi_dung }}
                                                <span v-if="tl.vai_tro" class="text-muted small">({{ tl.vai_tro
                                                }})</span>
                                            </strong>
                                        </div>
                                        <p class="mb-1">{{ tl.noi_dung }}</p>

                                        <a href="javascript:void(0)" class="text-primary small"
                                            @click="toggleReply(tl.id)">Phản
                                            hồi</a>

                                        <!-- Khung nhập phản hồi con -->
                                        <div v-if="id_tra_loi_dang_tra_loi === tl.id" class="mt-2">
                                            <textarea class="form-control mb-2" rows="2"
                                                v-model="noi_dung_tra_loi_con[tl.id]"
                                                placeholder="Nhập nội dung phản hồi..."></textarea>
                                            <button class="btn btn-sm btn-secondary"
                                                @click="guiTraLoiCon(bl.id, tl.id)">Gửi
                                                phản
                                                hồi</button>
                                        </div>

                                        <!-- Phản hồi con -->
                                        <div v-if="tl.tra_loi_con && tl.tra_loi_con.length > 0" class="mt-2 ms-4">
                                            <div v-for="ph in tl.tra_loi_con" :key="ph.id"
                                                class="bg-white p-2 rounded border mb-2">
                                                <strong>{{ ph.ten_nguoi_dung }} <span v-if="ph.vai_tro"
                                                        class="text-muted small">({{
                                                            ph.vai_tro }})</span>:</strong>
                                                {{ ph.noi_dung }}

                                                <a href="javascript:void(0)" class="text-primary small"
                                                    @click="toggleReply(ph.id)">Phản hồi</a>

                                                <!-- Phản hồi con tiếp theo -->
                                                <div v-if="id_tra_loi_dang_tra_loi === ph.id" class="mt-2">
                                                    <textarea class="form-control mb-2" rows="2"
                                                        v-model="noi_dung_tra_loi_con[ph.id]"
                                                        placeholder="Nhập nội dung phản hồi..."></textarea>
                                                    <button class="btn btn-sm btn-secondary"
                                                        @click="guiTraLoiCon(bl.id, ph.id)">Gửi
                                                        phản hồi</button>
                                                </div>

                                                <!-- Hiển thị các phản hồi con tiếp theo (đệ quy) -->
                                                <div v-if="ph.tra_loi_con && ph.tra_loi_con.length > 0">
                                                    <div v-for="reply in ph.tra_loi_con" :key="reply.id"
                                                        class="mt-2 ms-4">
                                                        <strong>{{ reply.ten_nguoi_dung }} <span v-if="reply.vai_tro"
                                                                class="text-muted small">({{ reply.vai_tro
                                                                }})</span>:</strong>
                                                        {{ reply.noi_dung }}

                                                        <a href="javascript:void(0)" class="text-primary small"
                                                            @click="toggleReply(reply.id)">Phản hồi</a>

                                                        <div v-if="id_tra_loi_dang_tra_loi === reply.id" class="mt-2">
                                                            <textarea class="form-control mb-2" rows="2"
                                                                v-model="noi_dung_tra_loi_con[reply.id]"
                                                                placeholder="Nhập nội dung phản hồi..."></textarea>
                                                            <button class="btn btn-sm btn-secondary"
                                                                @click="guiTraLoiCon(bl.id, reply.id)">Gửi phản
                                                                hồi</button>
                                                        </div>

                                                        <!-- Hiển thị phản hồi con của phản hồi con (đệ quy) -->
                                                        <div v-if="reply.tra_loi_con && reply.tra_loi_con.length > 0">
                                                            <div v-for="subReply in reply.tra_loi_con"
                                                                :key="subReply.id" class="mt-2 ms-4">
                                                                <strong>{{ subReply.ten_nguoi_dung }} <span
                                                                        v-if="subReply.vai_tro"
                                                                        class="text-muted small">({{
                                                                            subReply.vai_tro
                                                                        }})</span>:</strong>
                                                                {{ subReply.noi_dung }}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
import { useToast } from 'vue-toastification';
dayjs.extend(relativeTime);
dayjs.locale('vi');
export default {
    props: ['id_khoa_hoc_free', 'slug'],
    data() {
        return {
            id_khoa_hoc_free: this.$route.params.id_khoa_hoc_free,
            chi_tiet_khoa_hoc_free: {},
            list_bai_hoc: [],
            link_video: "",
            isRegistered: false,
            ds_binh_luan: [],
            noi_dung_binh_luan: "",
            id_binh_luan_dang_tra_loi: null,
            noi_dung_tra_loi: {},
            id_tra_loi_dang_tra_loi: null,
            noi_dung_tra_loi_con: {},
            noi_dung_ghi_chu: "",
            ghi_chu: "",
            isGhiChuEditorVisible: false,
            isGhiChuListVisible: false,
            idDangChinhSua: null,
            tien_do: 0,
            da_hoc: 0,
            tong_bai: 0,
            completedLessons: [],
            player: null,
            currentLessonId: null,
            lastAllowedTime: 0,
            trackingInterval: null,
            hasWatchedEnough: false,
        }
    },
    setup() {
        const toast = useToast();
        return { toast };
    },
    mounted() {
        this.loadChiTietKhoaHoc();
        this.loadBinhLuan();
        this.loadGhiChu();
        this.layTienDo();
    },

    computed: {
        tong_bai() {
            return this.list_bai_hoc.length;
        },
        tien_do() {
            if (this.tong_bai === 0) return 0;
            return Math.round((this.da_hoc / this.tong_bai) * 100);
        }
    },

    methods: {
        chuyenVideo(baiHoc) {
            if (!this.isRegistered) {
                this.toast.error("Vui lòng ĐĂNG KÝ HỌC để xem bài học!");
                return;
            }
            this.link_video = baiHoc.link_bai_hoc;
            this.currentLessonId = baiHoc.id;
            if (this.player) {
                const videoId = this.getYouTubeVideoId(baiHoc.link_bai_hoc);
                this.player.loadVideoById(videoId);
            } else {
                this.initYouTubePlayer(baiHoc.link_bai_hoc);
            }
        },

        initYouTubePlayer(videoUrl) {
            const videoId = this.getYouTubeVideoId(videoUrl);

            if (!videoId) {
                console.error('Không thể lấy video ID từ URL:', videoUrl);
                return;
            }

            // Khởi tạo YouTube Player
            this.player = new YT.Player('yt-player', {
                videoId: videoId,
                events: {
                    onStateChange: this.onPlayerStateChange,
                    onPlaybackRateChange: this.onPlaybackRateChange,
                },
            });
        },

        onPlaybackRateChange(event) {
            if (this.player.getPlaybackRate() > 1) {
                this.player.setPlaybackRate(1); // Đặt lại tốc độ phát về bình thường
                this.toast.warning('Bạn không thể tua nhanh video!');
            }
        },

        onPlayerStateChange(event) {
            if (event.data === YT.PlayerState.PLAYING) {
                this.startTrackingProgress();
            } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
                this.stopTrackingProgress();
            }

            if (event.data === YT.PlayerState.ENDED) {
                // Kiểm tra nếu người dùng đã xem đủ 90% video
                const currentTime = this.player.getCurrentTime();
                const duration = this.player.getDuration();

                if (currentTime >= duration * 0.0) { // Người dùng phải xem ít nhất 90% video
                    this.capNhatTienDo();
                } else {
                    this.toast.warning('Bạn cần xem ít nhất 90% video để hoàn thành bài học!');
                }
            }
        },

        capNhatTienDo() {
            // if (!this.hasWatchedEnough) {
            //     this.toast.warning('Bạn cần xem ít nhất 90% video để hoàn thành bài học!');
            //     return;
            // }

            if (!this.currentLessonId) return;

            if (!this.completedLessons.includes(this.currentLessonId)) {
                this.completedLessons.push(this.currentLessonId); // Thêm bài học vào danh sách đã hoàn thành
                this.da_hoc += 1;
            }

            // Gửi yêu cầu cập nhật tiến độ
            axios.post('http://127.0.0.1:8000/api/danh-dau-hoan-thanh-free', {
                bai_hoc_id_free: this.currentLessonId, // ID bài học hiện tại
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang"),
                },
            }).then(res => {
                this.layTienDo(); // Cập nhật tiến độ

            }).catch(error => {
                console.error('Lỗi cập nhật tiến độ:', error);
            });
        },

        getYouTubeVideoId(url) {
            const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([^&?\/]+)/;
            const match = url.match(regExp);
            return match && match[1] ? match[1] : null;
        },

        startTrackingProgress() {
            if (this.trackingInterval) return; // Đã có interval, không cần tạo mới

            this.trackingInterval = setInterval(() => {
                const currentTime = this.player.getCurrentTime(); // Lấy thời gian hiện tại của video
                const duration = this.player.getDuration(); // Lấy tổng thời lượng video

                // Nếu người dùng tua vượt quá thời gian cho phép
                if (currentTime > this.lastAllowedTime + 10) { // Cho phép tua tối đa 10 giây
                    this.player.seekTo(this.lastAllowedTime); // Tua lại về thời gian cho phép
                    this.toast.warning('Bạn chỉ có thể tua tối đa 10 giây!');
                } else {
                    this.lastAllowedTime = currentTime; // Cập nhật thời gian cho phép
                }

                // Cập nhật tiến độ xem
                if (currentTime >= duration * 0.9) {
                    this.hasWatchedEnough = true; // Đánh dấu rằng người dùng đã xem đủ
                }
            }, 1000); // Kiểm tra mỗi giây
        },

        stopTrackingProgress() {
            if (this.trackingInterval) {
                clearInterval(this.trackingInterval);
                this.trackingInterval = null;
            }
        },

        layTienDo() {
            axios.get('http://127.0.0.1:8000/api/tien-do-khoa-hoc-free/' + this.id_khoa_hoc_free, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang"),
                }
            })
                .then(res => {
                    if (res.data) {
                        this.tong_bai = res.data.tong_bai || 0;
                        this.da_hoc = res.data.da_hoc || 0;
                        this.phan_tram = (this.da_hoc / this.tong_bai) * 100 || 0;
                        this.completedLessons = res.data.completed_lessons || [];
                    }
                })
                .catch(error => {
                    console.error('Lỗi lấy tiến độ:', error);
                });
        },

        huyCapNhat() {
            this.idDangChinhSua = null;
            this.noi_dung_ghi_chu = "";
            this.isGhiChuEditorVisible = false;
        },

        taiChungChi() {
            axios.get(`http://127.0.0.1:8000/api/khoa-hoc-free/${this.id_khoa_hoc_free}/chung-chi`, {
                responseType: 'blob', // Để tải file PDF
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang"),
                },
            }).then((response) => {
                console.log('Response:', response); // Kiểm tra response
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'chung-chi-hoan-thanh.pdf');
                document.body.appendChild(link);
                link.click();
            }).catch((error) => {
                console.error('Lỗi tải chứng chỉ:', error);
                this.toast.error('Không thể tải chứng chỉ. Vui lòng thử lại!');
            });
        },

        editNote(id) {
            const note = this.ghi_chu.find(n => n.id === id);
            if (note) {
                this.noi_dung_ghi_chu = note.noi_dung;
                this.idDangChinhSua = note.id;
                this.isGhiChuEditorVisible = true;
            }
        },

        toggleGhiChuEditor() {
            // Toggle việc hiển thị ô nhập ghi chú
            this.isGhiChuEditorVisible = !this.isGhiChuEditorVisible;
        },

        toggleGhiChuList() {
            this.isGhiChuListVisible = !this.isGhiChuListVisible; // Thay đổi trạng thái hiển thị
        },

        toggleTab(index) {
            this.activeTab = this.activeTab === index ? null : index;
        },

        formatTime(time) {
            return dayjs(time).fromNow();
        },

        toggleReply(id) {
            this.id_tra_loi_dang_tra_loi = this.id_tra_loi_dang_tra_loi === id ? null : id;
        },

        luuGhiChu() {
            if (!this.noi_dung_ghi_chu.trim()) {
                this.toast.warning("Vui lòng nhập nội dung ghi chú");
                return;
            }

            const payload = {
                id_khoa_hoc_free: this.id_khoa_hoc_free,
                noi_dung: this.noi_dung_ghi_chu,
            };

            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang"),
            };

            // Nếu đang chỉnh sửa ghi chú
            if (this.idDangChinhSua) {
                axios.put(`http://127.0.0.1:8000/api/ghi-chu-free/${this.idDangChinhSua}`, payload, { headers })
                    .then((res) => {
                        if (res.data.status === 1) {
                            this.toast.success("Ghi chú đã được cập nhật");

                            // Cập nhật ghi chú trong danh sách hiện có
                            const index = this.ghi_chu.findIndex(n => n.id === this.idDangChinhSua);
                            if (index !== -1) {
                                this.ghi_chu[index].noi_dung = this.noi_dung_ghi_chu;
                            }

                            this.resetForm();
                        } else {
                            this.toast.error(res.data.message || "Có lỗi xảy ra khi cập nhật");
                        }
                    })
                    .catch((error) => {
                        console.error("Lỗi khi cập nhật ghi chú:", error);
                        this.toast.error("Không thể cập nhật ghi chú");
                    });
            } else {
                // Tạo mới ghi chú
                axios.post("http://127.0.0.1:8000/api/ghi-chu-free", payload, { headers })
                    .then((res) => {
                        if (res.data.status === 1) {
                            this.toast.success("Ghi chú đã được lưu");
                            this.ghi_chu.push(res.data.data);
                            this.resetForm();
                        } else {
                            this.toast.error(res.data.message || "Có lỗi xảy ra");
                        }
                    })
                    .catch((error) => {
                        console.error("Lỗi khi lưu ghi chú:", error);
                        this.toast.error("Không thể lưu ghi chú");
                    });
            }
        },

        deleteNote(id) {
            Swal.fire({
                title: 'Bạn có chắc muốn xóa?',
                text: "Ghi chú sẽ bị xóa vĩnh viễn!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/ghi-chu-free/${id}`, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang"),
                        },
                    })
                        .then((res) => {
                            if (res.data.status === 1) {
                                // Hiển thị thông báo thành công bằng Toast
                                this.toast.success(res.data.message);

                                this.loadGhiChu(); // Cập nhật danh sách
                            } else {
                                this.toast.error(res.data.message);
                            }
                        })
                        .catch(() => {
                            this.toast.error("Lỗi server khi xóa ghi chú");
                        });
                }
            });
        },

        loadGhiChu() {
            // Tải ghi chú từ server
            axios.get(`http://127.0.0.1:8000/api/ghi-chu-free/${this.id_khoa_hoc_free}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang"),
                },
            })
                .then((res) => {
                    if (res.data.status === 1) {
                        this.ghi_chu = res.data.data;
                    }
                })
                .catch((error) => {
                    console.error("Error loading note:", error);
                });
        },

        likeBinhLuan(bl) {
            axios.post(`http://127.0.0.1:8000/api/binh-luan-free/${bl.id}/like`, {}, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                }
            })
                .then(res => {
                    if (res.data.status === 1) {
                        // ✅ Chỉ cập nhật sau khi server phản hồi
                        bl.likes_count = res.data.likes;
                        bl.da_like = res.data.da_like;
                        this.toast.success(res.data.message);
                    } else {
                        this.toast.warning(res.data.message || "Đã xảy ra lỗi.");
                    }
                })
                .catch(() => {
                    this.toast.error("Vui lòng đăng nhập để thích bình luận.");
                });
        },

        loadBinhLuan() {
            axios.get(`http://127.0.0.1:8000/api/binh-luan-free/${this.id_khoa_hoc_free}`)
                .then((res) => {
                    console.log(res.data);  // Kiểm tra dữ liệu trả về từ backend
                    this.ds_binh_luan = res.data.data;
                    console.log(this.ds_binh_luan);

                    // Duyệt qua các bình luận và đồng bộ likes_count
                    this.ds_binh_luan.forEach(bl => {
                        bl.likes_count = bl.likes_count || 0;
                        bl.da_like = !!bl.da_like;

                        bl.ds_tra_loi.forEach(reply => {
                            reply.likes_count = reply.likes_count || 0;
                            reply.da_like = !!reply.da_like;
                        });
                    });

                    // Cuộn đến cuối phần bình luận sau khi load dữ liệu
                    this.$nextTick(() => {
                        const khung = this.$refs.khungBinhLuan;
                        if (khung) {
                            khung.scrollTop = khung.scrollHeight;
                        }
                    });
                })
                .catch(error => {
                    console.error(error);  // Log thêm lỗi chi tiết để debug
                    this.toast.error("Có lỗi khi tải bình luận.");
                });
        },

        guiBinhLuan() {
            if (!this.noi_dung_binh_luan.trim()) {
                this.toast.warning("Vui lòng nhập nội dung bình luận");
                return;
            }

            const payload = {
                id_khoa_hoc_free: this.id_khoa_hoc_free,
                noi_dung: this.noi_dung_binh_luan
            };

            axios
                .post("http://127.0.0.1:8000/api/binh-luan-free/create", payload, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.toast.success("Cảm ơn bạn đã bình luận về khóa học này");
                        this.noi_dung_binh_luan = "";
                        this.loadBinhLuan();
                    }
                });
        },

        guiTraLoi(id_binh_luan_cha) {
            const noi_dung = this.noi_dung_tra_loi[id_binh_luan_cha];

            if (!noi_dung || !noi_dung.trim()) {
                this.toast.warning("Vui lòng nhập nội dung trả lời");
                return;
            }

            const payload = {
                id_khoa_hoc_free: this.id_khoa_hoc_free,
                binh_luan_id: id_binh_luan_cha,
                noi_dung: noi_dung
            };


            axios.post("http://127.0.0.1:8000/api/tra-loi-binh-luan-free", payload, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                }
            })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.toast.success("Đã gửi trả lời");
                        this.noi_dung_tra_loi[id_binh_luan_cha] = "";
                        this.id_binh_luan_dang_tra_loi = null;
                        this.loadBinhLuan();
                    }
                });
        },

        guiTraLoiCon(id_binh_luan_cha, id_tra_loi_cha) {
            const noi_dung = this.noi_dung_tra_loi_con[id_tra_loi_cha]?.trim();
            if (!noi_dung) {
                this.toast.warning("Vui lòng nhập nội dung phản hồi");
                return;
            }

            if (!id_binh_luan_cha) {
                const binh_luan = this.ds_binh_luan.find(bl =>
                    bl.ds_tra_loi.some(tl => tl.id === id_tra_loi_cha)
                );
                id_binh_luan_cha = binh_luan ? binh_luan.id : null;
            }

            if (!id_binh_luan_cha) {
                this.toast.error("Không tìm thấy ID bình luận cha");
                return;
            }

            const payload = {
                id_khoa_hoc_free: this.id_khoa_hoc_free,
                binh_luan_id: id_binh_luan_cha,
                tra_loi_cha_id: id_tra_loi_cha,
                noi_dung: noi_dung
            };

            axios.post("http://127.0.0.1:8000/api/tra-loi-binh-luan-con-free", payload, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                }
            }).then(({ data }) => {
                if (data.status === 1) {
                    this.toast.success("Đã gửi phản hồi");
                    this.noi_dung_tra_loi_con[id_tra_loi_cha] = "";
                    this.id_tra_loi_dang_tra_loi = null;
                    this.loadBinhLuan();
                }
            }).catch((error) => {
                console.error("Error sending reply:", error);
                this.toast.error("Có lỗi xảy ra khi gửi phản hồi");
            });
        },

        playVideo(value) {
            if (!this.isRegistered) {
                // this.toast.error("Vui lòng ĐĂNG KÝ HỌC để xem bài học!");
                return;
            }
            this.link_video = value.link_bai_hoc;
        },

        formatVND(number) {
            return new Intl.NumberFormat('vi-VI', {
                style: 'currency',
                currency: 'VND'
            }).format(number,)
        },

        confirmDangKyKhoaHoc(id_khoa_hoc_free) {
            Swal.fire({
                title: 'Bạn có chắc chắn?',
                text: "Bạn có muốn đăng ký khóa học này không?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Đăng ký',
                cancelButtonText: 'Hủy'
            }).then((result) => {
                if (result.isConfirmed) {
                    var payload = { id_khoa_hoc: id_khoa_hoc_free };
                    axios.post('http://127.0.0.1:8000/api/khach-hang/khoa-hoc/dang-ki', payload, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang"),
                        },
                    })
                        .then((res) => {
                            if (res.data.status == 1) {
                                this.isRegistered = true;
                                this.toast.success(res.data.message);
                                this.$router.push('/danh-sach-khoa-hoc');
                            } else {
                                this.toast.error(res.data.message);
                            }
                        })
                        .catch((error) => {
                            this.toast.error("Đã xảy ra lỗi, vui lòng thử lại!");
                        });
                }
            });
        },

        dangKyKhoaHoc() {
            if (!this.chi_tiet_khoa_hoc_free || !this.chi_tiet_khoa_hoc_free.id) {
                this.toast.error("Không tìm thấy thông tin khóa học!");
                return;
            }

            var payload = {
                id_khoa_hoc: this.chi_tiet_khoa_hoc_free.id,
                title: this.chi_tiet_khoa_hoc_free.title,
            };

            axios.post(
                "http://127.0.0.1:8000/api/home-page/loai-khoa-hoc-free/dang-ky",
                payload, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                }
            }
            )
                .then((res) => {
                    if (res.data.status == 1) {
                        this.toast.success(res.data.message);
                        this.isRegistered = !!res.data.is_registered;
                        this.$router.push('/danh-sach-khoa-hoc');
                    } else if (res.data.status == 2) {
                        this.toast.warning(res.data.message);
                        this.$router.push('/profile');
                    } else {
                        this.toast.error(res.data.message);
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        this.toast.error(error.response.data.message || "Lỗi từ server!");
                    } else {
                        this.toast.error("Vui lòng đăng nhập để đăng ký khóa học!");
                    }
                });
        },

        loadChiTietKhoaHoc() {
            axios
                .get("http://127.0.0.1:8000/api/home-page/khoa-hoc-free/chi-tiet/" + this.id_khoa_hoc_free
                    , {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang"),
                        },
                    }
                )
                .then((res) => {
                    if (res.data.status == 1) {
                        this.chi_tiet_khoa_hoc_free = res.data.data;
                        this.list_bai_hoc = res.data.list_bai_hoc;
                        this.link_video = this.chi_tiet_khoa_hoc_free.link_gioi_thieu;
                        this.currentLessonId = null;
                        this.initYouTubePlayer(this.link_video);
                        this.isRegistered = !!res.data.is_registered;
                    } else {
                        this.toast.error(res.data.message);
                        this.$router.push('/');
                    }
                });
        },

        resetForm() {
            this.noi_dung_ghi_chu = "";
            this.idDangChinhSua = null;
            this.isGhiChuEditorVisible = false;
        }
    },
}
</script>

<style></style>