var graficoBarra;

function iniciarGrafico() {
  graficoBarra = new Chart(document.getElementById("graficoBarra"), {
    type: "bar",

    data: {
      labels: [],

      datasets: [
        {
          label: "Temperatura",
          data: [],
          backgroundColor: [],
          borderRadius: 8,
        },
      ],
    },

    plugins: [ChartDataLabels],

    options: {
      responsive: true,

      maintainAspectRatio: false,

      plugins: {
        legend: {
          display: false,
        },

        datalabels: {
          color: "#42090e",

          anchor: "end",

          align: "top",

          font: {
            weight: "bold",
            size: 14,
          },
        },
      },

      scales: {
        y: {
          beginAtZero: true,

          max: 50,
        },
      },
    },
  });
}

function atualizarDadosGrafico() {
  console.log("Inicializando o gráfico e buscando dados...");

  iniciarGrafico();
  carregarDadosSensor();

  setInterval(carregarDadosSensor, 10000);
}

function carregarDadosSensor() {
  let idUsuario = sessionStorage.getItem("ID_USUARIO");

  fetch("/dashboard/buscar-dados-sensor", {
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
          console.log(json);
          gerarKPI(json);
          gerarGrafico(json, graficoBarra);
        });
      } else {
        alert("Erro ao buscar dados do sensor!");
      }
    })
    .catch(function (erro) {
      alert("Erro ao buscar dados do sensor!");
    });
}

function gerarGrafico(data, grafico) {
  let labelsBarra = [];
  let dadosBarra = [];

  console.log(grafico.data);

  for (let i = 0; i < data.length; i++) {
    labelsBarra.push(data[i].codigoTanque);
    dadosBarra.push(Number(data[i].temperatura).toFixed(0));
  }

  cores = [];

  for (let i = 0; i < dadosBarra.length; i++) {
    let temperatura = dadosBarra[i];

    if (temperatura < 20) {
      cores.push("#E6982B");
    } else if (temperatura > 30) {
      cores.push("#C52A2A");
    } else {
      cores.push("#6BBF61");
    }
  }

  grafico.data.labels = labelsBarra;
  grafico.data.datasets[0].data = dadosBarra;
  grafico.data.datasets[0].backgroundColor = cores;

  grafico.update();
}

function mudarParaEspecifico() {
  let select = document.getElementById("select_especifico");
  let tanqueSelecionado = select.value;

  if (tanqueSelecionado == "#") {
    return;
  } else if (tanqueSelecionado == "t1") {
    window.location.href = "../dashboard/painelT1.html";
  } else if (tanqueSelecionado == "t2") {
    window.location.href = "../dashboard/painelT2.html";
  } else if (tanqueSelecionado == "t3") {
    window.location.href = "../dashboard/painelT3.html";
  } else if (tanqueSelecionado == "t4") {
    window.location.href = "../dashboard/painelT4.html";
  }

  console.log("O usuário escolheu o tanque: " + tanqueEscolhido);
}

// funcao KPI's
function gerarKPI(data) {
  let totalDeTanques = 0;
  let totalDeSensoresInativos = 0;
  let totalAbaixoDoIdeal = 0;
  let totalAcimaDoIdeal = 0;

  totalDeTanques = data.length;

  for (let i = 0; i < data.length; i++) {
    if (data[i].statusSensor == 0) {
      totalDeSensoresInativos++;
    }

    if (data[i].temperatura <= 20) {
      totalAbaixoDoIdeal++;
    } else if (data[i].temperatura >= 30) {
      totalAcimaDoIdeal++;
    }
  }
  document.getElementById("sensoresInativos").innerText = totalDeSensoresInativos;
  document.getElementById("totalAbaixoIdeal").innerText = totalAbaixoDoIdeal;
  document.getElementById("totalAcimaIdeal").innerText = totalAcimaDoIdeal;
  document.getElementById("TotalTanques").innerText = totalDeTanques;
}
