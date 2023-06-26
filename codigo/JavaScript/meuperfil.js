let bancoDados = JSON.parse(localStorage.getItem("users"));

function limparForm() {
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("cep").value = "";
    document.getElementById("biografia").value = "";
}

function quebrarLinha(texto, caracteresPorLinha) {
    const regex = new RegExp(`.{1,${caracteresPorLinha}}`, 'g');
    return texto.match(regex).join('\n');
}

function exibirContatos() {

    var strCard = "";
    var id = JSON.parse(localStorage.getItem("logado"));

    //passar a posição (0) para uma variavel para que puxe exatamente a posição da pessoa logada
    const contato = bancoDados[id];
    // Criando o vetor com as informações do contato, para passar por meio do button editar,
    // caso a pessoa queira editar informações daquele contato
    var dados = id;
    const observacoesQuebradas = quebrarLinha(contato.bio, 50);

    strCard = `
                <!--Imagem de perfil-->
                <div class="row">
                    <div class="col-auto">
                        <img src="https://tm.ibxk.com.br/2017/06/22/22100428046161.jpg" alt="Perfil" class="Perfil" style="width: 200px; height: 200x;"></img>
                    </div>
                    <!--Informações-->
                    <div class="col-auto">
                        <h6>
                            <b id="nome">Nome:</b> ${contato.fullName}<br>
                            <b id="email">E-mail:</b> ${contato.email}<br>
                            <b id="cpf">CPF/CNPJ:</b> ${contato.cpf}<br>
                        </h6>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <h6 class="mt-3">
                            <b>Biografia</b>
                        </h6>
                        <p id="biografia">
                            ${observacoesQuebradas}
                        </p>

                        <p>
                            <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="${dados}">Editar</button>
                        </p>
                    </div>
                </div>`



    // Exibindo o modal já com as informações do contato que a pessoa quer editar
    const exampleModal = document.getElementById('exampleModal')
    if (exampleModal) {
        exampleModal.addEventListener('show.bs.modal', event => {
            //Botão que acionou o modal
            const button = event.relatedTarget

            // Extraindo informação do data-bs-*
            var recipient = button.getAttribute('data-bs-whatever')

            // Passando a string retornada para um vetor de dados com id, nome e telefone


            // Selecionando os elementos do modal que serão editados
            const modalId = exampleModal.querySelector('#idIn')
            const modalNome = exampleModal.querySelector('#nomeEdit')
            const modalEmail = exampleModal.querySelector('#email')
            const modalCPF = exampleModal.querySelector('#cpf-cnpj')
            const modalBIO = exampleModal.querySelector('#biografia')

            // Atribuindo no modal os valores retornados do button
            modalId.value = recipient
            modalNome.value = bancoDados[recipient].fullName
            modalEmail.value = bancoDados[recipient].email
            modalCPF.value = bancoDados[recipient].cpf
            modalBIO.value = bancoDados[recipient].bio
        })
    }

    // Escreve na tela os contatos presentes no LocalStorage
    document.querySelector('#tela').innerHTML = strCard;
}


function editarContato() {

    var id = JSON.parse(localStorage.getItem("logado"));
    
    var nome = document.getElementById("nomeEdit").value;
    var email = document.getElementById("email").value;
    var cpf = document.getElementById("cpf-cnpj").value;
    var bio = document.getElementById("biografia").value;

    if ((nome.length < 2) || (email.length < 12) || (cpf.length < 14) || (bio.length < 15)) {
        if (nome.length < 2)
            alert("É necessário no mínimo duas letras no campo nome!");

        if (email.length < 12)
            alert("O campo email deve ter o seguinte formato: soueu@hotmail.com.br!");

        if (cpf.length < 14)
            alert("O campo cpf deve ter o seguinte formato:  224.333.545-21!");

        if (bio.length < 15)
            alert("O campo biografia deve ter no mínimo 30 caracteres!");
    }
    else {
        bancoDados[id].fullName = nome;
        bancoDados[id].email = email;
        bancoDados[id].cpf = cpf;
        bancoDados[id].bio = bio;

        localStorage.setItem("users", JSON.stringify(bancoDados));

        alert("Informações editadas com sucesso!");

        $("#modal .close").click();
        location.reload();

        exibirContatos();
    }
}


onload = () => {
    exibirContatos();
}
