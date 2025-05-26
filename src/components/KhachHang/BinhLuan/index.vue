<template>
    <div :class="['comment-item', { 'ms-4': depth > 0 }]">
        <div class="d-flex align-items-start">
            <img class="comment-avatar me-3" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(20).webp"
                width="48" height="48" style="object-fit: cover;" />
            <div class="comment-content">
                <div class="d-flex justify-content-between">
                    <h6 class="mb-0">
                        {{ comment.ten_nguoi_dung }}
                        <span v-if="comment.vai_tro" :class="['badge ms-2', {
                            'bg-secondary': comment.vai_tro === 'Khách hàng',
                            'bg-danger': comment.vai_tro === 'Admin',
                            'bg-info': comment.vai_tro === 'Nhân viên'
                        }]">
                            {{ comment.vai_tro }}
                        </span>
                    </h6>
                    <small class="text-muted">{{ formatTime(comment.created_at) }}</small>
                </div>
                <p class="mb-1">{{ comment.noi_dung }}</p>
                <div class="comment-actions">
                    <span class="me-2" @click="() => { console.log('emit like', comment); $emit('like', comment) }">
                        <i :class="['fa-heart', comment.da_like ? 'fa-solid text-danger' : 'fa-regular']"></i>
                        <span class="ms-1">{{ comment.likes_count || 0 }}</span>
                    </span>
                    <span class="reply-link" @click="$emit('reply', comment.id)">Phản hồi</span>
                </div>
                <div v-if="replyingId === comment.id" class="reply-form">
                    <textarea class="form-control mb-2" rows="2" v-model="noi_dung_tra_loi"
                        placeholder="Nhập nội dung phản hồi..."></textarea>
                    <button class="btn btn-sm btn-primary" @click="guiTraLoi">Gửi phản hồi</button>
                </div>
                <!-- Đệ quy hiển thị các phản hồi con -->
                <div v-if="depth === 0 && comment.ds_tra_loi && comment.ds_tra_loi.length > 0">
                    <CommentItem v-for="bl in comment.ds_tra_loi.slice(0, so_tra_loi_hien_thi)" :key="bl.id"
                        :comment="bl" :depth="1" :replying-id="replyingId" :id-binh-luan-goc="idBinhLuanGoc"
                        @reply="$emit('reply', $event)" @send-reply="$emit('send-reply', $event)"
                        @like="$emit('like', $event)" />
                    <div v-if="comment.ds_tra_loi.length > so_tra_loi_hien_thi">
                        <a href="#" @click.prevent="so_tra_loi_hien_thi += 5">Xem thêm trả lời...</a>
                    </div>
                </div>

                <!-- Trả lời con: phân trang tra_loi_con -->
                <CommentItem
                    v-for="reply in depth > 0 && comment.tra_loi_con ? comment.tra_loi_con.slice(0, so_tra_loi_hien_thi) : []"
                    :key="reply.id" :comment="reply" :depth="depth + 1" :replying-id="replyingId"
                    :id-binh-luan-goc="idBinhLuanGoc" @reply="$emit('reply', $event)"
                    @send-reply="$emit('send-reply', $event)" @like="$emit('like', $event)" />
                <div v-if="depth > 0 && comment.tra_loi_con && so_tra_loi_hien_thi < comment.tra_loi_con.length">
                    <a href="#" @click.prevent="so_tra_loi_hien_thi += 5">Xem thêm trả lời...</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'CommentItem',
    props: {
        comment: Object,
        depth: { type: Number, default: 0 },
        replyingId: Number,
        idBinhLuanGoc: { type: Number, required: true },
    },
    data() {
        return {
            noi_dung_tra_loi: '',
            so_tra_loi_hien_thi: 2
        }
    },
    methods: {
        formatTime(time) {
            // dùng dayjs hoặc hàm formatTime của bạn
            return this.$parent.formatTime(time);
        },
        guiTraLoi() {
            this.$emit('send-reply', {
                id_binh_luan_cha: this.idBinhLuanGoc,
                id_tra_loi_cha: this.comment.id,
                noi_dung: this.noi_dung_tra_loi
            });
            this.noi_dung_tra_loi = '';
        }
    }
}
</script>
<style scoped></style>