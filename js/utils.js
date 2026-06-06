window.Utils = {
  inrFormatter: new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }),
  formatINR(value) {
    return this.inrFormatter.format(value);
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
    try {
      const response = await fetch("data/movies-data.json");
      if (!response.ok) {
        throw new Error(`Failed to load movies (${response.status})`);
      }
      return response.json();
    } catch (error) {
      this.showToast("Unable to load movie data.");
      return [];
    }
  }
};
