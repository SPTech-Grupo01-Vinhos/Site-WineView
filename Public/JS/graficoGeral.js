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

function gerarGrafico(data) {
  let labelsBarra = [];
  let dadosBarra = [];

  for (let i = 0; i < data.length; i++) {
    labelsBarra.push(data[i].codigoTanque);
    dadosBarra.push(Number(data[i].temperatura).toFixed(0));
  }

  let cores = [];

  for (let i = 0; i < dadosBarra.length; i++) {
    let v = dadosBarra[i];

    if (v < 20) {
      cores.push("#E6982B");
    } else if (v > 30) {
      cores.push("#C52A2A");
    } else {
      cores.push("#6BBF61");
    }
  }

  new Chart(document.getElementById("graficoBarra"), {
    type: "bar",

    data: {
      labels: labelsBarra,

      datasets: [
        {
          label: "Temperatura",
          data: dadosBarra,
          backgroundColor: cores,
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