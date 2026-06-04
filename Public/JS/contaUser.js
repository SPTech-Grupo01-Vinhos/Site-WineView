let nome = "";
let email = "";
let senha = "";

function buscarDadosUsuario() {
  let idUsuario = sessionStorage.getItem("ID_USUARIO");

  fetch("/usuarios/buscar-usuario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idUsuario: idUsuario,
    }),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then((json) => {
          console.log(json);

          exibirInformacoesUser(json);
        });
      } else {
        alert("Erro ao buscar dados do usuario!");
      }
    })
    .catch(function (erro) {
      alert("Erro ao buscar dados do usuario!");
    });
}

function exibirInformacoesUser(data) {
  nome = data[0].nomeCompleto;
  email = data[0].email;
  senha = data[0].senha;

  document.getElementById("nome-user").innerText = `${nome}`;
  document.getElementById("email-user").innerText = `${email}`;
  document.getElementById("senha-user").innerText = `********`;
}

function liberarEdicao() {
  document.getElementById("nome-user").style.display = "none";
  document.getElementById("email-user").style.display = "none";
  document.getElementById("senha-user").style.display = "none";

  let ipt_nome = document.getElementById("ipt_nome");
  let ipt_email = document.getElementById("ipt_email");
  let ipt_senha = document.getElementById("ipt_senha");

  ipt_senha.type = "text"; // tranforma o tipo da senha para "text" para poder exibir e o user poder ver e editar

  // aqui reatribui os valores das inputs pelas variaveis globais para poder aparecer oque o user esta alterando
  ipt_nome.value = nome;
  ipt_email.value = email;
  ipt_senha.value = senha;

  // aqui ele bloqueia exibicao novamente das inputs
  ipt_nome.style.display = "block";
  ipt_email.style.display = "block";
  ipt_senha.style.display = "block";

  document.getElementById("btn-editarPerfil").style.display = "none";
  document.getElementById("btn-salvarEdicao").style.display = "block";
}

function salvarEdicao() {
  let idUsuario = sessionStorage.getItem("ID_USUARIO");

  fetch("/usuarios/editar-usuario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idUsuario: idUsuario,
      nomeCompleto: ipt_nome.value,
      email: ipt_email.value,
      senha: ipt_senha.value,
    }),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then((json) => {
          console.log(json);

          document.getElementById("nome-user").style.display = "block";
          document.getElementById("email-user").style.display = "block";
          document.getElementById("senha-user").style.display = "block";

          document.getElementById("ipt_nome").style.display = "none";
          document.getElementById("ipt_email").style.display = "none";
          document.getElementById("ipt_senha").style.display = "none";

          document.getElementById("btn-editarPerfil").style.display = "block";
          document.getElementById("btn-salvarEdicao").style.display = "none";

          exibirInformacoesUser(json);
        });
      } else {
        alert("Erro ao buscar dados do usuario!");
      }
    })
    .catch(function (erro) {
      alert("Erro ao buscar dados do usuario!");
    });
}
