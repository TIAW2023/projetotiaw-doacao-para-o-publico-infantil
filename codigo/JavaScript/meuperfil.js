let bancoDados = JSON.parse(localStorage.getItem("dados"));
var bio = "Oi, me chamo João, tenho 35 anos e amo fazer doações.";
if (!bancoDados) {

    bancoDados = [
        {
            "nomeCliente": "João",
            "emailCliente": "joaoemaria@gmail.com",
            "cpfCliente": "222 222 222 55",
            "cepCliente": "31 777 333",
            "biografiaCliente": bio
        }
    ]
    localStorage.setItem("dados", JSON.stringify(bancoDados));
}


function limparForm() {
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("cep").value = "";
    document.getElementById("biografia").value = "";
}


function exibirContatos(filtroBusca) {
    
    var strCard = "";

    for (let index = 0; index < bancoDados.length; index++) {
        const contato = bancoDados[index];

        // Criando o vetor com as informações do contato, para passar por meio do button editar,
        // caso a pessoa queira editar informações daquele contato
        var dados = index;
 
        if (filtroBusca == null) {

            strCard += `
                <!--Imagem de perfil-->
                <div class="row">
                    <div class="col-auto">
                        <img src="https://tm.ibxk.com.br/2017/06/22/22100428046161.jpg" alt="Perfil" class="Perfil"
                            style="width: 200px; height: 200x;"> </img>
                    </div>
                    <!--Informações-->
                    <div class="col-auto">
                        <h6>
                            <b id="nome">Nome:</b> ${contato.nomeCliente}<br>
                            <b id="email">E-mail:</b> ${contato.emailCliente}<br>
                            <b id="cpf">CPF/CNPJ:</b> ${contato.cpfCliente}<br>
                            <b id="cep">CEP:</b> ${contato.cepCliente}
                        </h6>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <h6 class="mt-3">
                            <b>Biografia</b>
                        </h6>
                        <p id="biografia">
                            ${contato.biografiaCliente}
                        </p>

                        <p>
                            <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="${dados}">
                                Editar
                              </button>
                        </p>



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
                    const modalCEP = exampleModal.querySelector('#cep')
                    const modalBIO = exampleModal.querySelector('#biografia')

                    // Atribuindo no modal os valores retornados do button
                    modalId.value = recipient
                    modalNome.value = bancoDados[recipient].nomeCliente
                    modalEmail.value = bancoDados[recipient].emailCliente
                    modalCPF.value = bancoDados[recipient].cpfCliente
                    modalCEP.value = bancoDados[recipient].cepCliente
                    modalBIO.value = bancoDados[recipient].biografiaCliente
                })
            }


        }


    }

    // Escreve na tela os contatos presentes no LocalStorage
    document.querySelector('#tela').innerHTML = strCard;
}

function editarContato() {

    var i = document.getElementById("idIn").value;
    var nome = document.getElementById("nomeEdit").value;
    var email = document.getElementById("email").value;
    var cpf = document.getElementById("cpf-cnpj").value;
    var cep = document.getElementById("cep").value;
    var bio = document.getElementById("biografia").value;

    if ((nome.length < 2) || (email.length < 12) || (cpf.length < 11) || (cep.length < 8) || (bio.length < 15)) {
        if (nome.length < 2)
            alert("É necessário no mínimo duas letras no campo nome!");

        if (email.length < 12)
            alert("O campo email deve ter o seguinte formato: soueu@hotmail.com.br!");
        
        if (cpf.length < 11)
        alert("O campo cpf deve ter o seguinte formato:  224.333.545-21!");

        if (cep.length < 8)
        alert("O campo cep deve ter o seguinte formato: 31-123-321!");

        if (bio.length < 15)
        alert("O campo cep deve ter no mínimo 30 caracteres!");

    }
    else {
        bancoDados[i].nomeCliente = nome;
        bancoDados[i].emailCliente = email;
        bancoDados[i].cpfCliente = cpf;
        bancoDados[i].cepCliente = cep;
        bancoDados[i].biografiaCliente = bio;

        localStorage.setItem("dados", JSON.stringify(bancoDados));

        alert("Informações editadas com sucesso!");

       $("#modal .close").click();
       location.reload();
        
        exibirContatos();
    }
}


onload = () => {
    exibirContatos();
}
