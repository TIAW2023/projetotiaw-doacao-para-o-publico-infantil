function imprimir() {
    //Verifica se há algum valor armazenado no localStorage.
    var temValorNoLocalStorage = localStorage.getItem("pessoas") !== null;

    //Se tiver algum valor no LocalStorage, entrará nesta condição.
    if (temValorNoLocalStorage) {
        var pessoas = JSON.parse(localStorage.getItem("pessoas"));//Convertendo os valores do localstorage para Json.
        let tela = document.getElementById('tela'); //Mostrar conteúdo na div tela do HTML. 
        var strHtml = '';

        var opcoes = [];
        //Armazenando as opções do usuário no vetor opções.
        var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
        checkboxes.forEach(function (checkbox) {
            opcoes.push(checkbox.value);
        });

        //Verificando se o usuário selecionou alguma opção.
        if (opcoes.length != 0) {
            var quant = 0;
            // 1° repetição - correr pelos pedidos armazenados, 2° repetição - correr pelas palavras-chave do pedido, 3° repetição - corre pelas palavras-chave da pesquisa.
            for (i = 0; i < pessoas.length; i++) { 
                for (j = 0; j < pessoas[i].opcoes.length; j++) { 
                    for (x = 0; x < opcoes.length; x++) { 
                        if (pessoas[i].opcoes[j] == opcoes[x]) { // Condicional usada para mostrar os pedidos que contenham pelo menos uma das palavras-chave selecionadas.
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
            //Caso não sejá encontrado nenhum pedido com as palavas-chave.
            if (quant == 0) {
                var strHtml = ``;
                tela.innerHTML = strHtml;
                alert("Nenhum pedido encontrado!");
            }
         //Caso o usuário tente pesquisar sem ter escolhido alguma opção.   
        }else{alert("Favor escolha uma das opções antes de pesquisar.")}

     //Caso não tenha valor armazenado no LocalStorage. 
    } else {
        alert("Não possuí pedidos cadastrado no localStorage.");
    }
}
