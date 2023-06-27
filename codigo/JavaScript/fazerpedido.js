// Função para salvar os dados de uma pessoa no Local Storage
function salvarPessoa() {
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
    // Exibir o alerta de campo faltante
    alert("Por favor, preencha todos os campos!");
    return; // Parar a execução da função
  }

  // Verificar se já existem informações de pessoas no Local Storage
  var pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];

  // Criar um objeto com os dados da pessoa
  var pessoa = {
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

  // Adicionar os dados da pessoa ao array
  pessoas.push(pessoa);

  // Salvar o array atualizado no Local Storage
  localStorage.setItem("pessoas", JSON.stringify(pessoas));

  // Adicionar a pessoa logada ao Local Storage
  localStorage.setItem("pessoaLogada", JSON.stringify(pessoa));

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

// Event listener para o botão de buscar endereço
document
  .getElementById("buscar-endereco")
  .addEventListener("click", function (event) {
    event.preventDefault();
    buscarEndereco();
  });
