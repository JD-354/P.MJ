const API_ALBUM = "https://rickandmortyapi.com/api/character";

function getAlbum(api) {
    fetch(api)
        .then((response) => response.json())
        .then((json) => {
            fillData(json.results);
            pagination(json.info);
        })
        .catch((error) => {
            console.error("Error consuming the API:", error);
            // Display a user-friendly message
            document.getElementById("dataAlbum").innerHTML = "<p>Sorry, there was an issue fetching the data. Please try again later.</p>";
        });
}

function fillData(results) {
    let cards = "";
    results.forEach(result => {
        cards += `
            <div class="col">
                <div class="card h-100" style="width: 12rem;">
                    <img src="${result.image}" class="card-img-top" alt="img-personaje">
                    <h2 class="card-title">${result.name}</h2>
                    <div class="card-body">
                        <h5 class="card-title">Status: ${result.status}</h5>
                        <h5 class="card-title">Species: ${result.species}</h5>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById("dataAlbum").innerHTML = cards;
}

function pagination(info) {
    let prevDisabled = !info.prev ? "disabled" : "";
    let nextDisabled = !info.next ? "disabled" : "";

    let html = `
        <li class="page-item ${prevDisabled}">
            <a class="page-link" onclick="getAlbum('${info.prev}')">Prev</a>
        </li>
        <li class="page-item ${nextDisabled}">
            <a class="page-link" onclick="getAlbum('${info.next}')">Next</a>
        </li>
    `;

    document.getElementById("pagination").innerHTML = html;
}

getAlbum(API_ALBUM);
