// Verificar se já existem usuários no localStorage
let usersJSON = localStorage.getItem("users");
let users = usersJSON ? JSON.parse(usersJSON) : [];

console.log("Quantidade de usuários:", users.length);

let efetuarLogin = (email, password) => {
  let usersJSON = localStorage.getItem("users");
  let users = usersJSON ? JSON.parse(usersJSON) : [];

  let usuario = null;
  let usuarioIndex = -1;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      usuario = users[i];
      usuarioIndex = i;
      break;
    }
  }

  if (usuario && usuario.password && usuario.password === password) {
    localStorage.setItem("logado", JSON.stringify(usuarioIndex));
    alert("Login realizado com sucesso!");
    window.location.href = "home.html";
  } else {
    alert("Email ou senha incorretos. Por favor, tente novamente.");
  }
};

document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault();

  let email = document.getElementById("email").value;
  let senha = document.getElementById("password").value;

  efetuarLogin(email, senha);

  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
});
