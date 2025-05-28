
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

var screenshots
// Coloque seu token
var token = "c545dad4f1c446e2b13baea1fc7cc210"
let searchInput = document.getElementById("gameName")

function elabledDisabledButtonSearch(){
    if(searchInput.value < 1){
    document.querySelector(".buttonSearch").disabled = true
} else {
    document.querySelector(".buttonSearch").disabled = false
}
}

function redirectJogos() {
  const searchName = document.getElementById("gameName").value.trim();
  if (searchName) {
    sessionStorage.setItem("searchName", searchName);
    document.getElementById("gameName").value = "";
    window.location.href = "../search-page/index.html";
  }
}

async function buscarJogo() {
    const gameName = document.getElementById('gameName').value;
    const url = `https://api.rawg.io/api/games?key=${token}&search=${encodeURIComponent(gameName)}`;
    document.querySelector(".containerResults").innerHTML = `
    <div id="LoadingContainer">
        <div class="holder">
            <div class="preloader">
                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
        </div>
    </div>
    `
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Erro na requisição: " + response.statusText);
        }

        const data = await response.json();

        if (data.results.length === 0) {
            console.log("Nenhum jogo encontrado.");
        } else {
            data.results.forEach(jogo => {
            //   if(jogo.rating > 0){
                document.getElementById("LoadingContainer").innerHTML = ""
                document.querySelector(".containerResults").innerHTML += `
                <div class="card" onclick="gameDetail(${jogo.id})">
                <div class="thumbGame">
                    <img src="${jogo.background_image}">
                </div>
                <h3>${jogo.name}</h3>
                <div class="detailsGame">
                    <p>Avaliações: <span>${jogo.ratings_count}</span></p>
                    <p>Nota: <span>${jogo.rating} / 5</span></p>
                    <p>Plataformas: <span>${jogo.platforms.map(p => p.platform.name).join(", ")}</span></p>
                </div>
                </div>
              `
            //   }
              // <p>Lançamento: <span>${jogo.released}</span></p>
              // <p>Plataformas: <span>${ jogo.platforms.map(p => p.platform.name).join(", ")}</span></p>
                console.log(jogo)
            });
        }
    } catch (error) {
        console.error("Erro ao buscar o jogo:", error);
    }
}
buscarJogo()

function gameDetail(id) {
      localStorage.setItem("IdGame",id)
      location.href = "./gameDetails/index.html"
}
