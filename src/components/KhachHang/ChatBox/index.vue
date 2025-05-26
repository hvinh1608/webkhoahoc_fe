<template>
    <div class="chatbox-container">
        <button class="chat-toggle" v-if="!isOpen" @click="toggleChat">
            <i class="fa-solid fa-headset"></i>
        </button>
        <div class="chatbox-greeting" v-if="!isOpen">
            Chào bạn! Tôi có thể giúp gì cho bạn về các khóa học lập trình?
        </div>
        <div v-if="isOpen" class="chatbox">
            <div class="chatbox-header">
                <img src="https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg?semt=ais_hybrid&w=740"
                    alt="Chat Icon" class="chatbox-icon" />
                <span class="chatbox-title">Chatbot Hỗ trợ</span>
                <div style="margin-left:auto; display:flex; gap:8px;">
                    <button class="clear-history-btn" @click="clearMessages" title="Xóa lịch sử">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                            <path stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                d="M3 6h18M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z" />
                        </svg>
                    </button>
                    <button class="chat-close-btn" @click="toggleChat">✖</button>
                </div>
            </div>
            <div class="messages">
                <div v-for="(msg, index) in messages" :key="index" :class="['chat-message', msg.role]">
                    <img v-if="msg.role === 'assistant'"
                        src="https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg?semt=ais_hybrid&w=740"
                        class="avatar" />
                    <img v-else src="https://cdn-icons-png.flaticon.com/512/149/149071.png" class="avatar" />
                    <div class="bubble">
                        <span v-html="msg.content"></span>
                        <span class="msg-time">{{ msg.time }}</span>
                    </div>
                </div>
            </div>
            <div v-if="isLoading" class="chat-loading">Đang trả lời...</div>
            <div class="suggestions" v-if="messages.length === 1">
                <p>📌 Bạn có thể thử một trong các câu hỏi sau:</p>
                <button v-for="(question, index) in suggestions" :key="index" class="suggestion-btn"
                    @click="handleSuggestionClick(question)">
                    {{ question }}
                </button>
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
                    <input v-model="userMessage" @keyup.enter="sendMessage" @keydown.enter.shift.prevent
                        class="chat-input-field" placeholder="Nhập tin nhắn..." />
                    <button @click="sendMessage" class="chat-send-button" :disabled="isLoading || !userMessage.trim()">
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
            messages: [],
            API_KEY: "AIzaSyBxb5xkAwdqHk66HimRLusaIfcNZbe0JwQ",
            isOpen: false,
            suggestions: [
                "Khóa học nào phù hợp cho người mới bắt đầu?",
                "Khóa học JavaScript có những nội dung gì?",
                "Tôi có thể học thử trước khi đăng ký không?"
            ],
            isLoading: false,
        };
    },
    mounted() {
        axios.get('http://127.0.0.1:8000/api/chat/history', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("key_khach_hang"),
            }
        }).then(res => {
            this.messages = res.data && res.data.length ? res.data : [{
                role: "assistant",
                content: "Chào bạn! Tôi có thể giúp gì cho bạn về các khóa học lập trình?",
                time: new Date().toLocaleTimeString()
            }];
            this.scrollToBottom();
        }).catch(() => {
            this.messages = [{
                role: "assistant",
                content: "Chào bạn! Tôi có thể giúp gì cho bạn về các khóa học lập trình?",
                time: new Date().toLocaleTimeString()
            }];
            this.scrollToBottom();
        });
    },
    methods: {
        clearMessages() {
            this.messages = [];
            this.saveMessages();
        },
        scrollToBottom() {
            this.$nextTick(() => {
                const messagesDiv = this.$el.querySelector('.messages');
                if (messagesDiv) messagesDiv.scrollTop = messagesDiv.scrollHeight;
            });
        },
        handleSuggestionClick(question) {
            this.userMessage = question;
            this.sendMessage();
        },
        sendMessage() {
            if (!this.userMessage.trim()) return;
            this.isLoading = true;
            this.messages.push({ role: "user", content: this.userMessage, time: new Date().toLocaleTimeString() });
            this.saveMessages();
            this.scrollToBottom();

            axios.post(
                `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${this.API_KEY}`,
                {
                    contents: [
                        {
                            role: "user",
                            parts: [{
                                text:
                                    "Bạn là trợ lý AI chỉ trả lời các câu hỏi liên quan đến lập trình, công nghệ, hoặc khóa học lập trình. Nếu câu hỏi không liên quan, hãy lịch sự từ chối trả lời.\n\nCâu hỏi: " +
                                    this.userMessage
                            }]
                        }
                    ]
                }
            )
                .then(response => {
                    const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Không có phản hồi!";
                    this.messages.push({
                        role: "assistant",
                        content: reply,
                        time: new Date().toLocaleTimeString()
                    });
                    this.saveMessages();
                    this.scrollToBottom();
                })
                .catch(error => {
                    console.error("Lỗi:", error);
                    this.messages.push({ role: "assistant", content: "Lỗi khi gọi API!" });
                    this.saveMessages();
                    this.scrollToBottom();
                })
                .finally(() => {
                    this.isLoading = false;
                    this.userMessage = "";
                });
        },

        saveMessages() {
            axios.post('http://127.0.0.1:8000/api/chat/save', {
                messages: this.messages
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("key_khach_hang"),
                }
            });
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append('file', file);

            // Gửi file lên backend
            axios.post('http://127.0.0.1:8000/api/chat/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: "Bearer " + localStorage.getItem("key_khach_hang"),
                }
            })
                .then(res => {
                    // Sau khi upload thành công, thêm tin nhắn file vào messages
                    if (res.data.url) {
                        this.messages.push({
                            role: "user",
                            content: `<a href="${res.data.url}" target="_blank">📎 ${file.name}</a>`,
                            time: new Date().toLocaleTimeString()
                        });
                        this.saveMessages();
                        this.scrollToBottom();
                    }
                })
                .catch(() => {
                    this.messages.push({
                        role: "assistant",
                        content: "Lỗi khi gửi file!",
                        time: new Date().toLocaleTimeString()
                    });
                    this.saveMessages();
                    this.scrollToBottom();
                });
        },
        toggleChat() {
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
                this.$nextTick(() => {
                    const input = this.$el.querySelector('.chat-input-field');
                    if (input) input.focus();
                });
            }
        }
    }
};
</script>

<style scoped>
.chat-loading {
    color: #888;
    font-style: italic;
    margin: 8px 0 0 8px;
}
</style>