<template>
    <div>
        <h2>Quản Lý Mã Giảm Giá</h2>

        <form @submit.prevent="createCoupon">
            <div>
                <label for="value">Giá trị:</label>
                <input type="number" v-model="newCoupon.value" required />
            </div>
            <div>
                <label for="type">Loại giảm giá:</label>
                <select v-model="newCoupon.type" required>
                    <option value="percent">Giảm theo %</option>
                    <option value="amount">Giảm theo số tiền</option>
                </select>
            </div>
            <div>
                <label for="expiry_date">Ngày hết hạn:</label>
                <input type="datetime-local" v-model="newCoupon.expiry_date" :min="nowDateTime" required />
            </div>
            <button type="submit">Tạo Mã Giảm Giá</button>
        </form>

        <!-- Danh sách mã giảm giá -->
        <div v-if="coupons.length">
            <h3>Danh Sách Mã Giảm Giá</h3>
            <table>
                <thead>
                    <tr>
                        <th>Mã Giảm Giá</th>
                        <th>Giá Trị</th>
                        <th>Loại</th>
                        <th>Ngày Hết Hạn</th>
                        <th>Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="coupon in coupons" :key="coupon.id">
                        <td>{{ coupon.code }}</td>
                        <td>{{ coupon.value }} {{ coupon.type === 'percent' ? '%' : 'VND' }}</td>
                        <td>{{ coupon.type === 'percent' ? 'Giảm theo %' : 'Giảm theo số tiền' }}</td>
                        <td>{{ coupon.expiry_date }}</td>
                        <td>
                            <button @click="editCoupon(coupon)">Sửa</button>
                            <button style="background-color: red;" @click="deleteCoupon(coupon.id)">Xóa</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal để sửa mã giảm giá -->
        <div v-if="editingCoupon" class="modal">

            <form @submit.prevent="updateCoupon">
                <h3 style="text-align:center; margin-bottom:18px;">Sửa Mã Giảm Giá</h3>
                <hr>
                <div>
                    <label for="value">Giá trị:</label>
                    <input type="number" v-model="editingCoupon.value" required />
                </div>
                <div>
                    <label for="type">Loại giảm giá:</label>
                    <select v-model="editingCoupon.type" required>
                        <option value="percent">Giảm theo %</option>
                        <option value="amount">Giảm theo số tiền</option>
                    </select>
                </div>
                <div>
                    <label for="expiry_date">Ngày hết hạn:</label>
                    <input type="datetime-local" v-model="editingCoupon.expiry_date" :min="nowDateTime" required />
                </div>
                <button style="background-color: aqua;" type="submit">Cập Nhật</button>
                <button @click="cancelEdit">Hủy</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { useToast } from 'vue-toastification';

export default {
    data() {
        return {
            coupons: [],
            newCoupon: {
                value: '',
                type: 'percent',
                expiry_date: ''
            },
            editingCoupon: null
        };
    },
    mounted() {
        this.fetchCoupons();
    },
    computed: {
        nowDateTime() {
            const now = new Date();
            now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
            return now.toISOString().slice(0, 16);
        }
    },
    methods: {
        fetchCoupons() {
            axios.get('http://127.0.0.1:8000/api/coupons')
                .then(response => {
                    this.coupons = response.data;
                })
                .catch(error => {
                    console.error('Lỗi khi lấy danh sách mã giảm giá:', error);
                    this.toast.error('Không thể tải danh sách mã giảm giá');
                });
        },

        createCoupon() {
            axios.post('http://127.0.0.1:8000/api/coupons', this.newCoupon, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("key_admin")
                }
            })
                .then(response => {
                    this.toast.success(response.data.message);
                    this.fetchCoupons();  // Tải lại danh sách mã giảm giá
                    this.newCoupon = { value: '', type: 'percent', expiry_date: '' };  // Reset form
                })
                .catch(error => {
                    console.error('Lỗi khi tạo mã giảm giá:', error);
                    this.toast.error('Đã có lỗi xảy ra khi tạo mã giảm giá');
                });
        },

        editCoupon(coupon) {
            this.editingCoupon = { ...coupon };  // Sao chép dữ liệu của coupon vào editingCoupon
        },

        updateCoupon() {
            axios.put(`http://127.0.0.1:8000/api/coupons/${this.editingCoupon.id}`, this.editingCoupon, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("key_admin")
                }
            })
                .then(response => {
                    this.toast.success(response.data.message);
                    this.fetchCoupons();  // Tải lại danh sách mã giảm giá
                    this.editingCoupon = null;  // Đóng modal
                })
                .catch(error => {
                    console.error('Lỗi khi cập nhật mã giảm giá:', error);
                    this.toast.error('Đã có lỗi xảy ra khi cập nhật mã giảm giá');
                });
        },

        cancelEdit() {
            this.editingCoupon = null;
        },

        deleteCoupon(id) {
            Swal.fire({
                title: 'Bạn có chắc chắn muốn xóa mã giảm giá này?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy',
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/coupons/${id}`, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem("key_admin")
                        }
                    })
                        .then(response => {
                            this.toast.success(response.data.message);
                            this.fetchCoupons();
                        })
                        .catch(error => {
                            console.error('Lỗi khi xóa mã giảm giá:', error);
                            this.toast.error('Đã có lỗi xảy ra khi xóa mã giảm giá');
                        });
                }
            });
        },
    },
    setup() {
        const toast = useToast();
        return { toast };
    }
};
</script>

<style scoped>
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
}

h2 {
    text-align: center;
    color: #333;
    margin-top: 20px;
    font-size: 24px;
}

h3 {
    margin-top: 20px;
    font-size: 20px;
    color: #333;
}

form {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    max-width: 500px;
    margin: 20px auto;
}

form div {
    margin-bottom: 15px;
}

form label {
    font-weight: bold;
    color: #333;
}

form input,
form select {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
}

form button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 10px;
    width: 100%;
}

form button:hover {
    background-color: #45a049;
}

/* Table */
table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

table th,
table td {
    padding: 12px;
    text-align: center;
    border: 1px solid #ddd;
}

table th {
    background-color: #4CAF50;
    color: white;
}

table tr:nth-child(even) {
    background-color: #f9f9f9;
}

button {
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 5px;
    margin: 0 5px;
}

button:hover {
    background-color: #0056b3;
}

button:focus {
    outline: none;
}

/* Modal */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal form {
    width: 400px;
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modal button {
    background-color: #f44336;
    color: white;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 5px;
    width: 100%;
}

.modal button:hover {
    background-color: #e53935;
}

.modal .cancel-button {
    background-color: #9E9E9E;
}

.modal .cancel-button:hover {
    background-color: #757575;
}

.modal form h3 {
    text-align: center;
    margin-top: 0;
    margin-bottom: 18px;
    font-size: 22px;
    color: #2196f3;
    font-weight: bold;
    letter-spacing: 1px;
}
</style>