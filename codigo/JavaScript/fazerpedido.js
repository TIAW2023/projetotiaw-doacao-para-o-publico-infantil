// Verificar se já existem usuários no localStorage
let usersJSON = localStorage.getItem("users");
let users = usersJSON ? JSON.parse(usersJSON) : [];

console.log("Quantidade de usuários:", users.length);

let efetuarLogin = (email, password) => {
  let usersJSON = localStorage.getItem("users");
  let users = usersJSON ? JSON.parse(usersJSON) : [];

  let usuario = null;
  let usuarioIndex = -1;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      usuario = users[i];
      usuarioIndex = i;
      break;
    }
  }

  if (usuario && usuario.password && usuario.password === password) {
    localStorage.setItem("logado", JSON.stringify(usuarioIndex));
    alert("Login realizado com sucesso!");
    window.location.href = "home.html";
  } else {
    alert("Email ou senha incorretos. Por favor, tente novamente.");
  }
};

document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault();

  let email = document.getElementById("email").value;
  let senha = document.getElementById("password").value;

  efetuarLogin(email, senha);

  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
});

function salvarPessoa() {
  // Obter o índice do usuário logado
  var usuarioIndex = JSON.parse(localStorage.getItem("logado"));

  // Verificar se o usuário está logado
  if (isNaN(usuarioIndex) || usuarioIndex < 0 || usuarioIndex >= users.length) {
    alert("É necessário fazer o login antes de salvar os dados.");
    return;
  }

  // Obter os valores dos campos de entrada
  var nome = document.getElementById("nome").value;
  var cep = document.getElementById("cep").value;
  var rua = document.getElementById("rua").value;
  var numero = document.getElementById("numero").value;
  var bairro = document.getElementById("bairro").value;
  var cidade = document.getElementById("cidade").value;
  var estado = document.getElementById("estado").value;
  var observacoes = document.getElementById("observacoes").value;
  var opcoes = [];

  var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
  checkboxes.forEach(function (checkbox) {
    opcoes.push(checkbox.value);
  });

  // Criar um objeto com os dados da pessoa
  var pessoa = {
    userId: users[usuarioIndex].id,
    nome: nome,
    endereco: {
      cep: cep,
      rua: rua,
      numero: numero,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
    },
    observacoes: observacoes,
    opcoes: opcoes,
  };

  // Verificar se já existem informações de pessoas no Local Storage
  var pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];

  // Adicionar os dados da pessoa ao array
  pessoas.push(pessoa);

  // Salvar o array atualizado no Local Storage
  localStorage.setItem("pessoas", JSON.stringify(pessoas));

  // Limpar os campos de entrada
  document.getElementById("nome").value = "";
  document.getElementById("cep").value = "";
  document.getElementById("rua").value = "";
  document.getElementById("numero").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("cidade").value = "";
  document.getElementById("estado").value = "";
  document.getElementById("observacoes").value = "";
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = false;
  });

  // Exibir a mensagem de confirmação
  alert("Pedido realizado! Os dados foram salvos.");
}

function validarNome() {
  var nomeInput = document.getElementById("nome");
  var mensagemErro = document.getElementById("mensagemErro");

  if (nomeInput.value.length < 3) {
    mensagemErro.textContent = "O nome deve conter pelo menos 3 caracteres.";
    mensagemErro.style.display = "block";
  } else {
    mensagemErro.style.display = "none";
    // Aqui você pode prosseguir com o envio do formulário ou realizar outras ações
  }
}

// Função CEP

function buscarEndereco() {
  const cep = document.getElementById("cep").value;
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("rua").value = data.logradouro;
      document.getElementById("bairro").value = data.bairro;
      document.getElementById("cidade").value = data.localidade;
      document.getElementById("estado").value = data.uf;
    })
    .catch((error) => console.log(error));
}

function limparEndereco() {
  document.getElementById("rua").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("cidade").value = "";
  document.getElementById("estado").value = "";
}
