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

  // Obter as opções selecionadas nos checkboxes
  var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
  checkboxes.forEach(function (checkbox) {
    opcoes.push(checkbox.value);
  });

  // Verificar se todos os campos obrigatórios foram preenchidos
  if (!nome || !cep || !rua || !numero || !bairro || !cidade || !estado) {
    // Exibir o alerta de campo faltante
    alert("Por favor, preencha todos os campos obrigatórios!");
    return; // Parar a execução da função
  }

  // Verificar se já existem informações de pessoas no Local Storage
  var pessoas = JSON.parse(localStorage.getItem("pessoas")) || {};

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

  // Adicionar os dados da pessoa ao objeto de pessoas
  pessoas[nome] = pessoa;

  // Salvar o objeto atualizado no Local Storage
  localStorage.setItem("pessoas", JSON.stringify(pessoas));

  // Exibir o alerta de sucesso
  alert("Pedido realizado! Os dados foram salvos.");

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
}
