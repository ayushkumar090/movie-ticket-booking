(async function () {
  if (!window.Utils || !window.StorageService) return;
  Utils.updateCartCount();

  const movieInfo = Utils.qs("#movie-info");
  if (!movieInfo) return;

  const theaterEl = Utils.qs("#theater");
  const showtimeEl = Utils.qs("#showtime");
  const seatTypeEl = Utils.qs("#seat-type");
  const seatMap = Utils.qs("#seat-map");
  const selectedSeatsEl = Utils.qs("#selected-seats");
  const totalPriceEl = Utils.qs("#total-price");
  const addToCartBtn = Utils.qs("#add-to-cart");

  const seatPrices = { regular: 180, premium: 260, vip: 360 };
  const theaters = {
    "PVR Nexus": ["10:30 AM", "1:45 PM", "6:15 PM"],
    "INOX Downtown": ["11:00 AM", "3:00 PM", "9:00 PM"],
    "Cinepolis Max": ["12:15 PM", "4:30 PM", "8:30 PM"]
  };

  const params = new URLSearchParams(location.search);
  const movieId = Number(params.get("id"));
  const movies = await Utils.getMovies();
  const movie = movies.find((m) => m.id === movieId) || movies[0];

  movieInfo.innerHTML = `
    <img src="${movie.poster}" alt="${movie.title}" style="width:100%;border-radius:.8rem;max-height:380px;object-fit:cover;" />
    <h1>${movie.title}</h1>
    <p class="subtle">${movie.genre} • ${movie.duration} • ${movie.language}</p>
    <p>${movie.description}</p>
  `;

  const fillTheaters = () => {
    theaterEl.innerHTML = Object.keys(theaters)
      .map((name) => `<option value="${name}">${name}</option>`)
      .join("");
    fillShowtimes();
  };

  const fillShowtimes = () => {
    showtimeEl.innerHTML = theaters[theaterEl.value].map((time) => `<option value="${time}">${time}</option>`).join("");
  };

  let selected = [];

  const makeSeatMap = () => {
    selected = [];
    seatMap.innerHTML = "";
    const booked = new Set();
    let attempts = 0;
    while (booked.size < 12 && attempts < 500) {
      booked.add(`S${Math.floor(Math.random() * 80) + 1}`);
      attempts += 1;
    }
    if (booked.size < 12) {
      for (let i = 1; i <= 80 && booked.size < 12; i += 1) {
        booked.add(`S${i}`);
      }
    }

    for (let i = 1; i <= 80; i += 1) {
      const id = `S${i}`;
      const seat = document.createElement("button");
      seat.type = "button";
      seat.className = `seat ${booked.has(id) ? "booked" : "available"}`;
      seat.dataset.id = id;
      seat.title = id;
      if (!booked.has(id)) {
        seat.addEventListener("click", () => {
          const exists = selected.includes(id);
          selected = exists ? selected.filter((s) => s !== id) : [...selected, id];
          seat.classList.toggle("selected", !exists);
          updateSummary();
        });
      }
      seatMap.append(seat);
    }

    updateSummary();
  };

  const updateSummary = () => {
    selectedSeatsEl.textContent = selected.length ? selected.join(", ") : "None";
    totalPriceEl.textContent = Utils.formatINR(selected.length * seatPrices[seatTypeEl.value]);
  };

  theaterEl.addEventListener("change", () => {
    fillShowtimes();
    makeSeatMap();
  });
  seatTypeEl.addEventListener("change", updateSummary);

  addToCartBtn.addEventListener("click", () => {
    if (!selected.length) {
      Utils.showToast("Please select at least one seat.");
      return;
    }
    const item = {
      id: crypto.randomUUID(),
      movieId: movie.id,
      title: movie.title,
      poster: movie.poster,
      theater: theaterEl.value,
      showtime: showtimeEl.value,
      seatType: seatTypeEl.value,
      seats: selected,
      total: selected.length * seatPrices[seatTypeEl.value]
    };
    StorageService.addToCart(item);
    Utils.updateCartCount();
    Utils.showToast("Added to cart");
  });

  fillTheaters();
  makeSeatMap();
})();
