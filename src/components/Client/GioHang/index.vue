<template>
    <div class="container mt-5">
        <h2 class="text-center">{{ $t('your_cart') }}</h2>
        <div v-if="cartItems.length > 0">
            <table class="table table-bordered">
                <thead class="table-dark">
                    <tr class="text-center">
                        <th>{{ $t('image') }}</th>
                        <th>{{ $t('course_name') }}</th>
                        <th>{{ $t('price') }}</th>
                        <th>{{ $t('quantity') }}</th>
                        <th>{{ $t('total') }}</th>
                        <th>{{ $t('coupon') }}</th>
                        <th>{{ $t('action') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="text-center align-middle" v-for="item in cartItems" :key="item.id_khoa_hoc">
                        <td><img :src="item.hinh_anh" width="80" class="rounded" /></td>
                        <td>{{ item.ten_khoa_hoc }}</td>
                        <td class="text-danger">{{ formatVND(item.gia_ban) }}</td>
                        <td>{{ item.quantity }}</td>
                        <td><b>{{ formatVND(getDiscountedPrice(item)) }}</b></td>
                        <td>
                            <input type="text" v-model="item.couponCode" :placeholder="$t('coupon')"
                                class="form-control form-control-sm mb-1 w-100" />
                            <button class="btn btn-sm btn-info w-100" @click="applyCoupon(item)">
                                {{ $t('apply_coupon') }}
                            </button>
                            <div v-if="item.couponError" class="text-danger small mt-1">{{ item.couponError }}</div>
                        </td>
                        <td>
                            <button @click="removeFromCart(item.id_khoa_hoc)" class="btn btn-danger">
                                <svg viewBox="0 0 448 512" width="16" height="16">
                                    <path
                                        d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z">
                                    </path>
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h4 class="text-end mt-2">
                {{ $t('total_money') }}:
                <b class="text-success">{{ formatVND(cartTotalPriceAfterDiscount()) }}</b>
            </h4>
            <div class="text-center">
                <button @click="clearCart" class="btn btn-warning">{{ $t('clear_cart') }}</button>
                <button @click="confirmCheckout()" class="btn btn-success ms-1">{{ $t('checkout') }}</button>
            </div>
        </div>
        <div v-else>
            <h5 class="text-center text-muted">🛒 {{ $t('empty') }}</h5>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance } from "vue";
import { useToast } from "vue-toastification";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "vue-router";
import emitter from "@/event-bus";

const cartItems = ref([]);
const toast = useToast();
const router = useRouter();
const { proxy } = getCurrentInstance();

// Lấy giỏ hàng từ backend khi vào trang
const fetchCart = async () => {
    try {
        const res = await axios.get("http://127.0.0.1:8000/api/gio-hang", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("key_khach_hang"),
            },
        });
        // Nếu cart null hoặc không có items thì trả về []
        const items = res.data.cart && Array.isArray(res.data.cart.items) ? res.data.cart.items : [];
        cartItems.value = items.map(item => ({
            ...item,
            couponCode: item.coupon_code || "",
            couponError: "",
            discount: 0,
        }));
    } catch (err) {
        cartItems.value = [];
    }
};
onMounted(() => {
    fetchCart();
    emitter.on('update-cart-count', fetchCart);
});
onUnmounted(() => {
    emitter.off('update-cart-count', fetchCart);
});

// Format tiền Việt
const formatVND = (number) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(number);
};

// Áp dụng mã giảm giá cho từng item
const applyCoupon = async (item) => {
    if (!item.couponCode) {
        item.couponError = proxy.$t('enter_coupon');
        return;
    }
    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/api/apply-coupon",
            { code: item.couponCode },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("key_khach_hang"),
                },
            }
        );
        if (response.data.type === "percent") {
            item.discount = (item.gia_ban * response.data.value) / 100;
        } else if (response.data.type === "amount") {
            item.discount = response.data.value;
        }
        item.couponError = "";
        toast.success(proxy.$t('apply_coupon_success'));
    } catch (err) {
        item.couponError = err.response?.data?.error || proxy.$t('invalid_coupon');
        item.discount = 0;
    }
};

// Tổng sau giảm từng sản phẩm
const getDiscountedPrice = (item) => {
    return (item.gia_ban - (item.discount || 0)) * item.quantity;
};

// Tính tổng tiền toàn giỏ hàng sau giảm
const cartTotalPriceAfterDiscount = () => {
    return cartItems.value.reduce((total, item) => {
        const itemDiscount = item.discount || 0;
        return total + (item.gia_ban - itemDiscount) * item.quantity;
    }, 0);
};

// Xóa 1 item khỏi giỏ hàng
const removeFromCart = async (id_khoa_hoc) => {
    await axios.post("http://127.0.0.1:8000/api/gio-hang/remove", {
        id_khoa_hoc
    }, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("key_khach_hang"),
        },
    });
    cartItems.value = cartItems.value.filter(i => i.id_khoa_hoc !== id_khoa_hoc);
    emitter.emit('update-cart-count');
};

// Xóa toàn bộ giỏ hàng
const clearCart = async () => {
    await axios.post("http://127.0.0.1:8000/api/gio-hang/clear", {}, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("key_khach_hang"),
        },
    });
    cartItems.value = [];
    emitter.emit('update-cart-count');
};

// Thanh toán
const checkout = async () => {
    try {
        for (const item of cartItems.value) {
            const payload = {
                id_khoa_hoc: item.id_khoa_hoc,
                so_tien_mua: item.gia_ban,
                ten_khoa_hoc: item.ten_khoa_hoc,
                coupon_code: item.couponCode || '',
            };
            const response = await axios.post(
                "http://127.0.0.1:8000/api/home-page/mua-khoa-hoc/create",
                payload,
                {
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
                // router.push("/profile");
                return;
            }
            if (response.data.status !== 1) {
                toast.error(proxy.$t('buy_fail', { name: item.ten_khoa_hoc }));
                return;
            }
        }
        toast.success(proxy.$t('checkout_success'));
        await clearCart();
        router.push("/danh-sach-khoa-hoc");
    } catch (error) {
        console.error("Lỗi thanh toán:", error);
        toast.error(proxy.$t('checkout_error'));
    }
};

// Xác nhận thanh toán
const confirmCheckout = () => {
    Swal.fire({
        title: proxy.$t('confirm_checkout'),
        html: `
        <div class="text-left">
          <p>${proxy.$t('confirm_checkout_text')}</p>
          <div class="alert alert-warning">
            <strong>${proxy.$t('note')}:</strong> ${proxy.$t('refund_note')}
          </div>
        </div>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
    }).then((result) => {
        if (result.isConfirmed) {
            checkout();
        }
    });
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
    transition-duration: 0.3s;
    overflow: hidden;
    position: relative;
}

.svgIcon {
    width: 12px;
    transition-duration: 0.3s;
}

.svgIcon path {
    fill: white;
}

.button:hover {
    width: 140px;
    border-radius: 50px;
    transition-duration: 0.3s;
    background-color: rgb(255, 69, 69);
    align-items: center;
}

.button:hover .svgIcon {
    width: 50px;
    transition-duration: 0.3s;
    transform: translateY(60%);
}

.button::before {
    position: absolute;
    top: -20px;
    content: "Delete";
    color: white;
    transition-duration: 0.3s;
    font-size: 2px;
}

.button:hover::before {
    font-size: 13px;
    opacity: 1;
    transform: translateY(30px);
    transition-duration: 0.3s;
}
</style>