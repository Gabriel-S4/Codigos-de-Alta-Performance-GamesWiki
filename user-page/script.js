document.getElementById("EscondendoONomeSenhaDoLabel").style.display = "none"
document.getElementById("campoSenhaHtml").style.display = "none";
document.getElementById("TrocarSenha").style.display = "none";
document.getElementById("BotaoSalvar").style.display = "none";


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


function Salvar() {

    const camponome = document.getElementById("nome");
    camponome.disabled = true;

    const campoemail = document.getElementById("email");
    campoemail.disabled = true;

    const camposenha = document.getElementById("senha");
    camposenha.disabled = true;

    const campoData = document.getElementById("date");
    campoData.disabled = true;

    document.getElementById("TrocarSenha").style.display = "none";
    document.getElementById("BotaoSalvar").style.display = "none";
    document.getElementById("Btn-EditarDados").style.display = "block";

    verificarNome()
    verificarSenha()
    verificarEmail()
    updateData()
    variavelControle = false;
}

function EditarDados(){
    const camponome = document.getElementById("nome");
    camponome.disabled = false;

    const campoemail = document.getElementById("email");
    campoemail.disabled = false;

    const campoData = document.getElementById("date");
    campoData.disabled = false;

    document.getElementById("TrocarSenha").style.display = "block";
    document.getElementById("BotaoSalvar").style.display = "block";
    document.getElementById("Btn-EditarDados").style.display = "none";

    document.getElementById("email").style.transform = "scale(1.05)";
    document.getElementById("nome").style.transform = "scale(1.05)";
    document.getElementById("date").style.transform = "scale(1.05)";

}
let variavelControle = false;
function trocarSenha() {
    variavelControle = true;
    const camposenha = document.getElementById("senha");
    camposenha.disabled = false;
    
    document.getElementById("campoSenhaHtml").style.display = "block"
    document.getElementById("EscondendoONomeSenhaDoLabel").style.display = "block"
    document.getElementById("TrocarSenha").style.display = "none";
    
    camposenha.focus();
    
}

function alertaFormatoEmailInc(){
    document.getElementById("alertaFormatoEmailInc").style.display = "block"
    fecharAlerta()
}

function alertaNomeVazio(){
    document.getElementById("alertaNomeVazio").style.display = "block"
    fecharAlerta()
}


function fecharAlerta() {

    setTimeout(() => {
    document.getElementById("AlertaSALVO").style.display = "none";
    document.getElementById("campoSenhaHtml").style.display = "none";
    document.getElementById("EscondendoONomeSenhaDoLabel").style.display = "none"

    // ALERT DO EMAIL
    document.getElementById("alertaFormatoEmailInc").style.display = "none"
    document.getElementById("alertaNomeVazio").style.display = "none"

    }, 2500);
    setTimeout(()=>{
        window.location.reload()
    },2500)

}

function verificarNome(){
    let nomeInserido = document.getElementById("nome").value;
    if(nomeInserido.length !== 0){
        document.getElementById("AlertaSALVO").style.display = "flex"; 
        updateName()
    }else{
        alertaNomeVazio()
        
        document.getElementById("nome").disabled = false;
        document.getElementById("BotaoSalvar").style.display = "Block";
        
    }
}


function verificarSenha(){
    let senhaInserida = document.getElementById("senha").value;
    if(variavelControle){
        if(senhaInserida.length !== 0){
            document.getElementById("AlertaSALVO").style.display = "flex"; 
            document.getElementById("Btn-EditarDados").style.display = "block";
            updateSenha()
            fecharAlerta()
            document.getElementById("senha").value = "";
        }
    }
}

function verificarEmail(){
    let emailInserido = document.getElementById("email").value;
    if (emailInserido.includes("@gmail.com") || emailInserido.includes("@hotmail.com") || emailInserido.includes("@outlook.com")) {
        document.getElementById("AlertaSALVO").style.display = "flex";  // ALERTA DO SALVO
        document.getElementById("Btn-EditarDados").style.display = "block"; // COLOCA O BOTÃO DE EDIÇÃO VISIVEL
        updateEmail()
        fecharAlerta()
    }else{
    alertaFormatoEmailInc()
    
    // DEIXA LIBERADO CASO DER ERRO, E TEM COMO CORRIGIR SEM CLICAR NOVAMENTE.
    document.getElementById("email").disabled = false;
    // MANTÉM O BOTÃO SALVAR
    document.getElementById("BotaoSalvar").style.display = "Block";
    }
}

userName = localStorage.getItem("userActive")
userEmail = localStorage.getItem("emailActive")
userDate = localStorage.getItem("dateActive")

function preencherHtml(){
    var nome = userName 
    var email = userEmail 
    var date = userDate

    if (nome){
        document.getElementById("nome").value = nome;
    }
    if (email){
        document.getElementById("email").value = email;
    }
    if(date){
        document.getElementById('date').value = date;
    }
}

// LOCAL STORAGE

function updateName() {
    var nomeNovo = document.getElementById("nome").value;

    // Atualiza nome do usuário ativo no localStorage
    localStorage.setItem("userActive", nomeNovo);

    // Recupera o email do usuário logado
    var emailLogado = localStorage.getItem("emailActive");

    // Recupera o array de usuários
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Encontra o índice do usuário com email igual ao logado
    let index = usuarios.findIndex(i => i.email === emailLogado);

    // Atualiza o nome no array e salva de volta no localStorage
    if (index !== -1) {
        usuarios[index].nome = nomeNovo;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
}

function updateEmail() {
    var emailNovo = document.getElementById("email").value;

    // Recupera o email atual do usuário logado
    var emailLogado = localStorage.getItem("emailActive");

    // Recupera o array de usuários
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Encontra o índice do usuário logado
    let index = usuarios.findIndex(i => i.email === emailLogado);

    // Atualiza o email no array e salva no localStorage
    if (index !== -1) {
        usuarios[index].email = emailNovo;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        localStorage.setItem("emailActive", emailNovo);
    }
}

console.log("Usuários atualizados:", usuarios);


function updateData(){
    var dataNova = document.getElementById("date").value;

    var emailLogado = localStorage.getItem("emailActive");

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    
    let index = usuarios.findIndex(i => i.email === emailLogado);

    if (index !== -1) {
        usuarios[index].dataNasc = dataNova;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        localStorage.setItem("dateActive", dataNova);
    }
}

function updateSenha(){
    var senhaNova = document.getElementById("senha").value;
    
    var emailLogado = localStorage.getItem("emailActive");
    
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    
    let index = usuarios.findIndex(i => i.email === emailLogado);
    
    if (index !== -1) {
        usuarios[index].senha = senhaNova;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        
    }
    
}


let password = document.getElementById("senha")
function passwordSize(){
    
    if((password.value).length <= 6 && (password.value).length >= 1){
        document.getElementById("senha").classList.add('red');
        document.getElementById("senha").classList.remove('green');
        
    } else if ((password.value).length >= 7){
        document.getElementById("senha").classList.add('green');
        document.getElementById("senha").classList.remove('red');
        password.classList.add("green");
        
        
    } else{
        document.getElementById("senha").classList.remove('red');
        document.getElementById("senha").classList.remove('green');
    }
}

console.log(localStorage.getItem("userActive"))
console.log(localStorage.getItem("emailActive"))

preencherHtml()