// Verificar se já existem usuários no localStorage
let usersJSON = localStorage.getItem("users");
let users = usersJSON ? JSON.parse(usersJSON) : [];

// ADICIONEI USUARIOS AO LOCAL PARA MOSTRAR QUE ESTA FUNCIONANDO BASTA USAR OS DADOS DELES
console.log("Quantidade de usuários:", users.length);
if (users.length === 0) {
  let defaultUsers = [
    { email: "user1@example.com", password: "password1" },
    { email: "user2@example.com", password: "password2" },
    { email: "user3@example.com", password: "password3" }
  ];

  localStorage.setItem("users", JSON.stringify(defaultUsers));
}

// Função para efetuar o login
let efetuarLogin = (email, password) => {
  // Verificar se já existem usuários cadastrados
  let usersJSON = localStorage.getItem("users");
  let users = usersJSON ? JSON.parse(usersJSON) : [];

  // Encontrar o usuário com o email fornecido
  let usuario = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      usuario = users[i];

     // Armazenar os ids em cada posição no logado
      localStorage.setItem("logado", JSON.stringify(i));
      break;
      
    }
  }

  // Verificar se o usuário existe e a senha está correta
  if (usuario && usuario.password && usuario.password === password) {
    alert("Login realizado com sucesso!");
  } else {
    alert("Email ou senha incorretos. Por favor, tente novamente.");
  }
};

// Manipulador do evento de envio do formulário de login
document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault();

  let email = document.getElementById("email").value;
  let senha = document.getElementById("password").value;

  // Chamar a função de efetuar login
  efetuarLogin(email, senha);

  // Limpar os campos após o login
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
});
