<template>
<div class="nav-container primary-menu">
    <div class="mobile-topbar-header">
        <div>
            <img src="https://i.pinimg.com/736x/78/4d/19/784d19602be7f1d070b6a13001b7fc5c.jpg" class="logo-icon" alt="logo icon">
        </div>
        <div>
            <h4 class="logo-text">Rukada</h4>
        </div>
        <div class="toggle-icon ms-auto"><i class='bx bx-arrow-to-left'></i>
        </div>
    </div>
    <nav class="navbar navbar-expand-xl w-100">
        <ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="dropdownKhoaHoc" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <div class="parent-icon"><i class="fa-solid fa-book"></i></div>
                    <div class="menu-title">Khóa Học</div>
                </a>
                <ul class="dropdown-menu" aria-labelledby="dropdownKhoaHoc">
                    <li>
                        <router-link class="dropdown-item" to="/admin/loai-khoa-hoc">
                            Khóa Học Trả Phí
                        </router-link>
                    </li>
                    <li>
                        <router-link class="dropdown-item" to="/admin/khoa-hoc-free">
                            Khóa Học Miễn Phí
                        </router-link>
                    </li>
                </ul>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="dropdownBaiHoc" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <div class="parent-icon"><i class="fa-solid fa-book-open"></i></div>
                    <div class="menu-title">Bài Học</div>
                </a>
                <ul class="dropdown-menu" aria-labelledby="dropdownBaiHoc">
                    <li>
                        <router-link class="dropdown-item" to="/admin/bai-hoc">
                            Bài Học Trả Phí
                        </router-link>
                    </li>
                    <li>
                        <router-link class="dropdown-item" to="/admin/bai-hoc-free">
                            Bài Học Miễn Phí
                        </router-link>
                    </li>
                </ul>
            </li>
            <li class="nav-item">
                <router-link to="/admin/bai-viet">
                    <a class="nav-link" href="/admin/bai-viet">
                        <div class="parent-icon"><i class="fa-solid fa-newspaper"></i>
                        </div>
                        <div class="menu-title">Bài Viết</div>
                    </a>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/admin/danh-gia">
                    <a class="nav-link" href="/admin/danh-gia">
                        <div class="parent-icon"><i class="fa-solid fa-thumbs-up"></i>
                        </div>
                        <div class="menu-title">Đánh Giá</div>
                    </a>
                </router-link>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <div class="parent-icon"><i class="fa-solid fa-users"></i></div>
                    <div class="menu-title">Quản Lý</div>
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                        <router-link to="/admin/khach-hang">
                            <a class="dropdown-item" href="/admin/khach-hang">Khách Hàng</a>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/admin/nhan-vien">
                            <a class="dropdown-item" href="/admin/nhan-vien">Nhân Viên</a>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/admin/phan-quyen">
                            <a class="dropdown-item" href="/admin/phan-quyen">Phân Quyền</a>
                        </router-link>
                    </li>
                </ul>
            </li>

            <li class="nav-item">
                <router-link to="/admin/trac-nghiem">
                    <a class="nav-link" href="/admin/trac-nghiem">
                        <div class="parent-icon"><i class="fa-solid fa-file-export"></i>
                        </div>
                        <div class="menu-title">Trắc Nghiệm</div>
                    </a>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/admin/lich-su-giao-dich">
                    <a class="nav-link" href="/admin/lich-su-giao-dich">
                        <div class="parent-icon"><i class="fa-solid fa-clock-rotate-left"></i>
                        </div>
                        <div class="menu-title">Lịch Sử Giao Dịch</div>
                    </a>
                </router-link>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="dropdownCharts" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <div class="parent-icon"><i class="fa-solid fa-chart-line"></i></div>
                    <div class="menu-title">Biểu Đồ</div>
                </a>
                <ul class="dropdown-menu" aria-labelledby="dropdownCharts">
                    <li>
                        <router-link class="dropdown-item" to="/admin/chart">
                            Chart Tài Chính
                        </router-link>
                    </li>
                    <li>
                        <router-link class="dropdown-item" to="/admin/chart-khoa-hoc">
                            Chart Mua Khóa Học
                        </router-link>
                    </li>
                    <li>
                        <router-link class="dropdown-item" to="/admin/chart-khach-hang">
                            Chart Khách Hàng
                        </router-link>
                    </li>
                    <li>
                        <router-link class="dropdown-item" to="/admin/chart-danh-gia">
                            Chart Đánh Giá
                        </router-link>
                    </li>
                </ul>
            </li>

        </ul>
    </nav>
</div>
</template>

<script>
export default {

}
</script>

<style>
</style>
