const getLocalStorage = () => {
    const resultado = localStorage.getItem('usuarios');
    if (resultado !== null && resultado !== undefined) {
        return JSON.parse(resultado)
    } else {
        return []
    }
}

const setLocalStorage = (usuarios) => localStorage.setItem('usuarios', JSON.stringify(usuarios))

// CRUD
const createUser = (novoUsuario) => {
    const usuarios = getLocalStorage()
    usuarios.push(novoUsuario)
    setLocalStorage(usuarios)
}

const readUser = () => getLocalStorage()

const updateUser = (index, usuario) => {
    const usuarios = readUser()
    usuarios[index] = usuario
    setLocalStorage(usuarios)
}

const deleteUser = (index) => {
    const usuarios = readUser()
    usuarios.splice(index, 1)
    setLocalStorage(usuarios)
}

// Exibir os usuários na tabela
const tabela = document.getElementById("usertable")

function refresh() {
    tabela.innerHTML = "";
    const usuarios = readUser()

    usuarios.forEach((usuario, index) => {
        const linha = document.createElement("tr")
        linha.innerHTML = `
            <td class="linhas">${usuario.nome}</td>
            <td class="linhas">${usuario.email}</td>
            <td class="linhas">${usuario.senha}</td>
            <td class="linhas">${formatarData(usuario.dataNasc)}</td>
            <td class="acao">
                <button type="button" class="botao verde" id="editar-${index}">editar</button>
                <button type="button" class="botao vermelho" data-index="${index}" onclick="apagar(this)">excluir</button>
            </td>
        `;
        tabela.appendChild(linha)
    });
}
refresh()

// Modal de confirmação de exclusão
let usuarioIndex = null;

function apagar(botao) {
    usuarioIndex = parseInt(botao.dataset.index)
    const usuarios = readUser()
    const nome = usuarios[usuarioIndex].nome

    document.getElementById("mensagem-janela").textContent =
        `Tem certeza que deseja deletar o usuário "${nome}"?`;

    document.getElementById("janela-confirmacao").classList.remove("hidden")
}

function confirmarExclusao() {
    if (usuarioIndex !== null) {
        deleteUser(usuarioIndex)
        refresh()
        cancelar()
    }
}

function cancelar() {
    document.getElementById("janela-confirmacao").classList.add("hidden")
    usuarioIndex = null;
}

// Pesquisa de usuários
function pesquisa() {
    tabela.innerHTML = "";
    const search = document.getElementById('userprocura').value.toLowerCase()
    const usuarios = readUser()

    const resultados = usuarios
        .map((user, index) => ({ ...user, index }))
        .filter(user => user.nome.toLowerCase().includes(search))

    if (search === "") {
        informasucesso("Nenhum nome foi informado");
        refresh();
    } else if (resultados.length > 0) {
        resultados.forEach(user => {
            const linha = document.createElement("tr")
            linha.innerHTML = `
                <td class="linhas">${user.nome}</td>
                <td class="linhas">${user.email}</td>
                <td class="linhas">${user.senha}</td>
                <td class="linhas">${formatarData(user.dataNasc)}</td>
                <td class="acao">
                    <button type="button" class="botao verde" id="editar-${user.index}">editar</button>
                    <button type="button" class="botao vermelho" data-index="${user.index}" onclick="apagar(this)">excluir</button>
                </td>
            `;
            tabela.appendChild(linha)
        });
        informasucesso("Usuário encontrado")
    } else {
        informasucesso("Usuário não encontrado")
        refresh()
    }
}

function informasucesso(mensagem) {
    const infoBox = document.getElementById("informar")
    infoBox.classList.remove("hidden")
    document.getElementById('msg').textContent = mensagem
    setTimeout(() => infoBox.classList.add("hidden"), 800)
}

// Modal e formulário
const campoValido = () => document.getElementById("formModal").reportValidity()

const abrirModal = () => document.getElementById('modal').classList.add('active')

const fecharModal = () => {
    limparCampos()
    document.getElementById('modal').classList.remove('active')
}

const limparCampos = () => {
    const campos = document.querySelectorAll(".campo-modal")
    campos.forEach(campo => campo.value = "")
    document.getElementById('nome').dataset.index = 'new';
}

const saveUser = () => {
    if (campoValido()) {
        const user = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            senha: document.getElementById('senha').value,
            dataNasc: document.getElementById('dataNasc').value
        }
        const index = document.getElementById('nome').dataset.index

        if (index === 'new') {
            createUser(user)
        } else {
            updateUser(Number(index), user)
        }
        fecharModal()
        refresh()
    }
}

const preencherCampos = (usuario) => {
    document.getElementById('nome').value = usuario.nome
    document.getElementById('email').value = usuario.email
    document.getElementById('senha').value = usuario.senha
    document.getElementById('dataNasc').value = usuario.dataNasc
    document.getElementById('nome').dataset.index = usuario.index
}

const editUser = (index) => {
    const usuario = readUser()[index]
    usuario.index = index
    preencherCampos(usuario)
    abrirModal()
}

const editClick = (evento) => {
    if (evento.target.type === 'button') {
        const [acao, index] = evento.target.id.split('-')

        if (acao === 'editar') {
            editUser(Number(index))
        }
    }
}

function formatarData(dataOriginal){
    if(!dataOriginal){
        return ''
    }
    const [ano, mes, dia] = dataOriginal.split('-')
    return `${dia}/${mes}/${ano}`
}

// Eventos
document.getElementById('cadastrarUsuario').addEventListener('click', abrirModal)
document.getElementById('fecharModal').addEventListener('click', fecharModal)
document.getElementById('salvar').addEventListener('click', saveUser)
document.getElementById('limpar').addEventListener('click', limparCampos)
document.querySelector('#usertable').addEventListener('click', editClick)
