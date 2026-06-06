(function () {
  if (!window.Utils || !window.StorageService) return;
  Utils.updateCartCount();

  const itemsEl = Utils.qs("#cart-items");
  if (!itemsEl) return;

  const subtotalEl = Utils.qs("#subtotal");
  const taxEl = Utils.qs("#tax");
  const totalEl = Utils.qs("#grand-total");
  const checkoutBtn = Utils.qs("#checkout");

  const calculate = (cart) => {
    const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
    const tax = Math.round(subtotal * 0.05);
    return { subtotal, tax, total: subtotal + tax };
  };

  const render = () => {
    const cart = StorageService.getCart();

    if (!cart.length) {
      itemsEl.innerHTML = '<p class="subtle">Your cart is empty. Add seats from Movies page.</p>';
    } else {
      itemsEl.innerHTML = cart
        .map(
          (item) => `
        <article class="panel cart-item">
          <div>
            <h3>${item.title}</h3>
            <p class="subtle">${item.theater} • ${item.showtime}</p>
            <p class="subtle">Seats: ${item.seats.join(", ")} (${item.seatType})</p>
          </div>
          <div>
            <p><strong>${Utils.formatINR(item.total)}</strong></p>
            <button class="ghost-btn" data-remove="${item.id}">Remove</button>
          </div>
        </article>`
        )
        .join("");
    }

    const totals = calculate(cart);
    subtotalEl.textContent = Utils.formatINR(totals.subtotal);
    taxEl.textContent = Utils.formatINR(totals.tax);
    totalEl.textContent = Utils.formatINR(totals.total);

    itemsEl.querySelectorAll("[data-remove]").forEach((btn) => {
      btn.addEventListener("click", () => {
        StorageService.removeFromCart(btn.dataset.remove);
        Utils.updateCartCount();
        render();
      });
    });
  };

  checkoutBtn.addEventListener("click", () => {
    const cart = StorageService.getCart();
    if (!cart.length) {
      Utils.showToast("Cart is empty.");
      return;
    }
    StorageService.pushBooking(cart);
    StorageService.clearCart();
    Utils.updateCartCount();
    render();
    Utils.showToast("Booking confirmed 🎉");
  });

  render();
})();
