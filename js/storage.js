window.StorageService = {
  keys: {
    cart: "moviebook_cart",
    bookings: "moviebook_bookings"
  },
  getCart() {
    return JSON.parse(localStorage.getItem(this.keys.cart) || "[]");
  },
  setCart(cart) {
    localStorage.setItem(this.keys.cart, JSON.stringify(cart));
  },
  addToCart(item) {
    const cart = this.getCart();
    cart.push(item);
    this.setCart(cart);
  },
  removeFromCart(id) {
    this.setCart(this.getCart().filter((item) => item.id !== id));
  },
  clearCart() {
    this.setCart([]);
  },
  getBookings() {
    return JSON.parse(localStorage.getItem(this.keys.bookings) || "[]");
  },
  pushBooking(items) {
    const history = this.getBookings();
    history.unshift(...items.map((item) => ({ ...item, bookedAt: new Date().toISOString() })));
    localStorage.setItem(this.keys.bookings, JSON.stringify(history));
  }
};
