<template>
    <div class="row">
        <div class="col-lg-6">
            <div class="row">
                <div class="col-lg-12">
                    <h1>{{ chi_tiet_khoa_hoc.ten_khoa_hoc }}</h1>
                    <span>{{ chi_tiet_khoa_hoc.mo_ta_ngan }}</span>
                </div>
                <hr class="mt-3 mb-3">
                <div class="col-lg-12">
                    <h4>{{ $t('course_content') }}</h4>
                    <b>11</b> {{ $t('chapters') }} - <b>138</b> {{ $t('lessons') }} - <b>10 giờ 29 phút</b> {{
                        $t('duration') }}
                </div>
                <div class="mt-2">
                    <label v-if="tong_bai > 0">
                        {{ $t('learning_progress', { done: da_hoc, total: tong_bai, percent: tien_do }) }}
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
                                    <h6>{{ $t('lesson') }}</h6>
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
                                data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <template v-for="(value, index) in listBaiHocWithQuiz" :key="value.id">
                                        <template v-if="check_mua_khoa_hoc === 1">
                                            <div class="d-flex justify-content-between align-items-center"
                                                :class="{ 'opacity-50': !choPhepClick(value, index) }"
                                                @click="choPhepClick(value, index) && (value.is_quiz ? moTracNghiem() : chuyenVideo(value))">
                                                <p>
                                                    <i v-if="!value.is_quiz" class="fa-solid fa-circle-play me-2"
                                                        style="color: red;"></i>
                                                    <i v-else class="fa fa-question-circle text-warning me-2"></i>
                                                    {{ value.tieu_de }}
                                                </p>
                                                <i v-if="(completedLessons.includes(value.id) && !value.is_quiz) || (value.is_quiz && quizFinalDone)"
                                                    class="fa-solid fa-check text-success"></i>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <p>
                                                    <i class="fa-solid fa-circle-play me-2" style="color: red;"></i>
                                                    {{ value.tieu_de }}
                                                </p>
                                            </div>
                                        </template>
                                    </template>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12 mt-4 mb-4">
                    <div class="d-flex justify-content-between align-items-center">
                        <template v-if="tien_do === 100 && quizFinalDone">
                            <button class="cert-download-btn" type="button" @click="taiChungChi()">
                                <span class="cert-download-btn__text">{{ $t('certificate') }}</span>
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

                        <h4 class="">
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
                                {{ idDangChinhSua ? $t('update_note') : $t('save_note') }}
                            </button>

                            <!-- Nút hủy thao tác cập nhật -->
                            <button v-if="idDangChinhSua" class="btn btn-secondary" @click="huyCapNhat()">
                                {{ $t('cancel') }}
                            </button>
                        </div>
                    </div>

                    <!-- Ghi chú đã lưu -->
                    <div v-if="isGhiChuListVisible" class="saved-notes-list">
                        <h5 class="saved-notes-header">{{ $t('saved_notes') }}</h5>
                        <div v-if="ghi_chu.length > 0" class="saved-notes-body">
                            <div v-for="(ghiChu, index) in ghi_chu" :key="ghiChu.id" class="mb-2">
                                <div class="d-flex justify-content-between align-items-start">
                                    <p class="mb-0"><strong>Ghi chú {{ index + 1 }}:</strong> {{ ghiChu.noi_dung }}</p>
                                    <div>
                                        <!-- Icon chỉnh sửa -->
                                        <i class="fa fa-edit text-warning me-2" style="cursor: pointer;"
                                            @click="editNote(ghiChu.id)" :title="$t('edit')"></i>

                                        <!-- Icon xóa -->
                                        <i class="fa fa-trash text-danger" style="cursor: pointer;"
                                            @click="deleteNote(ghiChu.id)" :title="$t('delete')"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p v-else class="text-muted">{{ $t('no_notes') }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div id="yt-player" style="width: 100%; height: 515px; border-radius: 20px;"></div>
            <h4 class="text-danger mt-2 text-center">
                {{ isRegistered ? formatVND(0) : formatVND(chi_tiet_khoa_hoc.gia_ban) }}
            </h4>
            <div class="d-flex justify-content-center">
                <button class="btn-register" v-on:click="confirmMuaKhoaHoc()" v-if="!isRegistered">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
                        <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
                    </svg>
                    {{ $t('register') }}
                </button>
                <button class="btn-register" v-if="isRegistered" disabled>
                    {{ $t('registered') }}
                </button>
            </div>

            <div class="d-flex justify-content-between mt-3">
                <p><i class="fa-solid fa-gauge-high"></i> {{ $t('basic_level') }}</p>
                <p><i class="fa-solid fa-film"></i> {{ $t('total_lessons', { count: 138 }) }}</p>
                <p><i class="fa-solid fa-clock"></i> {{ $t('total_duration', { time: '10 giờ 29 phút' }) }}</p>
                <p><i class="fa-solid fa-battery-full"></i> {{ $t('learn_anywhere') }}</p>
            </div>
        </div>

        <div class="col-lg-12">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h4 class="text-body mb-0">{{ $t('course_comments') }}</h4>
            </div>

            <!-- Form bình luận -->
            <div class="card mb-4">
                <div class="card-body">
                    <textarea class="form-control mb-2" v-model="noi_dung_binh_luan" rows="3"
                        :placeholder="$t('write_comment')"></textarea>
                    <button class="btn btn-primary" @click="guiBinhLuan()">{{ $t('send_comment') }}</button>
                </div>
            </div>

            <!-- Khung cuộn danh sách bình luận -->
            <div class="card mb-4" style="max-height: 500px; overflow-y: auto;" ref="khungBinhLuan">
                <div class="card-body">
                    <CommentItem v-for="bl in ds_binh_luan" :key="bl.id" :comment="bl" :depth="0"
                        :replying-id="id_tra_loi_dang_tra_loi" :id-binh-luan-goc="bl.id"
                        @reply="id_tra_loi_dang_tra_loi = $event" @send-reply="guiTraLoiCon" @like="likeBinhLuan" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CommentItem from '@/components/KhachHang/BinhLuan/index.vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
import { useToast } from 'vue-toastification';
dayjs.extend(relativeTime);
dayjs.locale('vi');
export default {
    components: { CommentItem },
    props: ['id_khoa_hoc', 'slug_khoa_hoc'],
    data() {
        return {
            id_khoa_hoc: this.$route.params.id_khoa_hoc,
            chi_tiet_khoa_hoc: {},
            list_bai_hoc: [],
            link_video: "",
            check_mua_khoa_hoc: false,
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
            quizFinalDone: false,
        }
    },
    setup() {
        const toast = useToast();
        return { toast };
    },
    mounted() {
        this.loadChiTietKhoaHoc();
        this.checkMuaKhoaHoc();
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
        },

        listBaiHocWithQuiz() {
            if (this.check_mua_khoa_hoc == 1) {
                return [
                    ...this.list_bai_hoc,
                    {
                        id: 'quiz-final',
                        tieu_de: 'Trắc nghiệm cuối khóa',
                        is_quiz: true
                    }
                ];
            }
            return this.list_bai_hoc;
        },
    },

    methods: {
        moTracNghiem() {
            this.$router.push(`/khoa-hoc/${this.chi_tiet_khoa_hoc.id}/trac-nghiem`);
        },

        chuyenVideo(baiHoc) {
            this.link_video = baiHoc.link_bai_hoc; // Lưu link video
            this.currentLessonId = baiHoc.id; // Lưu ID bài học hiện tại

            // Khởi tạo hoặc tải video mới vào trình phát
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
                const currentTime = this.player.getCurrentTime();
                const duration = this.player.getDuration();

                if (currentTime >= duration * 0.0) {
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
            axios.post('http://127.0.0.1:8000/api/danh-dau-hoan-thanh', {
                bai_hoc_id: this.currentLessonId, // ID bài học hiện tại
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
            axios.get('http://127.0.0.1:8000/api/tien-do-khoa-hoc/' + this.id_khoa_hoc, {
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
                        this.quizFinalDone = !!res.data.quiz_final_done;
                    }
                })
                .catch(error => {
                    console.error('Lỗi lấy tiến độ:', error);
                });
        },

        choPhepClick(value, index) {
            // Nếu là bài đầu tiên, cho học luôn
            if (index === 0) return true;

            // Nếu là trắc nghiệm, chỉ cho làm nếu đã học hết tất cả bài học (trừ trắc nghiệm)
            if (value.is_quiz) {
                return this.completedLessons.length === this.listBaiHocWithQuiz.length - 1;
            }

            // Với các bài học thường, phải học xong bài trước
            const baiTruocId = this.listBaiHocWithQuiz[index - 1].id;
            return this.completedLessons.includes(baiTruocId);
        },

        taiChungChi() {
            axios.get(`http://127.0.0.1:8000/api/loai-khoa-hoc/${this.id_khoa_hoc}/chung-chi`, {
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

        huyCapNhat() {
            this.idDangChinhSua = null;
            this.noi_dung_ghi_chu = "";
            this.isGhiChuEditorVisible = false;
        },

        editNote(id) {
            const note = this.ghi_chu.find(n => n.id === id);
            if (note) {
                this.noi_dung_ghi_chu = note.noi_dung;
                this.idDangChinhSua = note.id;
                this.isGhiChuEditorVisible = true;
            }
        },

        formatTime(time) {
            return dayjs(time).fromNow();
        },

        toggleGhiChuEditor() {
            // Toggle việc hiển thị ô nhập ghi chú
            this.isGhiChuEditorVisible = !this.isGhiChuEditorVisible;
        },

        toggleGhiChuList() {
            this.isGhiChuListVisible = !this.isGhiChuListVisible; // Thay đổi trạng thái hiển thị
        },

        toggleReply(id) {
            this.id_tra_loi_dang_tra_loi = this.id_tra_loi_dang_tra_loi === id ? null : id;
        },

        toggleTab(index) {
            this.activeTab = this.activeTab === index ? null : index;
        },

        luuGhiChu() {
            if (!this.noi_dung_ghi_chu.trim()) {
                this.toast.warning("Vui lòng nhập nội dung ghi chú");
                return;
            }

            const payload = {
                id_khoa_hoc: this.id_khoa_hoc,
                noi_dung: this.noi_dung_ghi_chu,
            };

            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang"),
            };

            // Nếu đang chỉnh sửa ghi chú
            if (this.idDangChinhSua) {
                axios.put(`http://127.0.0.1:8000/api/ghi-chu/${this.idDangChinhSua}`, payload, { headers })
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
                axios.post("http://127.0.0.1:8000/api/ghi-chu", payload, { headers })
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
                title: this.$t('delete_confirm'),
                text: this.$t('delete_confirm_text'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: this.$t('delete'),
                cancelButtonText: this.$t('cancel_btn')
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/ghi-chu/${id}`, {
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
            axios.get(`http://127.0.0.1:8000/api/ghi-chu/${this.id_khoa_hoc}`, {
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
            console.log('Like object:', bl);
            if (!bl.binh_luan_id || bl.id === bl.binh_luan_id) {
                // Bình luận gốc
                axios.post(`http://127.0.0.1:8000/api/binh-luan/${bl.id}/like`, {}, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                    }
                })
                    .then(res => {
                        if (res.data.status === 1) {
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
            } else {
                // Trả lời con
                axios.post(`http://127.0.0.1:8000/api/tra-loi-binh-luan/${bl.id}/like`, {}, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                    }
                })
                    .then(res => {
                        if (res.data.status === 1) {
                            bl.likes_count = res.data.likes;
                            bl.da_like = res.data.da_like;
                            this.toast.success(res.data.message);
                        } else {
                            this.toast.warning(res.data.message || "Đã xảy ra lỗi.");
                        }
                    })
                    .catch(() => {
                        this.toast.error("Vui lòng đăng nhập để thích trả lời.");
                    });
            }
        },

        loadBinhLuan() {
            axios.get(`http://127.0.0.1:8000/api/binh-luan/${this.id_khoa_hoc}`)
                .then((res) => {
                    console.log(res.data);  // Kiểm tra dữ liệu trả về từ backend
                    this.ds_binh_luan = res.data.data;


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
                id_khoa_hoc: this.id_khoa_hoc,
                noi_dung: this.noi_dung_binh_luan
            };

            axios
                .post("http://127.0.0.1:8000/api/binh-luan/create", payload, {
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
                id_khoa_hoc: this.id_khoa_hoc,
                binh_luan_id: id_binh_luan_cha,
                noi_dung: noi_dung,
                tra_loi_cha_id: id_binh_luan_cha
            };


            axios.post("http://127.0.0.1:8000/api/tra-loi-binh-luan", payload, {
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

        guiTraLoiCon({ id_binh_luan_cha, id_tra_loi_cha, noi_dung }) {
            if (!noi_dung || !noi_dung.trim()) {
                this.toast.warning("Vui lòng nhập nội dung phản hồi");
                return;
            }

            const payload = {
                id_khoa_hoc: this.id_khoa_hoc,
                binh_luan_id: id_binh_luan_cha,
                tra_loi_cha_id: id_tra_loi_cha,
                noi_dung: noi_dung
            };

            axios.post("http://127.0.0.1:8000/api/tra-loi-binh-luan-con", payload, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                }
            }).then(({ data }) => {
                if (data.status === 1) {
                    this.toast.success("Đã gửi phản hồi");
                    this.id_tra_loi_dang_tra_loi = null;
                    this.loadBinhLuan();

                    console.log(this.ds_binh_luan);
                }
            }).catch((error) => {
                console.error("Error sending reply:", error);
                this.toast.error("Có lỗi xảy ra khi gửi phản hồi");
            });
        },

        checkMuaKhoaHoc() {
            var payload = {
                id_khoa_hoc: this.id_khoa_hoc
            };
            axios
                .post("http://127.0.0.1:8000/api/check-mua-khoa-hoc", payload, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                    }
                })
                .then((res) => {
                    this.check_mua_khoa_hoc = res.data.status;
                    if (this.check_mua_khoa_hoc === 1) {
                        this.isRegistered = true;
                    }
                }).catch((res) => {
                    this.toast.error('Vui lòng đăng nhập để mua khóa học');
                })
        },

        confirmMuaKhoaHoc() {
            Swal.fire({
                title: this.$t('confirm_register'),
                text: this.$t('confirm_register_text'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: this.$t('confirm')
            }).then((result) => {
                if (result.isConfirmed) {
                    this.muaKhoaHoc();
                }
            })
        },

        muaKhoaHoc() {
            var payload = {
                id_khoa_hoc: this.id_khoa_hoc,
                so_tien_mua: this.chi_tiet_khoa_hoc.gia_ban,
                ten_khoa_hoc: this.chi_tiet_khoa_hoc.ten_khoa_hoc
            }
            axios
                .post("http://127.0.0.1:8000/api/home-page/mua-khoa-hoc/create", payload, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.toast.success(res.data.message)
                        this.isRegistered = true;
                        this.$router.push('/danh-sach-khoa-hoc')
                    }
                    else if (res.data.status == 2) {
                        this.toast.warning(res.data.message);
                        this.$router.push('/profile')
                    }
                    else {
                        this.toast.error(res.data.message);
                    }
                }).catch((res) => {
                    this.toast.error('Vui lòng đăng nhập để mua khóa học');
                })
        },

        formatVND(number) {
            return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(number);
        },

        loadChiTietKhoaHoc() {
            axios
                .get("http://127.0.0.1:8000/api/home-page/loai-khoa-hoc/chi-tiet/" + this.id_khoa_hoc)
                .then((res) => {
                    if (res.data.status == 1) {
                        this.chi_tiet_khoa_hoc = res.data.data;
                        this.list_bai_hoc = res.data.list_bai_hoc;
                        console.log(this.list_bai_hoc);
                        this.link_video = this.chi_tiet_khoa_hoc.link_gioi_thieu;
                        this.currentLessonId = null;
                        this.initYouTubePlayer(this.link_video);
                    }
                    else {
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
<style>
.opacity-50 {
    opacity: 0.5;
    pointer-events: none;
}
</style>
