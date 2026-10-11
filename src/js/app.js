const API_URL = 'https://rickandmortyapi.com/api/character';
const container = document.getElementById('charactersContainer');
const searchInput = document.getElementById('searchInput');

let allCharacters = [];

async function fetchCharacters() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    allCharacters = data.results;
    renderCharacters(allCharacters);
  } catch (error) {
    container.innerHTML = `<p class="error">Error al cargar personajes: ${error.message}</p>`;
  }
}

function renderCharacters(characters) {
  container.innerHTML = '';
  characters.forEach(char => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${char.image}" alt="${char.name}">
      <div class="card-body">
        <h3>${char.name}</h3>
        <p><strong>Estado:</strong> ${char.status}</p>
        <p><strong>Especie:</strong> ${char.species}</p>
        <p><strong>Género:</strong> ${char.gender}</p>
        <p><strong>Origen:</strong> ${char.origin.name}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = allCharacters.filter(char => char.name.toLowerCase().includes(query));
  renderCharacters(filtered);
});

fetchCharacters();