document.getElementById("EscondendoONomeSenhaDoLabel").style.display = "none"
document.getElementById("campoSenhaHtml").style.display = "none";
document.getElementById("TrocarSenha").style.display = "none";
document.getElementById("BotaoSalvar").style.display = "none";

function Salvar() {

    const camponome = document.getElementById("nome");
    camponome.disabled = true;

    const campoemail = document.getElementById("email");
    campoemail.disabled = true;

    const camposenha = document.getElementById("senha");
    camposenha.disabled = true;

    document.getElementById("TrocarSenha").style.display = "none";
    document.getElementById("BotaoSalvar").style.display = "none";
    document.getElementById("Btn-EditarDados").style.display = "block";

    verificarNome()
    verificarSenha()
    verificarEmail()
    variavelControle = false;
}

function EditarDados(){
    const camponome = document.getElementById("nome");
    camponome.disabled = false;

    const campoemail = document.getElementById("email");
    campoemail.disabled = false;

    document.getElementById("TrocarSenha").style.display = "block";
    document.getElementById("BotaoSalvar").style.display = "block";
    document.getElementById("Btn-EditarDados").style.display = "none";

    document.getElementById("email").style.transform = "scale(1.05)";
    document.getElementById("nome").style.transform = "scale(1.05)";

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
    

}

function verificarNome(){
    let nomeInserido = document.getElementById("nome").value;
    if(nomeInserido.length !== 0){
        document.getElementById("AlertaSALVO").style.display = "flex"; 
        updateName()
    }else{
        alertaNomeVazio()
        
        document.getElementById("nome").disabled = false;
        // MANTÉM O BOTÃO SALVAR
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


function preencherHtml(){
    var nome = localStorage.getItem("nome");
    var email = localStorage.getItem("email");

    if (nome){
        document.getElementById("nome").value = nome;
    }
    if (email){
        document.getElementById("email").value = email;
    }
}

// LOCAL STORAGE

function updateName(){
    var nomeNovo = document.getElementById("nome").value
    localStorage.setItem("nome", nomeNovo)
}
function updateEmail(){
    var emailNovo = document.getElementById("email").value
    localStorage.setItem("email", emailNovo)
}
function updateSenha(){
    var senhaNova = document.getElementById("senha").value
    localStorage.setItem("senha", senhaNova)
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

// localStorage.setItem("nome","LUIZ GONZAGA")
// localStorage.setItem("email","LUIZG@gmail.com")
// localStorage.setItem("senha","Incorreta")


console.log(localStorage.getItem("nome"))
console.log(localStorage.getItem("email"))
console.log(localStorage.getItem("senha"))

preencherHtml()