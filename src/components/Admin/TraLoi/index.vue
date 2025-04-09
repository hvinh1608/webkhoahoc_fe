<template>
    <div class="container mt-4">
      <h3 class="mb-4 text-center">Quản lý bình luận khóa học</h3>
  
      <div class="list-group">
        <div
          v-for="bl in ds_binh_luan"
          :key="bl.id"
          class="list-group-item shadow-sm rounded-3 mb-3"
        >
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <h6 class="mb-1">
                <i class="bi bi-person-circle text-primary"></i>
                {{ bl.ten_nguoi_dung }}
              </h6>
              <p class="mb-2">{{ bl.noi_dung }}</p>
            </div>
            <span class="badge bg-info text-dark">
              #{{ bl.id }}
            </span>
          </div>
  
          <!-- Danh sách trả lời -->
          <div
            v-if="bl.ds_tra_loi && bl.ds_tra_loi.length"
            class="bg-light p-2 rounded mt-2"
            style="max-height: 200px; overflow-y: auto;"
          >
            <p class="fw-bold mb-2">Trả lời từ Admin:</p>
            <ul class="list-unstyled mb-0">
              <li
                v-for="(traloi, index) in bl.ds_tra_loi"
                :key="index"
                class="mb-1"
              >
                <i class="bi bi-chat-left-quote text-success me-1"></i>
                {{ traloi }}
              </li>
            </ul>
          </div>
  
          <!-- Form trả lời -->
          <div class="input-group mt-3">
            <input
              v-model="bl.tra_loi_admin"
              placeholder="Nhập trả lời mới..."
              class="form-control"
            />
            <button class="btn btn-success" @click="guiTraLoi(bl)">Gửi</button>
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
            ds_binh_luan: []
        };
    },
    mounted() {
        this.loadBinhLuan();
    },
    methods: {
        loadBinhLuan() {
            axios.get(`http://127.0.0.1:8000/api/binh-luan`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("key_admin")}`
                }
            }).then((res) => {
                this.ds_binh_luan = res.data.data.map(bl => ({
                    ...bl,
                    ds_tra_loi: bl.ds_tra_loi || [],
                    tra_loi_admin: ''
                }));

            });
        },
        guiTraLoi(bl) {
            if (!bl.tra_loi_admin.trim()) {
                this.$toast.warning("Vui lòng nhập nội dung trả lời");
                return;
            }

            axios.post(`http://127.0.0.1:8000/api/binh-luan/admin-tra-loi/${bl.id}`, {
                tra_loi: bl.tra_loi_admin
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("key_admin")}`
                }
            }).then(() => {
                bl.ds_tra_loi.push(bl.tra_loi_admin);
                bl.tra_loi_admin = "";
                this.$toast.success("Đã gửi trả lời");
            });
        }
    }
};
</script>
