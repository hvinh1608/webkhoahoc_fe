<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-lg-12">
          <h1>{{ baiViet.tieu_de }}</h1>
          <img :src="baiViet.hinh_anh" class="img-fluid rounded-4 d-block mx-auto"  alt="Hình ảnh bài viết">
          <p class="text-muted mt-2"><strong>Mô tả:</strong> {{ baiViet.mo_ta_ngan }}</p>
          <hr>
          <div v-html="baiViet.noi_dung" class="content"></div>
        </div>
      </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
  props: ["id"],
  data() {
    return {
      baiViet: {}
    };
  },
  mounted() {
    this.loadChiTietBaiViet();
  },
  methods: {
    loadChiTietBaiViet() {
      axios.get(`http://127.0.0.1:8000/api/bai-viet/${this.id}`)
        .then((res) => {
          this.baiViet = res.data.data;
        })
        .catch(() => {
          this.$toast.error("Lỗi khi tải chi tiết bài viết!");
        });
    }
  }
};
</script>
  
<style scoped>
@import '@/assets/css/commonStyles.css';
</style>
