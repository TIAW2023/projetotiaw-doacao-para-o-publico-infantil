function salvarPessoa() {
  var nome = document.getElementById("nome").value;
  var cep = document.getElementById("cep").value.replace(/\D/g, ""); // Remover caracteres não numéricos do CEP
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

  if (
    !cep ||
    !rua ||
    !numero ||
    !bairro ||
    !cidade ||
    !estado ||
    opcoes.length == 0 ||
    nome.length < 3
  ) {
    alert("Por favor, preencha todos os campos!, Nome minimo 3 caracteres !!!");
    return;
  }

  var id = localStorage.getItem("logado");
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
    id: id,
  };

  var pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];
  pessoas.push(pessoa);
  localStorage.setItem("pessoas", JSON.stringify(pessoas));

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
}

function autoPreencherEndereco() {
  var cep = document.getElementById("cep").value.replace(/\D/g, "");
  if (cep.length === 8) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.erro) {
          document.getElementById("rua").value = data.logradouro;
          document.getElementById("bairro").value = data.bairro;
          document.getElementById("cidade").value = data.localidade;
          document.getElementById("estado").value = data.uf;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

document.getElementById("cep").addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "");
});

document.getElementById("cep").addEventListener("input", autoPreencherEndereco);
