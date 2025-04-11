<template>
  <div class="container mt-4">
    <h3 class="mb-4 text-center">Quản lý bình luận khóa học</h3>
    <div class="list-group">
      <div v-for="(binhLuans, tenKhoaHoc, index) in binhLuanTheoKhoaHoc" :key="tenKhoaHoc" class="accordion mb-4"
        id="accordionExample">
        <div class="accordion-item border-0 shadow-sm">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse"
              :data-bs-target="'#collapse' + index" aria-expanded="false" :aria-controls="'collapse' + index">
              <i class="bi bi-journal-text me-2"></i> {{ tenKhoaHoc }}
            </button>
          </h2>
          <div :id="'collapse' + index" class="accordion-collapse collapse">
            <div class="accordion-body">
              <!-- Danh sách bình luận trong khóa học -->
              <div v-for="bl in binhLuans" :key="bl.id" class="border-bottom pb-3 mb-3">
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 class="mb-1">
                      <i class="bi bi-person-circle text-primary"></i>
                      {{ bl.ten_nguoi_dung }}
                    </h6>
                    <p class="mb-2">{{ bl.noi_dung }}</p>
                  </div>
                  <div class="text-end">
                    <span class="badge bg-info text-dark">#{{ bl.id }}</span>
                    <button @click="xoaBinhLuan(bl.id)" class="btn btn-link text-danger p-0 ms-2" title="Xóa bình luận">
                      <i class="bi bi-trash3-fill fs-5"></i>
                    </button>
                  </div>
                </div>

                <!-- Trả lời và form như cũ -->
                <div v-if="bl.ds_tra_loi && bl.ds_tra_loi.length" class="bg-light p-2 rounded mt-2"
                  style="max-height: 200px; overflow-y: auto;">
                  <p class="fw-bold mb-2">Trả lời:</p>
                  <ul class="list-unstyled mb-0">
                    <li v-for="(traloi, index) in bl.ds_tra_loi" :key="index"
                      class="mb-1 d-flex justify-content-between align-items-start">
                      <div>
                        <i class="bi bi-chat-left-quote text-success me-1"></i>
                        <strong>
                          {{ traloi.ten_nguoi_dung }}
                          <span v-if="traloi.vai_tro" class="small fw-bold" :class="{
                            'text-danger': traloi.vai_tro === 'Admin',
                            'text-success': traloi.vai_tro === 'Nhân viên',
                            'text-primary': traloi.vai_tro === 'Khách hàng'
                          }">
                            ({{ traloi.vai_tro }})
                          </span>:
                        </strong>
                        {{ traloi.noi_dung }}
                      </div>
                      <button @click="xoaTraLoi(bl, traloi.id)" class="btn btn-link text-danger p-0 ms-2"
                        title="Xóa trả lời">
                        <i class="bi bi-trash3-fill fs-6"></i>
                      </button>
                    </li>
                  </ul>
                </div>
                <div class="input-group mt-3">
                  <input v-model="bl.tra_loi_admin" placeholder="Nhập trả lời mới..." class="form-control" />
                  <button class="btn btn-success" @click="guiTraLoi(bl)">Gửi</button>
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

export default {
  data() {
    return {
      ds_binh_luan: []
    };
  },
  mounted() {
    this.loadBinhLuan();
  },
  computed: {
    binhLuanTheoKhoaHoc() {
      const nhom = {};
      this.ds_binh_luan.forEach(bl => {
        if (!nhom[bl.ten_khoa_hoc]) {
          nhom[bl.ten_khoa_hoc] = [];
        }
        nhom[bl.ten_khoa_hoc].push(bl);
      });
      return nhom;
    }
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
      }).then((res) => {
        const traLoiMoi = res.data.data;

        if (!traLoiMoi?.id) {
          this.$toast.error("Trả lời không hợp lệ, thiếu ID");
          return;
        }

        bl.ds_tra_loi.push(traLoiMoi);
        bl.tra_loi_admin = "";
        this.$toast.success("Đã gửi trả lời");
      });
    }
    ,
    xoaBinhLuan(id) {
      Swal.fire({
        title: 'Xác nhận xóa?',
        text: "Bạn có chắc chắn muốn xóa bình luận này không?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/binh-luan/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("key_admin")}`
            }
          }).then((res) => {
            this.ds_binh_luan = this.ds_binh_luan.filter(bl => bl.id !== id);
            this.$toast.success(res.data.message);
          }).catch((err) => {
            this.$toast.error(err.response?.data?.message || "Xóa thất bại");
          });
        }
      });
    },
    xoaTraLoi(bl, idTraLoi) {
      Swal.fire({
        title: 'Xác nhận xóa?',
        text: "Bạn có chắc chắn muốn xóa trả lời này không?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/tra-loi-binh-luan/${idTraLoi}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("key_admin")}`
            }
          }).then((res) => {
            bl.ds_tra_loi = bl.ds_tra_loi.filter(tl => tl.id !== idTraLoi);
            this.$toast.success(res.data.message);
          }).catch((err) => {
            this.$toast.error(err.response?.data?.message || "Xóa thất bại");
          });
        }
      });
    }

  }
};
</script>
