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
        produtosFiltrados.forEach(function (pessoa) {
            strHtml += `
                    <div class="mx-2">
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
                                <p>${pessoa.observacoes}</p>
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
        if (quant === 0) { alert("Pedido não encontrado!"); }

        // Exibir os produtos filtrados na tela
        tela.innerHTML = strHtml;
    }
    else { alert("Não possuí pedidos cadastrados.") }
}
