(function () {
  if (!window.Utils || !window.StorageService) return;
  Utils.updateCartCount();

  const historyEl = Utils.qs("#booking-history");
  const nameEl = Utils.qs("#profile-name");
  const emailEl = Utils.qs("#profile-email");
  const tierEl = Utils.qs("#profile-tier");
  if (!historyEl) return;
  const user = StorageService.getUser();
  if (nameEl) nameEl.textContent = user.name;
  if (emailEl) emailEl.textContent = `Email: ${user.email}`;
  if (tierEl) tierEl.textContent = `Member: ${user.memberTier}`;

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
