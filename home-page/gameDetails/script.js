
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

function gameDetail() {
    id = localStorage.getItem("IdGame")
    console.log(id)
    // Coloque seu token
    var token = "c545dad4f1c446e2b13baea1fc7cc210"
    let url = `https://api.rawg.io/api/games/${id}?key=${token}`
    console.log(url)
    fetch(url)
        .then((e) => e.json())
        .then((e) => {
            console.log(e)
                // document.querySelector(".containerMain").style.backgroundColor = `${e.dominant_color}`
                document.querySelector(".containerMain").innerHTML = `
                    <div class="gameWallpaperContainer">
                        <img class="gameWallpaper" src="${e.background_image}">
                    </div>
                    <h2>${e.name}</h2>
                    <p>ID: ${e.id}</p>
                    <p>Nota: ${e.rating} / 5</p>
                    <p>Data de lançamento: ${e.released}</p>
                    ${e.description}
                    <button onclick="backGameList()" style="cursor: pointer; font-size: 16px; width: 80px; height: 40px; color: white; border: none; border-radius: 25px; background-color: black;">Voltar</button>
                    `
                    document.title = `${e.name} - GamesWiki`
        })
}
gameDetail()

function quit(){
    setInterval(() => {
        location.href = "/index.html"
    },1000)
    localStorage.setItem("userActive","")
    localStorage.setItem("emailActive","")
}

function backGameList(){
    location.href = "../index.html"
    localStorage.removeItem("IdGame")
}