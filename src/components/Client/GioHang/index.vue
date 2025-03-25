<template>
<div class="container mt-5">
    <h2 class="text-center">🛍 Giỏ Hàng Của Bạn</h2>
    <div v-if="cartItems.length > 0">
        <table class="table table-bordered">
            <thead class="table-dark">
                <tr class="text-center">
                    <th>Hình Ảnh</th>
                    <th>Tên Khóa Học</th>
                    <th>Giá</th>
                    <th>Số Lượng</th>
                    <th>Thành Tiền</th>
                    <th>Hành Động</th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-center align-middle" v-for="item in cartItems" :key="item.id">
                    <td><img :src="item.hinh_anh" width="80" class="rounded" /></td>
                    <td>{{ item.ten_khoa_hoc }}</td>
                    <td class="text-danger">{{ formatVND(item.gia_ban) }}</td>
                    <td>{{ item.quantity }}</td>
                    <td><b>{{ formatVND(item.gia_ban * item.quantity) }}</b></td>
                    <td class="d-flex justify-content-center align-items-center">
                        <button @click="removeFromCart(item.id)" class="button">
                            <svg viewBox="0 0 448 512" class="svgIcon">
                                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z">
                                </path>
                            </svg>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <h4 class="text-end">Tổng tiền: <b class="text-success">{{ formatVND(cartTotalPrice) }}</b></h4>
        <div class="text-center">
            <button @click="clearCart" class="btn btn-warning">Xóa giỏ hàng</button>
            <button @click="confirmCheckout()" class="btn btn-success ms-1">Thanh toán</button>
        </div>
    </div>
    <div v-else>
        <h5 class="text-center text-muted">🛒 Giỏ hàng trống</h5>
    </div>
</div>
</template>

<script>
import {
    useCartStore
} from "@/stores/modules/cart";
import {
    storeToRefs
} from "pinia";
import {
    useToast
} from "vue-toastification";
import Swal from "sweetalert2";
import axios from "axios";
import {
    useRouter
} from "vue-router";

export default {
    setup() {
        const cartStore = useCartStore();
        const {
            cartItems,
            cartTotalPrice
        } = storeToRefs(cartStore);
        const {
            removeFromCart,
            clearCart
        } = cartStore;
        const toast = useToast();
        const router = useRouter();

        const formatVND = (number) => {
            return new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND"
            }).format(number);
        };

        const confirmCheckout = () => {
            Swal.fire({
                title: "Xác nhận thanh toán",
                html: `
                    <div class="text-left">
                        <p>Bạn có muốn thanh toán giỏ hàng này không?</p>
                        <div class="alert alert-warning">
                            <i class="fa-solid fa-triangle-exclamation me-2"></i>
                            <strong>Lưu ý quan trọng:</strong> Sau khi thanh toán, các khóa học sẽ không thể hoàn lại tiền. 
                            Vui lòng xem kỹ thông tin khóa học trước khi xác nhận thanh toán.
                        </div>
                    </div>
                `,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Đồng ý thanh toán",
                cancelButtonText: "Hủy",
                customClass: {
                    htmlContainer: 'sweet-alert-wider'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    checkout();
                }
            });
        };

        const checkout = async () => {
            try {
                for (const item of cartItems.value) {
                    const payload = {
                        id_khoa_hoc: item.id,
                        so_tien_mua: item.gia_ban,
                        ten_khoa_hoc: item.ten_khoa_hoc
                    };

                    const response = await axios.post(
                        "http://127.0.0.1:8000/api/home-page/mua-khoa-hoc/create",
                        payload, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("key_khach_hang"),
                            },
                        }
                    );

                    if (response.data.status === 0) {
                        toast.warning(response.data.message);
                        return;
                    }
                    if (response.data.status === 2) {
                        toast.error(response.data.message);
                        router.push('/profile');
                        return;
                    }
                    if (response.data.status !== 1) {
                        toast.error(`Mua khóa học "${item.ten_khoa_hoc}" thất bại!`);
                        return;
                    }
                }

                toast.success("Thanh toán thành công!");
                clearCart();
                router.push('/danh-sach-khoa-hoc');

            } catch (error) {
                console.error("Lỗi thanh toán:", error);
                toast.error("Có lỗi xảy ra khi thanh toán!");
            }
        };

        return {
            cartItems,
            cartTotalPrice,
            removeFromCart,
            clearCart,
            formatVND,
            confirmCheckout
        };
    }
};
</script>

<style scoped>
.button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgb(20, 20, 20);
    border: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
    cursor: pointer;
    transition-duration: .3s;
    overflow: hidden;
    position: relative;
}

.svgIcon {
    width: 12px;
    transition-duration: .3s;
}

.svgIcon path {
    fill: white;
}

.button:hover {
    width: 140px;
    border-radius: 50px;
    transition-duration: .3s;
    background-color: rgb(255, 69, 69);
    align-items: center;
}

.button:hover .svgIcon {
    width: 50px;
    transition-duration: .3s;
    transform: translateY(60%);
}

.button::before {
    position: absolute;
    top: -20px;
    content: "Delete";
    color: white;
    transition-duration: .3s;
    font-size: 2px;
}

.button:hover::before {
    font-size: 13px;
    opacity: 1;
    transform: translateY(30px);
    transition-duration: .3s;
}

</style>
