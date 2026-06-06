(function () {
  if (!window.Utils || !window.StorageService) return;
  Utils.updateCartCount();

  const historyEl = Utils.qs("#booking-history");
  if (!historyEl) return;

  const bookings = StorageService.getBookings();
  if (!bookings.length) {
    historyEl.innerHTML = '<p class="subtle">No bookings yet. Complete checkout to see history.</p>';
    return;
  }

  historyEl.innerHTML = bookings
    .map(
      (item) => `
    <article class="panel">
      <h3>${item.title}</h3>
      <p class="subtle">${new Date(item.bookedAt).toLocaleString()}</p>
      <p>${item.theater} • ${item.showtime}</p>
      <p>Seats: ${item.seats.join(", ")} (${item.seatType})</p>
      <p><strong>${Utils.formatINR(item.total)}</strong></p>
    </article>`
    )
    .join("");
})();
