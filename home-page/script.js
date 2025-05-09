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

async function buscarJogo() {
    const gameName = document.getElementById('gameName').value;
    const token = '72f3de2b2c9f4d069b048da5f14e13f9';
    const url = `https://api.rawg.io/api/games?key=${token}&search=${encodeURIComponent(gameName)}&page_size=1`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Erro na requisição: " + response.statusText);
      }
  
      const data = await response.json();
  
      if (data.results.length === 0) {
        console.log("Nenhum jogo encontrado.");
      } else {
        const jogo = data.results[0];
        console.log("Nome:", jogo.name);
        console.log("Lançamento:", jogo.released);
        console.log("Rating:", jogo.rating);
        console.log("Imagem:", jogo.background_image);
        console.log("Plataformas:", jogo.platforms.map(p => p.platform.name).join(", "));
      }
    } catch (error) {
      console.error("Erro ao buscar o jogo:", error);
    }
  }
  