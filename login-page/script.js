// Limpa o usuário que está logado
localStorage.setItem("userActive","")
localStorage.setItem("emailActive","")

// Cria um array de objetos para diversos usuarios
let usuarios = []
// Pergunta se existe algum local storage chamado 'usuarios'
if(localStorage.getItem("usuarios")){
    // Havendo, converte o que tiver por lá para objeto e guarda na variável usuarios
    usuarios = JSON.parse(localStorage.getItem("usuarios"))
}

let userActive
let emailActive
// Caso a página seja recarregada, ele pega novamente o dado do userActive se ele existir
if(localStorage.getItem("userActive")){
    // Havendo, converte o que tiver por lá para objeto e guarda na variável usuarios
     userActive = localStorage.getItem("userActive")
     emailActive = localStorage.getItem("emailActive")
}

// Função de login acionado caso o botão de login seja clicado
function singIn(){
    // Captura o valor do input 
    let guardaEmail = document.querySelector('#email').value
    let guardaSenha = document.querySelector('#password').value
    let aviso = document.querySelector(".aviso")
    // Verifica se o email e senha existe nos dados armazenados em LocalStorage
    let filtrado = usuarios.filter((element)=>{
        return element.email == guardaEmail && element.senha == guardaSenha
    })

    //  Verifica se o email está no formato correto, procurando @gmail.com, @hotmail.com e @outlook.com
    let emailValid = guardaEmail.indexOf("@gmail.com") > 1 || guardaEmail.indexOf("@hotmail.com") > 1 || guardaEmail.indexOf("@outlook.com") > 1 ? true : false

    // if(filtrado.length > 0){
    //         if(guardaEmail != "" && guardaSenha != ""){
    //             // Se o campo está preenchido, ele procura e acha o usuário
    //             aviso.style.color = "rgb(106, 255, 121)"
    //             aviso.innerHTML = "usuario encontrado"
    //             // Verifica qual o usuário que está ativo no momento e guarda o nome dele
    //             usuarios.filter((e) => {
    //                 if(e.email == guardaEmail && e.senha == guardaSenha){
    //                     userActive = e.nome
    //                 }
    //             })
    //             // Guarda o nome do usuário que está logado
    //             localStorage.setItem("userActive",userActive)
    //             // Envia para a página de lista onde estará a api
    //             location.href = "/projeto - codigo/crud/lista/lista.html"
    //         } else {
    //             aviso.style.color = "rgb(255, 106, 106)"
    //             aviso.innerHTML = "Preencha os campos corretamente!"}
    // } else if(guardaEmail == "adm" && guardaSenha == "adm"){
    //             // Após o adm logar, guarda os dados do adm no usuário ativo
    //             localStorage.setItem("userActive","adm")
    //             // Envia para a página do adm, onde o CRUD fica
    //             location.href = "./listCRUD/adm.html"
    // } else {
    //             if(guardaEmail != "" && guardaSenha != ""){
    //                 // Se não estiver vazio mas estiver errado, avisa
    //                 aviso.style.color = "rgb(255, 106, 106)"
    //                 aviso.innerHTML = "Usuario não encontrado ou email errado, tente novamente!"
    //             } else {
    //                 // Se estiver vazio, avisa
    //                 aviso.style.color = "rgb(255, 106, 106)"
    //                 aviso.innerHTML = "Preencha os campos corretamente!"
    //             }
    // }

// Verifica se os campos não estão vazios
    if(guardaEmail != "" && guardaSenha != ""){
        // Verifica se o email e senha estão nos dados de usuários
        if(filtrado.length > 0 && emailValid){
             // Se o campo está preenchido, ele procura e acha o usuário
             aviso.style.color = "rgb(106, 255, 121)"
             aviso.innerHTML = "usuario encontrado, redirecionando..."
             // Remove a classe cor vermelha caso tenha tido algum erro anteriormente
             document.getElementById("email").classList.remove("red")
             // Verifica qual o usuário que está ativo no momento e guarda o nome dele
             usuarios.filter((e) => {
                 if(e.email == guardaEmail && e.senha == guardaSenha){
                     userActive = e.nome;
                     emailActive = e.email
                 }
             })
             // Guarda o nome do usuário que está logado
             localStorage.setItem("userActive",userActive)
             localStorage.setItem("emailActive",emailActive)
             // Envia para a página de lista onde estará a api após 2 segundos
             setInterval(function() {
                location.href = "./home-page/index.html";
              }, 2000);

        } else if(guardaEmail == "adm" && guardaSenha == "adm") {
                // Remove a classe cor vermelha caso tenha tido algum erro anteriormente
                document.getElementById("email").classList.remove("red")
                // Após o adm logar, guarda os dados do adm no usuário ativo
                localStorage.setItem("userActive","adm")
                // Se o campo está preenchido, ele procura e acha o usuário
                aviso.style.color = "rgb(106, 255, 121)"
                aviso.innerHTML = "administrador logado, redirecionando para CRUD..."
                // Envia para a página do adm, onde o CRUD fica
                setInterval(function() {
                    location.href = "./listCRUD/adm.html";
                }, 2000);

        } else if( emailValid == false){
             // Se estiver vazio, avisa
            aviso.style.color = "rgb(255, 106, 106)"
           // Troca a cor do campo de email para vermelho
            document.getElementById("email").classList.add("red")
            document.getElementById("email").classList.remove("green")
            aviso.innerHTML = "Email no formato errado, tente novamente!"
        } else {
            // Se não estiver vazio mas estiver errado, avisa
            aviso.style.color = "rgb(255, 106, 106)"
            // Troca a cor do campo de email para verde
            document.getElementById("email").classList.add("red")
            document.getElementById("email").classList.remove("green")
            aviso.innerHTML = "Usuario não encontrado, tente novamente!"

        }
    } else {
        // Se estiver vazio, avisa
        aviso.style.color = "rgb(255, 106, 106)"
        aviso.innerHTML = "Preencha os campos corretamente!"
    }
}

function passwordShowHidden(){
    let passwordInput = document.getElementById("password")
    let hiddenPasswordLogo = document.getElementById("buttonHiddenPassword")
    let showPasswordLogo = document.getElementById("buttonShowPassword")
    if(passwordInput.type == "password"){
        passwordInput.type = "text"
        hiddenPasswordLogo.style.display = "none"
        showPasswordLogo.style.display = "flex"
    } else {
        passwordInput.type = "password"
        hiddenPasswordLogo.style.display = "flex"
        showPasswordLogo.style.display = "none"
    }
}