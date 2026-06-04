var graficoLinha;

function iniciarGrafico() {
  let linhaLimiteMaximo = [];
  let linhaLimiteMinimo = [];
  let dataVazio = [];

  for (let i = 0; i < 10; i++) {
    linhaLimiteMaximo.push(30);
    linhaLimiteMinimo.push(20);
    dataVazio.push('');
  }

  graficoLinha = new Chart(document.getElementById("graficoLinha"), {
    type: "line",
    data: {
      labels: "",
      datasets: [
        {
          label: dataVazio,
          data: dataVazio,
          borderColor: "#42090e",
          backgroundColor: "#42090e",
          tension: 0.3,
          fill: false,
          pointRadius: 4,
        },
        {
          label: "Limite Máximo Seguro (30°C)",
          data: linhaLimiteMaximo,
          borderColor: "#C52A2A",
          borderWidth: 2,
          borderDash: [5, 5],
          fill: false,
          pointRadius: 0,
          pointHoverRadius: 0,
        },
        {
          label: "Limite Mínimo Seguro (20°C)",
          data: linhaLimiteMinimo,
          borderColor: "#C52A2A",
          borderWidth: 2,
          borderDash: [5, 5],
          fill: false,
          pointRadius: 0,
          pointHoverRadius: 0,
        },
      ],
    },
    plugins: [ChartDataLabels],
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: "#42090e",
            font: { weight: "bold" },
          },
        },
        datalabels: {
          display: function (context) {
            return context.datasetIndex === 0;
          },
          color: "#42090e",
          anchor: "end",
          align: "top",
          font: { weight: "bold", size: 14 },
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 0,
          max: 50,
        },
      },
    },
  });
}

function atualizarDadosGrafico() {
  console.log("Inicializando o gráfico e buscando dados...");

  carregarTanques();
  iniciarGrafico();
  carregarDadosTanque();

  setInterval(carregarDadosTanque, 4000);
}

function carregarDadosTanque() {
  let idUsuario = sessionStorage.getItem("ID_USUARIO");
  let idTanque = sessionStorage.getItem("TANQUE_SELECIONADO");

  fetch("/dashboard/buscar-dados-tanque", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idUsuario: idUsuario,
      idTanque: idTanque,
    }),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then((json) => {
          console.log(json);

          gerarGrafico(json);
        });
      } else {
        alert("Erro ao buscar dados do sensor!");
      }
    })
    .catch(function (erro) {
      alert("Erro ao buscar dados do sensor!");
    });
}

function gerarGrafico(data) {
  let infoTanque = data.dadosTanque[0];
  let historicoGeral = data.registroTemperatura;

  let temperatura = Number(infoTanque.temperatura);
  let statusFermentacao = "";
  let corFermentacao = "";

  if (temperatura < 15) {
    statusFermentacao = "MOSTO";
    corFermentacao = "#7c7c7c";
  } else if (temperatura <= 32) {
    statusFermentacao = "EM FERMENTAÇÃO";
    corFermentacao = "#2ba804";
  } else {
    statusFermentacao = "CRÍTICO";
    corFermentacao = "#ac0505";
  }

  document.getElementById("codigo-tanque").innerText =
    `Painel do Tanque ${infoTanque.codigoTanque}`;
  document.getElementById("modeloTanque").innerText =
    infoTanque.modelo.toUpperCase();
  document.getElementById("totalAlertas").innerText = infoTanque.TotalAlertas;
  document.getElementById("temperaturaAtual").innerText =
    `${temperatura.toFixed(1)}°C`;
  document.getElementById("statusTanque").innerText = statusFermentacao;
  document.getElementById("statusTanque").style.color = corFermentacao;

  let labelsLinha = [];
  let dadosLinha = [];

  for (let i = historicoGeral.length - 1; i >= 0; i--) {
    let dataHora = new Date(historicoGeral[i].dtHora);
    let horarioFormatado = dataHora.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    labelsLinha.push(horarioFormatado);
    dadosLinha.push(Number(historicoGeral[i].temperatura).toFixed(1));
  }

  

  graficoLinha.data.labels = labelsLinha;
  graficoLinha.data.datasets[0].label = `Temperatura ${infoTanque.codigoTanque}`;
  graficoLinha.data.datasets[0].data = dadosLinha;
  
  graficoLinha.update();
}

function carregarTanques() {
  let idUsuario = sessionStorage.getItem("ID_USUARIO");

  fetch("/dashboard/buscar-tanques", {
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
        console.log(resposta);

        resposta.json().then((json) => {
          criarSelectTanques(json);
        });
      } else {
        alert("Erro ao buscar tanques!");
      }
    })
    .catch(function (erro) {
      alert("Erro ao buscar tanques!");
    });
}

function criarSelectTanques(data) {
  let htmlSelect =
    '<option value="#">Selecione o painel específico...</option>';

  for (let i = 0; i < data.length; i++) {
    htmlSelect += `<option value="${data[i].idTanque}">${data[i].codigoTanque}</option>`;
  }

  document.getElementById("select_especifico").innerHTML = htmlSelect;
}

function mudarParaEspecifico() {
  let select = document.getElementById("select_especifico");
  let idTanqueSelecionado = select.value;

  sessionStorage.setItem("TANQUE_SELECIONADO", idTanqueSelecionado);

  window.location.href = "../dashboard/painelTanques.html";
}
