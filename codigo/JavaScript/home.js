function imprimir() {
  // Verifica se há algum valor armazenado no localStorage.
  var temValorNoLocalStorage = localStorage.getItem("pessoas") !== null;

  // Se tiver algum valor no LocalStorage, entrará nesta condição.
  if (temValorNoLocalStorage) {
    var pessoas = JSON.parse(localStorage.getItem("pessoas")); // Convertendo os valores do localstorage para Json.
    let tela = document.getElementById('tela'); // Mostrar conteúdo na div tela do HTML.
    var strHtml = '';

    var opcoes = [];
    // Armazenando as opções do usuário no vetor opções.
    var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
    checkboxes.forEach(function (checkbox) {
      opcoes.push(checkbox.value);
    });

    // Filtrar os produtos que possuem as palavras-chave fornecidas pelo usuário
    var produtosFiltrados = pessoas.filter(function (pessoa) {
      var possuiPalavrasChave = opcoes.every(function (opcao) {
        return pessoa.opcoes.includes(opcao);
      });
      return possuiPalavrasChave;
    });


    var quant = 0;
    // Gerar a string HTML para exibir os produtos filtrados
    function quebrarLinha(texto, caracteresPorLinha) {
      const regex = new RegExp(`.{1,${caracteresPorLinha}}`, 'g');
      return texto.match(regex).join('\n');
    }

    produtosFiltrados.forEach(function (pessoa) {
      const observacoesQuebradas = quebrarLinha(pessoa.observacoes, 50);

      strHtml +=
        `<div class="mx-2">
                <div class="row fs-2 mt-2">
                  <div class="col-auto">
                    ${pessoa.nome}
                  </div>
                </div>
                <div class="row">
                  <div class="col-auto">
                    ${pessoa.endereco.rua}, ${pessoa.endereco.numero}, ${pessoa.endereco.bairro}, ${pessoa.endereco.cidade}, ${pessoa.endereco.estado}.
                  </div>
                </div>
                <div class="row">
                  <div class="col-12 mt-3">
                    <p style="white-space: pre-line;">${observacoesQuebradas}</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-auto my-2">
                    <b>Palavras-Chave: </b>${pessoa.opcoes}.
                  </div>
                </div>
                <hr class="linha">
              </div>`;

      quant++;
    });
    if (quant === 0) {
      checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
      });
      location.reload();
      alert("Não possuí pedidos com está palavra-chave!");
    }

    // Exibir os produtos filtrados na tela
    tela.innerHTML = strHtml;

  }
  else { alert("Não possuí pedidos cadastrados.") }
}

function mostrarprodutos() {
  var pessoas = JSON.parse(localStorage.getItem("pessoas")); // Convertendo os valores do localstorage para Json.
  let tela = document.getElementById('tela'); // Mostrar conteúdo na div tela do HTML.
  var strHtml = '';

  var opcoes = [];
  // Armazenando as opções do usuário no vetor opções.
  var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
  checkboxes.forEach(function (checkbox) {
    opcoes.push(checkbox.value);
  });

  // Filtrar os produtos que possuem as palavras-chave fornecidas pelo usuário
  var produtosFiltrados = pessoas.filter(function (pessoa) {
    var possuiPalavrasChave = opcoes.every(function (opcao) {
      return pessoa.opcoes.includes(opcao);
    });
    return possuiPalavrasChave;
  });

  // Gerar a string HTML para exibir os produtos filtrados
  function quebrarLinha(texto, caracteresPorLinha) {
    const regex = new RegExp(`.{1,${caracteresPorLinha}}`, 'g');
    return texto.match(regex).join('\n');
  }

  produtosFiltrados.forEach(function (pessoa) {
    const observacoesQuebradas = quebrarLinha(pessoa.observacoes, 50);

    strHtml +=
      `<div class="mx-2">
              <div class="row fs-2 mt-2">
                <div class="col-auto">
                  ${pessoa.nome}
                </div>
              </div>
              <div class="row">
                <div class="col-auto">
                  ${pessoa.endereco.rua}, ${pessoa.endereco.numero}, ${pessoa.endereco.bairro}, ${pessoa.endereco.cidade}, ${pessoa.endereco.estado}.
                </div>
              </div>
              <div class="row">
                <div class="col-12 mt-3">
                  <p style="white-space: pre-line;">${observacoesQuebradas}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-auto my-2">
                  <b>Palavras-Chave: </b>${pessoa.opcoes}.
                </div>
              </div>
              <hr class="linha">
            </div>`;
  });
  tela.innerHTML = strHtml;
}
function verificarLogin() {
  var logado = localStorage.getItem('logado');

  if (logado != null) {
    // Se estiver logado, ocultar os elementos de login e cadastrar
    document.getElementById('login').style.display = 'none';
    document.getElementById('cadastrar').style.display = 'none';
  }
  else{
  document.getElementById('meuperfil').style.display = 'none';
  document.getElementById('fazerpedido').style.display = 'none';}
}

document.addEventListener('DOMContentLoaded', verificarLogin);

onload = () => { mostrarprodutos()} 
