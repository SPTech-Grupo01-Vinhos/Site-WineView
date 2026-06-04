var registroModel = require("../models/dashboardModel");

function buscarDadosSensor(req, res) {
  let idUsuario = req.body.idUsuario;

  registroModel
    .buscarDadosSensor(idUsuario)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao buscar os dados do sensor! Erro: ",
        erro.sqlMessage,
      );
      res.status(500).json(erro.sqlMessage);
      return;
    });
}

function buscarDadosTanque(req, res) {
  let idUsuario = req.body.idUsuario;
  let idTanque = req.body.idTanque;

  registroModel
    .buscarDadosTanque(idUsuario, idTanque)
    .then(function (resultadoDadosTanque) {

      registroModel
      .buscarTemperaturasTanque(idUsuario, idTanque)
      .then(function (resultadoTemperaturaTotal){
        let resultadoTemperatura = [];

        for(let i = 0; i < 10; i++) {
          if(resultadoTemperaturaTotal[i] != null){
            resultadoTemperatura.push(resultadoTemperaturaTotal[i]);
          }
        }

        let resposta = {
          dadosTanque: resultadoDadosTanque,
          registroTemperatura: resultadoTemperatura
        }

        res.json(resposta);

      })
      .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao buscar as temperaturas do tanque! Erro: ",
        erro.sqlMessage,
      );
        res.status(500).json(erro.sqlMessage);
        return;
      });

    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao buscar os dados do tanque! Erro: ",
        erro.sqlMessage,
      );
      res.status(500).json(erro.sqlMessage);
      return;
    });
}

function buscarTanques(req, res) {
  let idUsuario = req.body.idUsuario;

  registroModel
    .buscarTanques(idUsuario)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao buscar os tanques! Erro: ",
        erro.sqlMessage,
      );
      res.status(500).json(erro.sqlMessage);
      return;
    });
}

module.exports = {
  buscarDadosSensor,
  buscarDadosTanque,
  buscarTanques
};
