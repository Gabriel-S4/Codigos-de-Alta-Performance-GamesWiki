
// Cria um array de objetos para diversos usuarios
let usuarios = []
// Pergunta se existe algum local storage chamado 'usuarios'
if(localStorage.getItem("usuarios")){
    // Havendo, converte o que tiver por lá para objeto e guarda na variável usuarios
    usuarios = JSON.parse(localStorage.getItem("usuarios"))
}

// Caso a página seja recarregada, ele pega novamente o dado do userActive se ele existir
if(localStorage.getItem("userActive")){
    // Havendo, converte o que tiver por lá para objeto e guarda na variável usuarios
     userActive = localStorage.getItem("userActive")
     emailActive = localStorage.getItem("emailActive")
}

userName = localStorage.getItem("userActive")
if(userName == ""){
    document.getElementById("nameUser").innerHTML = "Não Logado"
} else {
    document.getElementById("nameUser").innerHTML = userName
}
console.log(userName)

function quit(){
    setInterval(() => {
        location.href = "../login-page/index.html"
    },1000)
    localStorage.setItem("userActive","")
    localStorage.setItem("emailActive","")
}

let searchInput = document.getElementById("searchName")

function elabledDisabledButtonSearch(){
    if(searchInput.value < 1){
    document.querySelector(".buttonSearch").disabled = true
} else {
    document.querySelector(".buttonSearch").disabled = false
}
}

function buscarJogo() {
  const searchName = document.getElementById("searchName").value.trim();
  if (searchName) {
    sessionStorage.setItem("searchName", searchName);
    window.location.href = "index.html";
  }
}

window.onload = async function () {
  const searchName = sessionStorage.getItem("searchName");
  if (!searchName) return;

  document.getElementById("searchName").value = searchName;

  const response = await fetch(`https://api.rawg.io/api/games?search=${encodeURIComponent(searchName)}&page_size=30&key=1f4c614941494c2ab71f02ee01800263`);
  const data = await response.json();
  const games = data.results || [];

  const grid = document.querySelector(".game-grid");
  const platformsSet = new Set();
  const genresSet = new Set();

  grid.innerHTML = '';
  games.filter(game => game.rating && game.rating > 0).forEach(game => {
    const { name, id, rating, released, background_image, platforms = [], genres = [] } = game;

    const card = document.createElement('div');
    card.className = 'game-card';
    card.setAttribute('data-platforms', platforms.map(p => p.platform.name).join(','));
    card.setAttribute('data-genres', genres.map(g => g.name).join(','));
    card.setAttribute('onclick', `gameDetail(${id})`);

    card.innerHTML = `
      <img src="${background_image}" alt="">
      <h3 class="game-title">${name}</h3>
      <div class="game-stats">
        <span>⭐${rating.toFixed(1)}/5</span>
        <span>${released || 'N/A'}</span>
      </div>
    `;

    grid.appendChild(card);

    platforms.forEach(p => platformsSet.add(p.platform.name));
    genres.forEach(g => genresSet.add(g.name));
  });

  criarFiltros('Plataforma', [...platformsSet], 'platform');
  criarFiltros('Gênero', [...genresSet], 'genre');
}

function criarFiltros(titulo, items, tipo) {
  const grupo = document.getElementById(`${tipo}-filter`);
  grupo.innerHTML = `<p class="filter-title">${titulo}</p>`;

  items.forEach(item => {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = true;
    checkbox.dataset.tipo = tipo;
    checkbox.value = item;

    checkbox.addEventListener('change', filtrarResultados);

    label.appendChild(checkbox);
    label.append(` ${item}`);
    grupo.appendChild(label);
    grupo.appendChild(document.createElement('br'));
  });
}

function filtrarResultados() {
  const checkboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');

  const plataformasAtivas = new Set();
  const generosAtivos = new Set();

  checkboxes.forEach(cb => {
    if (cb.checked) {
      if (cb.dataset.tipo === 'platform') plataformasAtivas.add(cb.value);
      if (cb.dataset.tipo === 'genre') generosAtivos.add(cb.value);
    }
  });

  const cards = document.querySelectorAll('.game-card');

  cards.forEach(card => {
    const plataformasCard = card.getAttribute('data-platforms').split(',');
    const generosCard = card.getAttribute('data-genres').split(',');

    const plataformaOk = plataformasCard.some(p => plataformasAtivas.has(p));
    const generoOk = generosCard.some(g => generosAtivos.has(g));

    card.style.display = (plataformaOk && generoOk) ? '' : 'none';
  });
}

function toggleFilters() {
  const filterOptions = document.getElementById("filterOptions");
  const toggleButton = document.querySelector(".toggle-filters-button");

  const isHidden = filterOptions.style.display === "none" || !filterOptions.style.display;
  filterOptions.style.display = isHidden ? "block" : "none";
  toggleButton.textContent = isHidden ? "Fechar Filtros" : "Abrir Filtros";
}

function gameDetail(id) {
      localStorage.setItem("IdGame",id)
      location.href = "../home-page/gameDetails/index.html"
}
