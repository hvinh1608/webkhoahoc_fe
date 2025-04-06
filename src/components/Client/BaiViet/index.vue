<template>
    <div class="row">
        <div class="col-lg-12 text-center">
            <h2>BÀI VIẾT CỦA CHÚNG TÔI <i class="fa-regular fa-newspaper"></i></h2>
            <p>DZFullStack tổng hợp bài viết kiến thức lập trình, thông báo và tin tức</p>
        </div>
        <hr>
        <div class="col-lg-12">
            <div class="row mt-3">
                <div class="col-lg-12">
                    <h4>BÀI VIẾT MỚI</h4>
                </div>
                <div class="col-lg-12 mt-2">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-4 row-cols-xxl-4 product-grid">
                        <template v-for="(value, index) in displayedArticles" :key="index">
                            <div class="col d-flex">
                                <router-link :to="`/chi-tiet-bai-viet/${value.id}`" class="card-link">
                                    <div class="card rounded-4 flex-fill">
                                        <img :src="value.hinh_anh" class="card-img-top"
                                            style="border-top-left-radius: 20px; border-top-right-radius: 20px; height: 160px;"
                                            alt="Bài viết">
                                        <div class="card-body">
                                            <h5 class="card-title cursor-pointer">{{ value.tieu_de }}</h5>
                                            <p class="card-text">{{ truncateText(value.noi_dung, 100) }}</p>
                                        </div>
                                    </div>
                                </router-link>
                            </div>  
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-12 d-flex justify-content-center mt-3">
            <button class="btn-baiviet cube-baiviet" @click="toggleLimit()">
                <div class="bg-top">
                    <div class="bg-inner"></div>
                </div>
                <div class="bg-right">
                    <div class="bg-inner"></div>
                </div>
                <div class="bg">
                    <div class="bg-inner"></div>
                </div>
                <div class="text">{{ expanded ? 'Thu gọn' : 'Xem thêm' }}</div>
            </button>

        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['slug_chuyen_muc'],
  data() {
    return {
      list_bai_viet: [],
      limit: 4,
      expanded: false,
    };
  },
  computed: {
    displayedArticles() {
      return this.list_bai_viet.slice(0, this.limit);
    },
  },
  mounted() {
    this.loadBaiViet();
  },
  watch: {
    slug_chuyen_muc(newSlug, oldSlug) {
      if (newSlug !== oldSlug) {
        this.loadBaiViet();
      }
    },
  },
  methods: {
    loadBaiViet() {
      axios
        .get("http://127.0.0.1:8000/api/bai-viet/data-open/" + this.slug_chuyen_muc)
        .then((res) => {
          this.list_bai_viet = res.data.data;
        });
    },
    toggleLimit() {
      this.expanded = !this.expanded;
      this.limit = this.expanded ? this.list_bai_viet.length : 4;
    },
    truncateText(text, length) {
      if (!text) return '';
      const plainText = text.replace(/<[^>]*>/g, '');
      return plainText.length > length ? plainText.substring(0, length) + '...' : plainText;
    },
  },
};
</script>


<style scoped>
@import '@/assets/css/commonStyles.css';
</style>
