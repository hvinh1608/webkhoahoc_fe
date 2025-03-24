<template>
    <div class="chatbox-container">
        <button class="chat-toggle" @click="toggleChat">
            {{ isOpen ? "✖" : "💬" }}
        </button>

        <div v-if="isOpen" class="chatbox">
            <div class="chatbox-header">
                <img src="https://play-lh.googleusercontent.com/hk5zZ8Xup9HgoP-Xxgoav8geLOAPn2X_a8_fcYJA02uYt8CbxQBkkMChi5gbq5goNA"
                    alt="Chat Icon" class="chatbox-icon" />
                <span class="chatbox-title">Chatbot Hỗ trợ</span>
            </div>
            <div class="messages">
                <div v-for="(msg, index) in messages" :key="index" :class="msg.role">
                    {{ msg.content }}
                </div>
            </div>
            <div class="chat-input-container">
                <div class="chat-message-box">
                    <div class="chat-file-upload">
                        <label for="chat-file-input" class="chat-file-label">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 337 337">
                                <circle stroke-width="20" stroke="#6c6c6c" fill="none" r="158.5" cy="168.5" cx="168.5">
                                </circle>
                                <path stroke-linecap="round" stroke-width="25" stroke="#6c6c6c" d="M167.759 79V259">
                                </path>
                                <path stroke-linecap="round" stroke-width="25" stroke="#6c6c6c" d="M79 167.138H259">
                                </path>
                            </svg>
                            <span class="chat-tooltip">Thêm ảnh</span>
                        </label>
                        <input type="file" id="chat-file-input" @change="handleFileUpload" />
                    </div>
                    <input v-model="userMessage" @keyup.enter="sendMessage" class="chat-input-field"
                        placeholder="Nhập tin nhắn..." />
                    <button @click="sendMessage" class="chat-send-button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
                            <path fill="none"
                                d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888">
                            </path>
                            <path stroke-linejoin="round" stroke-linecap="round" stroke-width="33.67" stroke="#6c6c6c"
                                d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            userMessage: "",
            messages: JSON.parse(localStorage.getItem("chatHistory")) || [],
            API_KEY: "AIzaSyBxb5xkAwdqHk66HimRLusaIfcNZbe0JwQ", // Thay bằng API Key của bạn
            isOpen: false,
        };
    },
    mounted() {
        // Kiểm tra nếu chưa có lịch sử trò chuyện (lần đầu mở)
        if (this.messages.length === 0) {
            this.messages.push({ role: "assistant", content: "Chào bạn! Tôi có thể giúp gì cho bạn về các khóa học lập trình?" });
            this.saveMessages();  // Lưu lời chào vào lịch sử
        }
    },
    methods: {
        async sendMessage() {
            if (!this.userMessage.trim()) return;

            // Thêm tin nhắn người dùng vào lịch sử
            this.messages.push({ role: "user", content: this.userMessage });
            this.saveMessages();

            try {
                // Gửi yêu cầu API mà không kiểm tra xem câu hỏi có liên quan đến lập trình hay không
                const response = await axios.post(
                    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${this.API_KEY}`,
                    {
                        contents: [{ role: "user", parts: [{ text: this.userMessage }] }]
                    }
                );

                const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Không có phản hồi!";
                this.messages.push({ role: "assistant", content: reply });
                this.saveMessages();
            } catch (error) {
                console.error("Lỗi:", error);
                this.messages.push({ role: "assistant", content: "Lỗi khi gọi API!" });
                this.saveMessages();
            }

            this.userMessage = "";  // Reset input sau khi gửi
        },
        saveMessages() {
            localStorage.setItem("chatHistory", JSON.stringify(this.messages));
        },
        toggleChat() {
            this.isOpen = !this.isOpen;
        }
    }
};
</script>

<style scoped>
@import '@/assets/css/commonStyles.css';
</style>