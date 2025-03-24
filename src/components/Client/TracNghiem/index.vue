<template>
    <div class="row">
        <template v-for="(v, k) in list" :key="k">
            <div class="col-lg-4 d-flex">
                <div class="card flex-fill">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title" :class="{ 'text-danger': !v.dap_an }">{{ v.cau_hoi }}</h5>
                        <hr class="mt-auto">
                        <div class="quiz-radiogroup">
                            <div v-for="i in 4" :key="i" class="quiz-wrapper">
                                <input v-model="v.dap_an" class="quiz-state" type="radio" :value="i" :name="'flexRadioDefault' + k" :id="'radio-' + k + '-' + i">
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
            <button v-on:click="nopBai()" class="btn button-nopbai">
                <h4 class="mt-2">HOÀN THÀNH</h4>
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            list: [],
        };
    },
    mounted() {
        this.loadTracNghiem();
    },
    methods: {
        loadTracNghiem() {
            axios
                .get("http://127.0.0.1:8000/api/trac-nghiem/data-open", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang"),
                    },
                })
                .then((res) => {
                    this.list = res.data.data;
                });
        },
        nopBai() {
            let payload = {
                list: this.list,
            };
            axios
                .post("http://127.0.0.1:8000/api/trac-nghiem/nop-bai", payload, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_khach_hang"),
                    },
                })
                .then((res) => {
                    this.$toast.success('Số câu đúng là: ' + res.data.so_cau_dung + ' câu');
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                });
        },
    },
};
</script>

<style>
</style>