let nome;
let email;
let cnpj;
let telefone;
let senha;
let nomeVinicola;
let qtdTanques;
let ruaLogradouro;
let cidade;
let estadoUF;
let numero;
let CEP;

function proximo() {
  nome = ipt_nome.value;
  email = ipt_email.value;
  cnpj = ipt_cnpj.value;
  telefone = ipt_celular.value;
  senha = ipt_senha.value;

  if (
    nome == "" ||
    email == "" ||
    cnpj == "" ||
    telefone == "" ||
    senha == ""
  ) {
    alert("Preencha todos os campos da primeira etapa!");
    return;
  }

  let posicaoArroba = email.indexOf("@");
  let posicaoCom = email.indexOf(".com");
  let senhaValida = senha.length >= 6;
  let emailValido =
    email.includes("@") &&
    email.includes(".com") &&
    posicaoArroba < posicaoCom &&
    email.endsWith(".com");

  if (!emailValido) {
    alert("E-mail inválido!");
    return;
  }
  if (!senhaValida) {
    alert("Senha inválida! Mínimo de 6 caracteres.");
    return;
  }

  // Se tudo estiver OK, grava e muda de página
  sessionStorage.setItem("nome", nome);
  sessionStorage.setItem("email", email);
  sessionStorage.setItem("cnpj", cnpj);
  sessionStorage.setItem("telefone", telefone);
  sessionStorage.setItem("senha", senha);

  window.location.href = "cadastro-continuacao.html";
}

function cadastrar() {
  nomeVinicola = ipt_nomeVinicola.value;
  qtdTanques = ipt_tanques.value;
  ruaLogradouro = ipt_rua.value;
  cidade = ipt_cidade.value;
  estadoUF = ipt_uf.value;
  numero = ipt_num.value;
  CEP = ipt_cep.value;

  sessionStorage.setItem("nomeVinicola", nomeVinicola);
  sessionStorage.setItem("qtdTanques", Number(qtdTanques));
  sessionStorage.setItem("ruaLogradouro", ruaLogradouro);
  sessionStorage.setItem("cidade", cidade);
  sessionStorage.setItem("estadoUF", estadoUF);
  sessionStorage.setItem("numero", Number(numero));
  sessionStorage.setItem("CEP", CEP);

  let mensagem = "";

  if (
    nomeVinicola != "" &&
    qtdTanques != "" &&
    qtdTanques >= 0 &&
    ruaLogradouro != "" &&
    cidade != "" &&
    estadoUF != "" &&
    numero != "" &&
    numero > 0 &&
    CEP != ""
  ) {
    //cadastrar
    gravarCadastro();
  } else {
    alert("Preencha todos os campos corretamente!");
  }
}

function gravarCadastro() {
  fetch("/usuarios/cadastrar", {
    // rota do backend para cadastrar o usuário
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      //prop_ porque é uma propriedade do json
      prop_nome: sessionStorage.getItem("nome"),
      prop_email: sessionStorage.getItem("email"),
      prop_cnpj: sessionStorage.getItem("cnpj"),
      prop_telefone: sessionStorage.getItem("telefone"),
      prop_senha: sessionStorage.getItem("senha"),
      prop_nomeVinicola: sessionStorage.getItem("nomeVinicola"),
      prop_qtdTanques: sessionStorage.getItem("qtdTanques"),
      prop_ruaLogradouro: sessionStorage.getItem("ruaLogradouro"),
      prop_cidade: sessionStorage.getItem("cidade"),
      prop_estadoUF: sessionStorage.getItem("estadoUF"),
      prop_numero: sessionStorage.getItem("numero"),
      prop_CEP: sessionStorage.getItem("CEP"),
    }),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        clearStorage();

        alert(
          "Cadastro realizado com sucesso! Redirecionando para tela de Login...",
        );
        window.location.href = "../login/login.html";
      } else {
        throw "Ocorreu um erro ao realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
      alert("Ocorreu um erro ao realizar o cadastro!");
    });
}

function clearStorage() {
  sessionStorage.clear();
}
