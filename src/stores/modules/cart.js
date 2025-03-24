import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: JSON.parse(localStorage.getItem("cart")) || [],
  }),
  getters: {
    cartTotalPrice: (state) => {
      return state.cartItems.reduce((total, item) => {
        const itemTotal = item.gia_ban * item.quantity;
        return total + (isNaN(itemTotal) ? 0 : itemTotal);
      }, 0);
    },
    cartItemCount: (state) => {
      return state.cartItems.reduce((total, item) => total + item.quantity, 0);
    }
  },
  actions: {
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
    },
    addToCart(khoaHoc) {
      const existingItem = this.cartItems.find((item) => item.id === khoaHoc.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.cartItems.push({
          id: khoaHoc.id,
          ten_khoa_hoc: khoaHoc.ten_khoa_hoc,
          gia_ban: khoaHoc.gia_ban,
          hinh_anh: khoaHoc.hinh_anh,
          quantity: 1,
        });
      }
      this.saveCart();
    },
    removeFromCart(id) {
      this.cartItems = this.cartItems.filter((item) => item.id !== id);
      this.saveCart();
    },
    clearCart() {
      this.cartItems = [];
      localStorage.removeItem("cart");
    }
  }
});