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

function atualizarDadosGrafico() {
  console.log("Atualizei os dados!");
  carregarDadosSensor();
  setInterval(carregarDadosSensor, 7000);
}

function gerarGrafico(data) {
  let labelsLinha = [];
  let dadosLinha = [];

  // Pega os dados apenas do Tanque 1
  for (let i = 0; i < data.length; i++) {
    if (data[i].codigoTanque == 1) {
      labelsLinha.push(data[i].codigoTanque);
      dadosLinha.push(Number(data[i].temperatura).toFixed(0));
    } else if (data[i].codigoTanque == 2) {
      labelsLinha.push(data[i].codigoTanque);
      dadosLinha.push(Number(data[i].temperatura).toFixed(0));
    } else if (data[i].codigoTanque == 3) {
      labelsLinha.push(data[i].codigoTanque);
      dadosLinha.push(Number(data[i].temperatura).toFixed(0));
    } else if (data[i].codigoTanque == 4) {
      labelsLinha.push(data[i].codigoTanque);
      dadosLinha.push(Number(data[i].temperatura).toFixed(0));
    }
  }

  // LINHAS DE PARÂMETRO (CRÍTICO)
  let linhaLimiteMaximo = [];
  let linhaLimiteMinimo = [];

  for (let i = 0; i < dadosLinha.length; i++) {
    linhaLimiteMaximo.push(30);
    linhaLimiteMinimo.push(20);
  }

  new Chart(document.getElementById("graficoLinha"), {
    type: "line",
    data: {
      labels: labelsLinha,
      datasets: [
        {
          label: "Temperatura Tanque 1",
          data: dadosLinha,
          tension: 0.3,
          fill: false,
          pointRadius: 4,
        },
        {
          // LINHA SUPERIOR (CRÍTICO ALTO)
          label: "Limite Máximo Seguro (30°C)",
          data: linhaLimiteMaximo,
          borderColor: "#C52A2A",
          borderWidth: 2,
          borderDash: [5, 5], // linha fica tracejada
          fill: false,
          pointRadius: 0,
          pointHoverRadius: 0,
        },
        {
          // LINHA INFERIOR (CRÍTICO BAIXO)
          label: "Limite Mínimo Seguro (20°C)",
          data: linhaLimiteMinimo,
          borderColor: "#C52A2A",
          borderWidth: 2,
          borderDash: [5, 5], // linha fica tracejada
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
