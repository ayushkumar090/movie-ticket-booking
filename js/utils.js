window.Utils = {
  formatINR(value) {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
  },
  qs(selector) {
    return document.querySelector(selector);
  },
  showToast(message) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(() => el.classList.remove("show"), 2000);
  },
  updateCartCount() {
    const countEl = document.getElementById("cart-count");
    if (countEl && window.StorageService) {
      countEl.textContent = window.StorageService.getCart().length;
    }
  },
  async getMovies() {
    const response = await fetch("data/movies-data.json");
    return response.json();
  }
};
