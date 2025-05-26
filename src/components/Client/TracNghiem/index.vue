<template>
    <div class="row">
        <template v-for="(v, k) in list" :key="k">
            <div class="col-lg-4 d-flex">
                <div class="card flex-fill">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title" :class="{ 'text-danger': !v.dap_an }">
                            Câu {{ k + 1 }}: {{ v.cau_hoi }}
                        </h5>
                        <hr class="mt-auto">
                        <div class="quiz-radiogroup">
                            <div v-for="i in 4" :key="i" class="quiz-wrapper">
                                <input v-model="v.dap_an" class="quiz-state" type="radio" :value="i"
                                    :name="'flexRadioDefault' + k" :id="'radio-' + k + '-' + i">
                                <label :for="'radio-' + k + '-' + i" class="quiz-label">
                                    <div class="quiz-indicator"></div>
                                    <span class="quiz-text">{{ v['dap_an_' + i] }}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>

    <div class="row">
        <div class="col-lg-12 d-flex justify-content-center">
            <button :disabled="isSubmitting" @click="nopBai()" class="btn button-nopbai">
                <h4 class="mt-2">HOÀN THÀNH</h4>
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';
const toast = useToast();
export default {
    data() {
        return {
            list: [],
            khoaHocId: this.$route.params.id,
            slugKhoaHoc: this.$route.query.slug || '',
            isSubmitting: false,
        };
    },
    mounted() {
        this.khoaHocId = this.$route.params.id;
        this.loadKhoaHocSlug();
        this.loadTracNghiem();
    },
    methods: {
        loadKhoaHocSlug() {
            axios.get(`http://127.0.0.1:8000/api/home-page/loai-khoa-hoc/chi-tiet/${this.khoaHocId}`)
                .then(res => {
                    this.slugKhoaHoc = res.data.data.slug_khoa_hoc;
                });
        },
        loadTracNghiem() {
            axios
                .get(`http://127.0.0.1:8000/api/trac-nghiem/khoa-hoc/${this.khoaHocId}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang"),
                    },
                })
                .then((res) => {
                    this.list = res.data.data;
                });
        },
        nopBai() {
            // Kiểm tra còn câu nào chưa chọn đáp án
            const chuaChon = this.list.some(item => !item.dap_an);
            if (chuaChon) {
                toast.error(this.$t('must_answer_all_questions'));
                return;
            }
            this.isSubmitting = true;
            let payload = {
                list: this.list,
                khoa_hoc_id: this.khoaHocId,
            };
            axios
                .post("http://127.0.0.1:8000/api/trac-nghiem/nop-bai-tn", payload, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang"),
                    },
                })
                .then((res) => {
                    const soCauDung = res.data.so_cau_dung;
                    const tongCau = this.list.length;
                    const soCauSai = tongCau - soCauDung;
                    const diem = Math.round((soCauDung / tongCau) * 100);
                    toast.success(this.$t('correct_answers', { count: soCauDung }));
                    toast.info(this.$t('wrong_answers', { count: soCauSai }));
                    toast.info(this.$t('score', { correct: soCauDung, total: tongCau }));
                    if (soCauSai > 2) {
                        toast.error(this.$t('must_have_less_than_3_wrong'));
                        this.isSubmitting = false;
                        return;
                    }
                    this.$router.push(`/chi-tiet-khoa-hoc/${this.khoaHocId}-${this.slugKhoaHoc}`);
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        toast.error(v[0]);
                    });
                    this.isSubmitting = false;
                });
        }
    },
};
</script>

<style></style>