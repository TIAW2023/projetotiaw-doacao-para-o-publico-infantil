function imprimir() {
    // Verifica se há algum valor armazenado no localStorage
    var temValorNoLocalStorage = localStorage.getItem("pessoas") !== null;

    // Exemplo de uso
    if (temValorNoLocalStorage) {
        var pessoas = JSON.parse(localStorage.getItem("pessoas"));
        let tela = document.getElementById('tela');
        var strHtml = '';

        var opcoes = [];
        var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
        checkboxes.forEach(function (checkbox) {
            opcoes.push(checkbox.value);
        });

        if (opcoes.length != 0) {
            var quant = 0;
            for (i = 0; i < pessoas.length; i++) {
                for (j = 0; j < pessoas[i].opcoes.length; j++) {
                    for (x = 0; x < opcoes.length; x++) {
                        if (pessoas[i].opcoes[j] == opcoes[x]) {
                            strHtml += `
                                    <div class="mx-2">
                                        <div class="row fs-2 mt-2">
                                            <div class="col-auto">
                                                ${pessoas[i].nome}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-auto">
                                                ${pessoas[i].endereco.rua}, ${pessoas[i].endereco.numero}, ${pessoas[i].endereco.bairro}, ${pessoas[i].endereco.cidade}, ${pessoas[i].endereco.estado}.
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 mt-3">
                                                <p>${pessoas[i].observacoes}</p>
                                            </div>  
                                        </div>    
                                        <div class="row">
                                            <div class="col-auto my-2">
                                                <b>Palavras-Chave: </b>${pessoas[i].opcoes}.
                                            </div>
                                        </div>    
                                        <hr class="linha">
                                    </div>`
                            tela.innerHTML = strHtml;
                            quant++;
                        }
                    }
                }
            }
            if (quant == 0) {
                var strHtml = ``;
                tela.innerHTML = strHtml;
                alert("Nenhum pedido encontrado!");
            }
        }else{alert("Favor escolha uma das opções antes de pesquisar.")}
    } else {
        alert("Não possuí pedidos cadastrado no localStorage.");
    }
}
