(async function () {
  if (!window.Utils || !window.StorageService) return;
  Utils.updateCartCount();

  const grid = Utils.qs("#movies-grid");
  if (!grid) return;

  const searchEl = Utils.qs("#search");
  const genreEl = Utils.qs("#genre-filter");
  const languageEl = Utils.qs("#language-filter");
  const ratingEl = Utils.qs("#rating-filter");

  const movies = await Utils.getMovies();

  const fillFilter = (el, values) => {
    values.forEach((item) => {
      const option = document.createElement("option");
      option.value = item;
      option.textContent = item;
      el.append(option);
    });
  };

  fillFilter(genreEl, [...new Set(movies.map((m) => m.genre))]);
  fillFilter(languageEl, [...new Set(movies.map((m) => m.language))]);

  const render = () => {
    const search = searchEl.value.toLowerCase().trim();
    const genre = genreEl.value;
    const language = languageEl.value;
    const rating = ratingEl.value;

    const filtered = movies.filter((movie) => {
      const searchOK = movie.title.toLowerCase().includes(search);
      const genreOK = genre === "all" || movie.genre === genre;
      const languageOK = language === "all" || movie.language === language;
      const ratingOK = rating === "all" || Number(movie.rating) >= Number(rating);
      return searchOK && genreOK && languageOK && ratingOK;
    });

    grid.innerHTML = filtered
      .map(
        (movie) => `
      <article class="movie-card">
        <img src="${movie.poster}" alt="${movie.title}" />
        <div class="movie-card-content">
          <h3>${movie.title}</h3>
          <p>${movie.genre} • ${movie.duration} • ${movie.language}</p>
          <p><span class="badge">⭐ ${movie.rating}</span></p>
          <a class="btn" href="booking.html?id=${movie.id}">Book Now</a>
        </div>
      </article>`
      )
      .join("");

    if (!filtered.length) {
      grid.innerHTML = '<p class="subtle">No movies match the selected filters.</p>';
    }
  };

  [searchEl, genreEl, languageEl, ratingEl].forEach((el) => el.addEventListener("input", render));
  render();
})();
