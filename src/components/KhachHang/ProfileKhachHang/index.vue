<template>
    <div class="profile-container" v-if="profile">
        <h2>Thông tin khách hàng</h2>
        <img :src="profile.avatar ? 'http://127.0.0.1:8000/storage/avatars/' + profile.avatar : 'https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/09/19/465/avatar-trang-1.jpg'"
            alt="avatar" class="avatar" />
        <p><b>Họ tên:</b> {{ profile.ho_va_ten }}</p>
        <p><b>Email:</b> {{ profile.email }}</p>
        <p><b>Số điện thoại:</b> {{ profile.so_dien_thoai }}</p>
        <p><b>Ngày sinh:</b> {{ profile.ngay_sinh }}</p>
        <p><b>Số bài học đã hoàn thành:</b> {{ profile.bai_hoan_thanh }}</p>
        <p><b>Chuỗi ngày học:</b> {{ profile.streak }}</p>
        <p><b>Khóa học đã hoàn thành:</b></p>
        <ul>
            <li v-for="(khoa, idx) in profile.khoa_da_hoan_thanh" :key="idx">{{ khoa }}</li>
        </ul>
    </div>
    <div v-else>
        <p>Đang tải thông tin...</p>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            profile: null,
        };
    },
    mounted() {
        this.loadProfile();
    },
    methods: {
        loadProfile() {
            const id = this.$route.params.id;
            axios.get(`http://127.0.0.1:8000/api/thong-tin-khach-hang/${id}`)
                .then(res => {
                    this.profile = res.data;
                })
                .catch(() => {
                    this.profile = null;
                });
        }
    }
}
</script>

<style scoped>
.profile-container {
    max-width: 450px;
    margin: 48px auto 32px auto;
    background: linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%);
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(80, 80, 180, 0.16);
    padding: 40px 32px 32px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
    position: relative;
    border: 1.5px solid #e0e7ff;
    transition: box-shadow 0.3s;
}

.profile-container:hover {
    box-shadow: 0 12px 40px rgba(80, 80, 180, 0.22);
}

.profile-container h2 {
    font-size: 2.1rem;
    font-weight: 800;
    color: #3730a3;
    margin-bottom: 22px;
    letter-spacing: 1px;
    text-shadow: 0 2px 8px #e0e7ff;
}

.avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 22px;
    border: 5px solid #6366f1;
    background: #f3f4f6;
    box-shadow: 0 4px 18px rgba(99, 102, 241, 0.13);
    transition: border 0.3s;
}

.profile-container p {
    font-size: 1.13rem;
    color: #444;
    margin: 10px 0 0 0;
    width: 100%;
    text-align: left;
    line-height: 1.6;
}

.profile-container b {
    color: #3730a3;
    font-weight: 700;
}

.profile-container ul {
    width: 100%;
    padding-left: 22px;
    margin: 10px 0 0 0;
    list-style: none;
}

.profile-container li {
    font-size: 1.04rem;
    color: #555;
    margin-bottom: 6px;
    position: relative;
    padding-left: 24px;
    transition: color 0.2s;
}

.profile-container li::before {
    content: "★";
    color: #6366f1;
    position: absolute;
    left: 0;
    font-size: 1.1em;
    top: 0;
    opacity: 0.7;
}

@media (max-width: 600px) {
    .profile-container {
        padding: 18px 6px 14px 6px;
        max-width: 98vw;
    }

    .avatar {
        width: 80px;
        height: 80px;
    }

    .profile-container h2 {
        font-size: 1.2rem;
    }
}
</style>