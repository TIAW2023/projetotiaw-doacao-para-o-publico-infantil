function salvarTudo() {
  // Salvar Nome
  var nome = document.getElementById("nome").value;

  // Salvar Endereço
  var cep = document.getElementById("cep").value;
  var rua = document.getElementById("rua").value;
  var numero = document.getElementById("numero").value;
  var bairro = document.getElementById("bairro").value;
  var cidade = document.getElementById("cidade").value;
  var estado = document.getElementById("estado").value;

  var endereco = {
    cep: cep,
    rua: rua,
    numero: numero,
    bairro: bairro,
    cidade: cidade,
    estado: estado,
  };

  // Salvar Observações
  var observacoes = document.getElementById("observacoes").value;

  // Salvar Seleção de Opções
  var opcoes = [];

  var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
  checkboxes.forEach(function (checkbox) {
    opcoes.push(checkbox.value);
  });

  // Criar objeto com todas as informações
  var todasInformacoes = {
    nome: nome,
    endereco: endereco,
    observacoes: observacoes,
    opcoes: opcoes,
  };

  var jsonTodasInformacoes = JSON.stringify(todasInformacoes);
  localStorage.setItem("todasInformacoes", jsonTodasInformacoes);

  console.log("Todas as informações salvas no Local Storage.");
}
