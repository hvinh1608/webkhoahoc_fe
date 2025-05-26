<template>
    <div class="p-4">
        <h2 class="text-2xl font-bold mb-6 text-center text-indigo-600">{{ $t('ranking_title') }}</h2>
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white rounded-xl shadow-md">
                <thead class="bg-indigo-100">
                    <tr>
                        <th class="p-3 text-sm font-semibold text-indigo-700">{{ $t('ranking_rank') }}</th>
                        <th class="p-3 text-sm font-semibold text-indigo-700">{{ $t('ranking_student') }}</th>
                        <th class="p-3 text-sm font-semibold text-indigo-700">{{ $t('ranking_completed') }}</th>
                        <th class="p-3 text-sm font-semibold text-indigo-700">{{ $t('ranking_streak') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(hv, index) in bangXepHang" :key="index"
                        class="hover:bg-indigo-50 transition duration-200" :class="{
                            'bg-yellow-100 font-bold text-yellow-700': index === 0,
                            'bg-gray-200 font-semibold': index === 1,
                            'bg-orange-100 font-semibold': index === 2
                        }">
                        <td class="p-3">
                            <span v-if="index === 0" class="medal-icon">🥇</span>
                            <span v-else-if="index === 1" class="medal-icon">🥈</span>
                            <span v-else-if="index === 2" class="medal-icon">🥉</span>
                            <span v-else>#{{ index + 1 }}</span>
                        </td>
                        <td class="p-3 flex items-center gap-2 justify-center">
                            <span class="student-name"
                                @click="$router.push({ name: 'ProfileKhachHang', params: { id: hv.id } })"
                                style="cursor:pointer;">
                                {{ hv.ho_va_ten }}
                            </span>
                        </td>
                        <td class="p-3">{{ hv.bai_hoan_thanh }}</td>
                        <td class="p-3">{{ hv.streak }} {{ $t('ranking_days') }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'BangXepHang',
    data() {
        return {
            bangXepHang: [],
        };
    },
    mounted() {
        this.layBangXepHang();
    },
    methods: {
        layBangXepHang() {
            axios.get('http://127.0.0.1:8000/api/bang-xep-hang')
                .then(res => {
                    this.bangXepHang = res.data;
                })
                .catch(err => {
                    console.error('Lỗi lấy bảng xếp hạng:', err);
                });
        },
    },
};
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(80, 80, 180, 0.08);
    margin-bottom: 24px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    animation: fadeIn 0.6s ease-out;
}

table:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 32px rgba(80, 80, 180, 0.12);
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Cải tiến style cho th */
th {
    background: linear-gradient(90deg, #e0e7ff 0%, #f3f4f6 100%);
    color: #3730a3;
    font-size: 1rem;
    font-weight: 700;
    padding: 16px 12px;
    border-bottom: 2px solid #c7d2fe;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: left;
    box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.1);
    background-color: #edf2ff;
    transition: background-color 0.2s;
}

th:hover {
    background-color: #dbeafe;
}

/* Cải tiến cho thẻ td */
td {
    text-align: center;
    font-size: 1rem;
    padding: 14px 12px;
    border-bottom: 1px solid #f3f4f6;
    background: #fff;
    transition: background 0.2s ease, transform 0.2s ease;
}

/* Tạo hiệu ứng khi hover vào mỗi dòng */
tr:hover td {
    background: #f1f5fd;
    transform: scale(1.01);
}

tr.bg-yellow-100 {
    background: linear-gradient(90deg, #fffde7 0%, #fff9c4 100%) !important;
    color: #bfa100 !important;
}

tr.bg-gray-200 {
    background: linear-gradient(90deg, #f3f4f6 0%, #e0e7ef 100%) !important;
    color: #6b7280 !important;
}

tr.bg-orange-100 {
    background: linear-gradient(90deg, #fff3e0 0%, #ffe0b2 100%) !important;
    color: #e65100 !important;
}

/* Tạo hiệu ứng cho huy chương */
.medal-icon {
    font-size: 1.5rem;
    line-height: 1;
    vertical-align: middle;
    display: inline-block;
    margin-right: 8px;
}

.medal-icon.gold {
    color: #ffd700;
}

.medal-icon.silver {
    color: #c0c0c0;
}

.medal-icon.bronze {
    color: #cd7f32;
}

.student-name {
    font-size: 1.1rem;
    font-weight: 500;
    color: #4a4a4a;
    transition: color 0.2s ease;
}

.student-name:hover {
    color: #6366f1;
    text-decoration: underline;
}

/* Cải tiến cho mobile */
@media (max-width: 800px) {

    table,
    thead,
    tbody,
    th,
    td,
    tr {
        display: block;
    }

    thead tr {
        display: none;
    }

    tr {
        margin-bottom: 18px;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(80, 80, 180, 0.06);
    }

    td {
        position: relative;
        padding-left: 50%;
        text-align: left;
        border-bottom: none;
        background: #fff;
        margin-bottom: 2px;
    }

    td::before {
        position: absolute;
        top: 50%;
        left: 18px;
        transform: translateY(-50%);
        font-weight: bold;
        color: #6366f1;
        font-size: 0.98rem;
        white-space: nowrap;
    }

    td:nth-child(1)::before {
        content: "{{$t('ranking_rank')}}";
    }

    td:nth-child(2)::before {
        content: "{{$t('ranking_student')}}";
    }

    td:nth-child(3)::before {
        content: "{{$t('ranking_completed')}}";
    }

    td:nth-child(4)::before {
        content: "{{$t('ranking_streak')}}";
    }
}
</style>
