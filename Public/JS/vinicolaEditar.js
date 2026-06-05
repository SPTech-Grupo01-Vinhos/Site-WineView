let nomeVinicola = "";
let telefone = "";
let cnpj = "";
let qtdTanquesSuportados = "";
let rua = "";
let numero = "";
let bairro = "";
let cep = "";
let cidade = "";
let estado = "";

function buscarDadosUsuario() {
  let idUsuario = sessionStorage.getItem("ID_USUARIO");

  console.log("ID do usuário capturado no sessionStorage:", idUsuario);

  fetch("/vinicola/buscarVinicola", {
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

          exibirInformacoesVinicola(json);
        });
      } else {
        alert("Erro ao buscar dados da vinicola!");
      }
    })
    .catch(function (erro) {
      alert("Erro ao buscar dados da vinicola!");
    });
}

function exibirInformacoesVinicola(data) {
  nomeVinicola = data[0].nomeVinicola;
  telefone = data[0].telefone;
  cnpj = data[0].cnpj;
  qtdTanquesSuportados = data[0].qtdTanquesSuportados;

  document.getElementById("nomeVinicola").innerText = `${nomeVinicola}`;
  document.getElementById("telefone").innerText = `${telefone}`;
  document.getElementById("cnpj").innerText = `${cnpj}`;
  document.getElementById("qtdTanques").innerText = `${qtdTanquesSuportados}`;
}

function editarvinicola(){
  // 1. Esconde os parágrafos de texto originais
  document.getElementById("nomeVinicola").style.display = "none";
  document.getElementById("telefone").style.display = "none";
  document.getElementById("cnpj").style.display = "none";
  document.getElementById("qtdTanques").style.display = "none";
  document.getElementById("rua").style.display = "none";
  document.getElementById("numero").style.display = "none";
  document.getElementById("bairro").style.display = "none";
  document.getElementById("cep").style.display = "none";
  document.getElementById("cidade").style.display = "none";
  document.getElementById("estado").style.display = "none";

  // 2. Captura os elementos de input
  let ipt_nomeVinicola = document.getElementById("ipt_nomeVinicola");
  let ipt_telefone = document.getElementById("ipt_telefone");
  let ipt_cnpj = document.getElementById("ipt_cnpj");
  let ipt_qtdTanques = document.getElementById("ipt_qtdTanques");
  let ipt_rua = document.getElementById("ipt_rua");
  let ipt_numero = document.getElementById("ipt_numero");
  let ipt_bairro = document.getElementById("ipt_bairro");
  let ipt_cep = document.getElementById("ipt_cep");
  let ipt_cidade = document.getElementById("ipt_cidade");
  let ipt_estado = document.getElementById("ipt_estado");

  // 3. Atribui os valores (usando o que veio do banco OU pegando o que já estava na tela)
  ipt_nomeVinicola.value = nomeVinicola;
  ipt_telefone.value = telefone;
  ipt_cnpj.value = cnpj;
  ipt_qtdTanques.value = qtdTanquesSuportados; // Corrigido para a variável global certa
  ipt_rua.value = rua;
  ipt_numero.value = numero;
  ipt_bairro.value = bairro;
  ipt_cep.value = cep;
  ipt_cidade.value = cidade;
  ipt_estado.value = estado;
  
  // Como rua, numero, etc. não foram declarados globalmente, pegamos do próprio texto da tela:
  ipt_rua.value = document.getElementById("rua").innerText;
  ipt_numero.value = document.getElementById("numero").innerText;
  ipt_bairro.value = document.getElementById("bairro").innerText;
  ipt_cep.value = document.getElementById("cep").innerText;
  ipt_cidade.value = document.getElementById("cidade").innerText;
  ipt_estado.value = document.getElementById("estado").innerText;

  // 4. Mostra os inputs na tela
  ipt_nomeVinicola.style.display = "block";
  ipt_telefone.style.display = "block";
  ipt_cnpj.style.display = "block";
  ipt_qtdTanques.style.display = "block";
  ipt_rua.style.display = "block";
  ipt_numero.style.display = "block";
  ipt_bairro.style.display = "block";
  ipt_cep.style.display = "block";
  ipt_cidade.style.display = "block";
  ipt_estado.style.display = "block";

  // 5. Alterna os botões (agora com os IDs batendo com o HTML)
  document.getElementById("btn-editarPerfil").style.display = "none";
  document.getElementById("btn-salvarVinicola").style.display = "block";
}


function salvarVinicola(){
  let idUsuario = sessionStorage.getItem("ID_USUARIO");

  fetch("/vinicola/editarVinicola", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idUsuario: sessionStorage.getItem("ID_USUARIO"),
      nomeVinicola: ipt_nomeVinicola.value,
      telefone: ipt_telefone.value,
      cnpj: ipt_cnpj.value,
      qtdTanquesSuportados: ipt_qtdTanques.value,
    }),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then((json) => {
          console.log(json);

          document.getElementById("nomeVinicola").style.display = "block";
          document.getElementById("telefone").style.display = "block";
          document.getElementById("cnpj").style.display = "block";
          document.getElementById("qtdTanques").style.display = "block";

          document.getElementById("ipt_nomeVinicola").style.display = "none";
          document.getElementById("ipt_telefone").style.display = "none";
          document.getElementById("ipt_cnpj").style.display = "none";
          document.getElementById("qtdTanquesSuportados").style.display = "none";

          document.getElementById("btn-editarPerfil").style.display = "block";
          document.getElementById("btn-salvarVinicola").style.display = "none";

          exibirInformacoesVinicola(json);
        });
        window.location.reload();
      } else {
        alert("Erro ao salvar dados da vinícola!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      alert("Erro ao salvar dados da vinícola!");
    });
}