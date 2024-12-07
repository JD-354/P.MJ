const apiUrl = "https://api.jikan.moe/v4/anime?limit=20";
const animeContainer = document.getElementById("animeContainer");
const searchInput = document.getElementById("searchInput");

// Función para obtener los datos de anime
async function fetchAnimeData(query = '') {
  try {
    let url = apiUrl;
    if (query) {
      url = `https://api.jikan.moe/v4/anime?q=${query}&limit=20`;
    }
    const response = await fetch(url);
    const data = await response.json();
    displayAnime(data.data);
  } catch (error) {
    console.error("Error fetching Anime data:", error);
  }
}

// Función para mostrar los resultados
function displayAnime(animeList) {
  animeContainer.innerHTML = ''; // Limpiar el contenedor
  animeList.forEach((anime) => {
    const imageUrl = anime.images.jpg.image_url || "https://via.placeholder.com/200?text=No+Image";
    const animeCard = document.createElement("div");
    animeCard.classList.add("col");
    animeCard.innerHTML = `
      <div class="card anime-card h-100 text-center">
        <img
          src="${imageUrl}" 
          class="card-img-top anime-image" 
          alt="${anime.title}"
        >
        <div class="card-body">
          <h5 class="card-title">${anime.title}</h5>
          <p class="card-text">
            Episodios: ${anime.episodes || 'N/A'}<br>
            Año: ${anime.year || 'N/A'}<br>
            Géneros: ${anime.genres.map((genre) => genre.name).join(", ")}
          </p>
          <a href="${anime.url}" class="btn btn-primary" target="_blank">Ver Más</a>
        </div>
      </div>
    `;
    animeContainer.appendChild(animeCard);
  });
}

// Función que se ejecuta cuando el usuario hace clic en el botón de buscar
function searchAnime() {
  const query = searchInput.value.trim();
  if (query) {
    fetchAnimeData(query);
  } else {
    alert("Por favor, ingresa un término de búsqueda.");
  }
}

// Cargar los primeros datos de anime sin búsqueda
fetchAnimeData();
