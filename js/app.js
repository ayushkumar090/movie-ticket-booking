(async function () {
  if (!window.Utils || !window.StorageService) return;
  Utils.updateCartCount();
  const slider = Utils.qs("#featured-slider");
  const nextBtn = Utils.qs("#next-featured");
  if (!slider) return;

  const movies = await Utils.getMovies();
  let start = 0;

  const render = () => {
    const visible = movies.slice(start, start + 4);
    slider.innerHTML = visible
      .map(
        (movie) => `
      <article class="movie-card">
        <img src="${movie.poster}" alt="${movie.title}" />
        <div class="movie-card-content">
          <h3>${movie.title}</h3>
          <p>${movie.genre} • ${movie.language}</p>
          <p><span class="badge">⭐ ${movie.rating}</span></p>
          <a class="btn" href="booking.html?id=${movie.id}">Book Now</a>
        </div>
      </article>`
      )
      .join("");
  };

  nextBtn?.addEventListener("click", () => {
    if (movies.length <= 4) return;
    start = (start + 1) % (movies.length - 3);
    render();
  });

  if (nextBtn && movies.length <= 4) {
    nextBtn.disabled = true;
  }

  render();
})();
