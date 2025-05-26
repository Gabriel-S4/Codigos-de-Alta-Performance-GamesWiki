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

// Função de Login que será acionada ao clicar no botão de Cadastro
function singUp(){
    // Captura o valor dos campos de input
    let guardaNome = document.querySelector('#name').value
    let guardaNasc = document.querySelector('#DateNasc').value
    let guardaEmail = document.querySelector('#email').value
    let guardaSenha = document.querySelector('#password').value
    let aviso = document.querySelector(".aviso")
    // Objeto chamado usuário onde armazenará as informações
    var usuario = {
        nome: guardaNome,
        dataNasc: guardaNasc,
        email: guardaEmail,
        senha: guardaSenha
    }

// Verififica se o email existe no sistema, já que o nome do usuário pode se repetir e a senha também
    var existe = usuarios.filter((e) => {
         return e.email == guardaEmail && e.email != "" ?  true : false
    })

//  Verifica se o email está no formato correto, procurando @gmail.com, @hotmail.com e @outlook.com
    let emailValid = guardaEmail.indexOf("@gmail.com") > 1 || guardaEmail.indexOf("@hotmail.com") > 1 || guardaEmail.indexOf("@outlook.com") > 1 ? true : false
    if(existe == false) {
        // Verifica se o campo de nome,email ou senha está vazio, se não conclui a lógica
        if(usuario.nome != "" && usuario.dataNasc != "" && usuario.email != "" && usuario.senha != ""){
            // Verifica se o gmail,hotmail e outlook existe e conclui a lógica
            if(emailValid){
                // Se estiver correto, ele altera a cor dos campos, adiciona o usuario ao array usuarios e envia para a página do login
                aviso.style.color = "rgb(106, 255, 121)"
                aviso.innerHTML = "Cadastrado"
                usuarios.push(usuario)
                setInterval(function() {
                    location.href = "./login-page/index.html";
                  }, 2000);
                document.getElementById("password").classList.remove("red")
            } else {
                aviso.style.color = "rgb(255, 106, 106)"
                aviso.innerHTML = "Digite o email no formato correto!"
            }
        } else {
            aviso.style.color = "rgb(255, 106, 106)"
            aviso.innerHTML = "Preencha os campos corretamente!"
        }

    }else {
        // Verifica se o campo de nome,email ou senha está vazio, se não conclui a lógica
        if(usuario.nome != "" && usuario.dataNasc != "" && usuario.email != "" && usuario.senha != ""){
            // alert("O usuário já existe, tente outro email")
            aviso.innerHTML = "Usuário já existe"
            aviso.style.color = "rgb(255, 106, 106)"
        } else {
            aviso.style.color = "rgb(255, 106, 106)"
            aviso.innerHTML = "Preencha os campos corretamente!"
        }
    }
    // converto e após isso, guardo no local storage o novo array
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
    console.log(usuarios)
}

let password = document.getElementById("password")
let passwordWord = document.getElementById("passwordSize")
function passwordSize(){
    // Verifica se o tamanho da senha é maior que 0, se for ele coloca o modal como visível
    if((password.value).length > 0) {
        document.querySelector(".modalPasswordSize").style.opacity = "1"
    
    } else {
        document.querySelector(".modalPasswordSize").style.opacity = "0"
    }
    // Aviso de senha fraca, forte ou vazia
    if((password.value).length <= 6 && (password.value).length >= 1){
        document.getElementById("password").classList.add('red');
        document.getElementById("password").classList.remove('green');
        passwordWord.style.color = "rgba(209, 71, 71, 1)";
        passwordWord.innerHTML = "senha fraca";
    } else if ((password.value).length >= 7){
        document.getElementById("password").classList.add('green');
        document.getElementById("password").classList.remove('red');
        password.classList.add("green");
        passwordWord.style.color = "rgba(38, 237, 88, 1 )";
        passwordWord.innerHTML = "senha forte";
    } else{
        document.getElementById("password").classList.remove('red');
        document.getElementById("password").classList.remove('green');
        passwordWord.innerHTML = "";
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

