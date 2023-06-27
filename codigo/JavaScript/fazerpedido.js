// Verificar se já existem usuários no localStorage
let usersJSON = localStorage.getItem("users");
let users = usersJSON ? JSON.parse(usersJSON) : [];

console.log("Quantidade de usuários:", users.length);

// Função para realizar o login
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

  // Verificar se o usuário foi encontrado e a senha está correta
  if (usuario && usuario.password && usuario.password === password) {
    // Armazenar o índice do usuário logado no localStorage
    localStorage.setItem("logado", JSON.stringify(usuarioIndex));
    alert("Login realizado com sucesso!");
    window.location.href = "home.html"; // Redirecionar para a página de home após o login
  } else {
    alert("Email ou senha incorretos. Por favor, tente novamente.");
  }
};

// Função para salvar os dados da pessoa logada
let salvarPessoa = () => {
  // Obter o índice do usuário logado no localStorage
  let logadoJSON = localStorage.getItem("logado");
  let logadoIndex = logadoJSON ? JSON.parse(logadoJSON) : -1;

  if (logadoIndex !== -1) {
    let usersJSON = localStorage.getItem("users");
    let users = usersJSON ? JSON.parse(usersJSON) : [];

    let logado = users[logadoIndex]; // Obter o usuário logado

    // Obter os valores dos campos de entrada
    let nome = document.getElementById("nome").value;
    let cep = document.getElementById("cep").value;
    let rua = document.getElementById("rua").value;
    let numero = document.getElementById("numero").value;
    let bairro = document.getElementById("bairro").value;
    let cidade = document.getElementById("cidade").value;
    let estado = document.getElementById("estado").value;
    let observacoes = document.getElementById("observacoes").value;
    let opcoes = [];

    let checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
    checkboxes.forEach(function (checkbox) {
      opcoes.push(checkbox.value);
    });

    // Verificar se todos os campos obrigatórios foram preenchidos
    if (
      !nome ||
      !cep ||
      !rua ||
      !numero ||
      !bairro ||
      !cidade ||
      !estado ||
      opcoes.length == 0
    ) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    // Criar um objeto com os dados da pessoa
    let pessoa = {
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

    if (!logado.pessoas) {
      logado.pessoas = []; // Inicializar o array de pessoas se não existir
    }

    logado.pessoas.push(pessoa); // Adicionar os dados da pessoa ao array do usuário logado

    localStorage.setItem("users", JSON.stringify(users)); // Atualizar os usuários no localStorage

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

    alert("Pedido realizado! Os dados foram salvos.");
  } else {
    alert(
      "Nenhum usuário logado. Por favor, faça o login antes de salvar os dados."
    );
  }
};

// Event listener para o formulário de login
document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault();

  let email = document.getElementById("email").value;
  let senha = document.getElementById("password").value;

  efetuarLogin(email, senha);

  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
});

// Event listener para o formulário de salvar dados da pessoa logada
document.getElementById("salvar-form").addEventListener("submit", (event) => {
  event.preventDefault();
  salvarPessoa();
});

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
