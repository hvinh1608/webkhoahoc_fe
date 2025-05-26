<template>
    <div class="onboarding-page">
        <h2>Chào mừng bạn!</h2>
        <form @submit.prevent="submit">
            <div>
                <label>Bạn là:</label>
                <select v-model="job" required>
                    <option value="">Chọn</option>
                    <option value="student">Học sinh/Sinh viên</option>
                    <option value="teacher">Giáo viên</option>
                    <option value="developer">Lập trình viên</option>
                    <option value="other">Khác</option>
                </select>
            </div>
            <div>
                <label>Bạn đang làm việc ở đâu?</label>
                <select v-model="workplace" required>
                    <option value="">Chọn</option>
                    <option value="school">Trường học</option>
                    <option value="company">Công ty</option>
                    <option value="freelance">Freelancer</option>
                    <option value="other">Khác</option>
                </select>
            </div>
            <div>
                <label>Bạn dùng web để làm gì?</label>
                <select v-model="purpose" required>
                    <option value="">Chọn</option>
                    <option value="study">Học tập</option>
                    <option value="teach">Giảng dạy</option>
                    <option value="work">Làm việc</option>
                    <option value="explore">Khám phá kiến thức mới</option>
                    <option value="other">Khác</option>
                </select>
            </div>
            <div>
                <label>Kinh nghiệm lập trình:</label>
                <select v-model="experience" required>
                    <option value="">Chọn</option>
                    <option value="none">Chưa có</option>
                    <option value="basic">Cơ bản</option>
                    <option value="intermediate">Trung bình</option>
                    <option value="advanced">Nâng cao</option>
                </select>
            </div>
            <div>
                <label>Độ tuổi:</label>
                <select v-model="age" required>
                    <option value="">Chọn</option>
                    <option value="under18">Dưới 18</option>
                    <option value="18-24">18-24</option>
                    <option value="25-34">25-34</option>
                    <option value="35-44">35-44</option>
                    <option value="45plus">Trên 45</option>
                </select>
            </div>
            <button type="submit" :disabled="isSubmitting">Gửi</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            job: "",
            workplace: "",
            purpose: "",
            experience: "",
            age: "",
            isSubmitting: false,
        };
    },
    methods: {
        submit() {
            if (this.isSubmitting) return;
            this.isSubmitting = true;
            axios.post("http://127.0.0.1:8000/api/onboarding-survey", {
                job: this.job,
                workplace: this.workplace,
                purpose: this.purpose,
                experience: this.experience,
                age: this.age,
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("key_khach_hang"),
                },
            })
                .then(() => {
                    localStorage.setItem("showTourAfterOnboarding", "1");
                    this.$router.replace("/trang-chu");
                })
                .catch(() => {
                    this.$toast.error("Có lỗi xảy ra trong quá trình gửi thông tin. Vui lòng thử lại sau.");
                })
                .finally(() => {
                    this.isSubmitting = false;
                });
        },
    },
};
</script>
<style scoped>
.onboarding-page {
    max-width: 420px;
    margin: 60px auto;
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    padding: 36px 32px 28px 32px;
    font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
    animation: fadeIn 0.7s;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.onboarding-page h2 {
    margin-bottom: 28px;
    color: #2563eb;
    text-align: center;
    font-weight: 700;
    letter-spacing: 1px;
}

.onboarding-page form>div {
    margin-bottom: 22px;
}

.onboarding-page label {
    font-weight: 500;
    margin-bottom: 7px;
    display: block;
    color: #22223b;
    letter-spacing: 0.2px;
}

.onboarding-page select {
    width: 100%;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid #d0d7de;
    background: #f8fafc;
    font-size: 15px;
    transition: border 0.2s;
    outline: none;
}

.onboarding-page select:focus {
    border-color: #2563eb;
    background: #fff;
}

.onboarding-page button {
    background: linear-gradient(90deg, #2563eb 0%, #4f8cff 100%);
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 12px 0;
    width: 100%;
    font-size: 17px;
    font-weight: 600;
    margin-top: 10px;
    box-shadow: 0 2px 8px rgba(79, 140, 255, 0.08);
    cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s;
}

.onboarding-page button:disabled {
    background: #b3cdfd;
    cursor: not-allowed;
    box-shadow: none;
}

.onboarding-page select,
.onboarding-page button {
    box-sizing: border-box;
}
</style>