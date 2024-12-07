let currentPage = 1;
const itemsPerPage = 60;
const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=60&offset=60';
const maxCreatures = 898;

async function fetchCreatureDetails(url) {
    const response = await fetch(url);
    const speciesResponse = await fetch(url.replace('/pokemon/', '/pokemon-species/'));
    const creatureData = await response.json();
    const speciesData = await speciesResponse.json();

    return {
        creature: creatureData,
        species: speciesData
    };
}

async function fetchCreatures() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const creatureContainer = document.getElementById('creature-container');
        creatureContainer.innerHTML = '<div class="text-center w-100">Cargando...</div>';

        const creaturePromises = data.results.map(creature => 
            fetchCreatureDetails(creature.url)
        );

        const creatureDetails = await Promise.all(creaturePromises);
        creatureContainer.innerHTML = '';

        creatureDetails.forEach(({ creature, species }) => {
            const card = document.createElement('div');
            card.className = 'col';

            const imageUrl = creature.sprites.front_default || '/api/placeholder/200/200';

            // Prepare stats display
            const statsHtml = creature.stats.map(stat => {
                const statName = stat.stat.name;
                const statValue = stat.base_stat;
                return `${statName}: ${statValue}`;
            }).join(' | ');

            card.innerHTML = `
                <div class="card h-100">
                    <img src="${imageUrl}" class="card-img-top anime-image" alt="${creature.name}">
                    <div class="card-body">
                        <h5 class="card-title">${creature.name.charAt(0).toUpperCase() + creature.name.slice(1)}</h5>
                        <div class="details-section">
                            <strong>Especie:</strong> ${species.genera.find(g => g.language.name === 'en')?.genus || 'Desconocida'}<br>
                            <strong>Tipo:</strong> ${creature.types.map(type => type.type.name).join(', ')}<br>
                            <strong>Status:</strong><br>
                            ${statsHtml}
                        </div>
                    </div>
                </div>
            `;

            creatureContainer.appendChild(card);
        });

        updatePaginationControls();

    } catch (error) {
        console.error('Error al cargar las criaturas:', error);
        document.getElementById('creature-container').innerHTML = 
            '<div class="alert alert-danger text-center">Error al cargar las criaturas. Por favor, intenta de nuevo más tarde.</div>';
    }
}

function updatePaginationControls() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentPageSpan = document.getElementById('currentPage');

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage * itemsPerPage >= maxCreatures;
    currentPageSpan.textContent = currentPage;
}

async function changePage(delta) {
    currentPage += delta;
    await fetchCreatures();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', fetchCreatures);
