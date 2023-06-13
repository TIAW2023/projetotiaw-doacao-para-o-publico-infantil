
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
            
            // Criar um objeto com os dados da pessoa
            var pessoa = {
                nome: nome,
                endereco: {
                    cep: cep,
                    rua: rua,
                    numero: numero,
                    bairro: bairro,
                    cidade: cidade,
                    estado: estado
                },
                observacoes: observacoes,
                opcoes: opcoes
            };
            
            // Verificar se já existem informações de pessoas no Local Storage
            var pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];
            
            // Adicionar os dados da pessoa ao array
            pessoas.push(pessoa);
            
            // Salvar o array atualizado no Local Storage
            localStorage.setItem("pessoas", JSON.stringify(pessoas));
            
            console.log("Dados da pessoa salvos no Local Storage.");
        }

