<template>
	<div class="nav-container primary-menu">
		<div class="mobile-topbar-header">
			<div>
				<img src="https://dzfullstack.com/assets/images/logo-img.png" class="logo-icon" alt="logo icon" />
			</div>
			<div>
				<h4 class="logo-text">DZFULLSTACK</h4>
			</div>
			<div class="toggle-icon ms-auto">
				<i class="bx bx-arrow-to-left"></i>
			</div>
		</div>
		<nav class="navbar navbar-expand-xl w-100">
			<ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
				<li class="nav-item">
					<router-link to="/" class="nav-link">
						<div class="parent-icon"><i class="bx bx-home-circle"></i></div>
						<div class="menu-title">Home</div>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/trac-nghiem" class="nav-link">
						<div class="parent-icon"><i class="fa-solid fa-list-check"></i></div>
						<div class="menu-title">Trắc Nghiệm</div>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/danh-sach-khoa-hoc" class="nav-link">
						<div class="parent-icon"><i class="fa-solid fa-warehouse"></i></div>
						<div class="menu-title">Danh Sách Khóa Học</div>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/bai-viet" class="nav-link">
						<div class="parent-icon"><i class="fa-solid fa-newspaper"></i></div>
						<div class="menu-title">Bài Viết</div>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/danh-gia" class="nav-link">
						<div class="parent-icon"><i class="fa-solid fa-thumbs-up"></i></div>
						<div class="menu-title">Đánh Giá</div>
					</router-link>
				</li>
			</ul>
			<!-- Giỏ hàng nằm phía bên phải -->
			<div class="cart-container">
				<router-link to="/gio-hang" class="cart-link">
					<i class="fa-solid fa-cart-shopping cart-icon"></i>
					<span class="cart-count">{{ cartItemCount }}</span>
				</router-link>
			</div>
		</nav>
	</div>
</template>

<script>
import { useCartStore } from "@/stores/modules/cart";
import { storeToRefs } from "pinia";

export default {
	setup() {
		const cartStore = useCartStore();
		const { cartItemCount } = storeToRefs(cartStore);
		return { cartItemCount };
	},
};
</script>

<style scoped>
.nav-link {
	position: relative;
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 10px 15px;
	text-decoration: none;
	color: #333;
	font-weight: 600;
	transition: color 0.3s ease;
}

.nav-link:hover {
	color: #007bff;
}

.nav-link::after {
	content: "";
	position: absolute;
	bottom: 0;
	left: 50%;
	width: 0;
	height: 2px;
	background: #007bff;
	transition: all 0.8s ease;
	transform: translateX(-50%);
}

.nav-link:hover::after {
	width: 100%;
}
</style>