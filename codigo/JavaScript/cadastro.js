function cadastrarUsuario(email, fullName, password) {
  var usersJSON = localStorage.getItem("users");
  var users = usersJSON ? JSON.parse(usersJSON) : [];

  var userExists = users.some(function(user) {
    return user.email === email;
  });

  if (userExists) {
    alert("Email já cadastrado. Por favor, insira um email diferente.");
    return;
  }

  // Criar um novo usuário
  var newUser = {
    email: email,
    fullName: fullName,
    password: password,
    cpf: null
  };

  // Adicionar o novo usuário à lista de usuários
  users.unshift(newUser);

  // Salvar a lista atualizada no LocalStorage
  localStorage.setItem("users", JSON.stringify(users));

  console.log("Cadastro realizado com sucesso!");
}

document.getElementById("signup-form").addEventListener("submit", function(event) {
  event.preventDefault();

  var email = document.getElementById("email").value;
  var fullName = document.getElementById("fullName").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirm-password").value;

  // Verificar se todos os campos foram preenchidos
  if (!email || !fullName || !password || !confirmPassword) {
    alert("Por favor, preencha todos os campos disponíveis.");
    return;
  }

  // Verificar se as senhas são iguais
  if (password !== confirmPassword) {
    alert("As senhas não coincidem. Por favor, tente novamente.");
    return;
  }

  // Chamar a função de cadastro de usuário
  cadastrarUsuario(email, fullName, password);

  // Limpar os campos após o cadastro
  document.getElementById("email").value = "";
  document.getElementById("fullName").value = "";
  document.getElementById("password").value = "";
  document.getElementById("confirm-password").value = "";

  alert("Cadastro realizado com sucesso!");
});
