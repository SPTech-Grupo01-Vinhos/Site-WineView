function carregarAlertas() {

    buscarAlertas()

    setInterval(buscarAlertas, 5000)

}

function buscarAlertas() {
  let idUsuario = sessionStorage.getItem("ID_USUARIO");

  fetch("/dashboard/buscar-alertas", {
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
          listarAlertasHtml(json);
        });
      } else {
        alert("Erro ao buscar tanques!");
      }
    })
    .catch(function (erro) {
      alert("Erro ao buscar tanques!");
    });
}

function listarAlertasHtml(data) {
  let alertasHtml = "";

  for (let i = 0; i < data.length; i++) {
    alertasHtml += `
            <div class="cardsAlertas">
                <div class="iconeAlerta">
                    <img src="../img/dash/iconalerta.png" alt="">
                </div>
                <div class="infoAlerta">
                    <h3>Tanque: ${data[i].codigoTanque}</h3>
                    <p><b>Status:</b> ${data[i].mensagem}</p>
                    <p><b>Leitura:</b> ${Number(data[i].temperatura).toFixed(0)}°C</p>
                </div>
                <div class="divisor"></div>
                <div class="tempoAlerta">
                    <p>Registrado às</p>
                    <span>${formatarData(data[i].dtHora)}</span>
                </div>
            </div>
        `;
  }

  document.getElementById("lista-alertas").innerHTML = alertasHtml;
}

function formatarData(dataHora) {
  if (dataHora == null || dataHora == undefined || dataHora.length == 0) {
    return "Horário não registrado";
  }

  let data = dataHora.split("T")[0];
  let dataArray = data.split("-");
  let dataFormatada = `${dataArray[2]}/${dataArray[1]}/${dataArray[0]}`;

  let horario = dataHora.split("T")[1];
  let horarioArray = horario.split(":");
  let horarioFormatado = `${horarioArray[0]}:${horarioArray[1]}`;

  let dataHoraFormatada = `${dataFormatada} ${horarioFormatado}`;

  return dataHoraFormatada;
}
