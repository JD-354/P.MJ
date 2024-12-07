// Datos para las tarjetas con rutas locales
const cardsData = [
    {
      title: "Rick and Morty JD",
      description: "Accede a los personajes de la serie Rick and Morty.",
      image: " https://th.bing.com/th/id/OIP.mehRUmUsHt5u67vSA-YeDAHaEo?rs=1&pid=ImgDetMain", // Ruta local a la imagen
      enlace: "./RickMorty.html"  // Enlace local a otra página
    },
    {
      title: "Pokémon JD",
      description: "Explora información sobre los Pokémon.",
      image: "https://th.bing.com/th/id/OIP.a8tQwY6SUtqjE-EV5nYGkgHaFj?rs=1&pid=ImgDetMain",  // Ruta local a la imagen
      enlace: "./pokemon.api.html"  // Enlace local a otra página
    },
    {
      title: "Jikan JD",
      description: "Consulta animes y mangas con la API de Jikan.",
      image: "https://i.ytimg.com/vi/QRp7nRQPFck/maxresdefault.jpg",  // Ruta local a la imagen
      enlace: "./jakin.html"  // Enlace local a otra página
    }
  ];
  
  // Contenedor para las tarjetas
  const cardsContainer = document.getElementById("cardsContainer");
  
  // Generar tarjetas dinámicamente
  cardsData.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.className = "col-md-4"; // Cambié a col-md-4 para que sea una estructura de 3 columnas
    cardElement.innerHTML = `
      <div class="card h-100 text-center">
        <img src="${card.image}" class="card-img-top" alt="${card.title}" />
        <div class="card-body">
          <h5 class="card-title">${card.title}</h5>
          <p class="card-text">${card.description}</p>
          <a href="${card.enlace}" class="btn btn-primary" target="_blank">Ingresar</a>
        </div>
      </div>
    `;
    cardsContainer.appendChild(cardElement);
  });
  