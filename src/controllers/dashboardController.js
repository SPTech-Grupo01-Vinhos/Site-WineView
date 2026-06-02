var registroModel = require("../models/registroModel");

function buscarDadosSensor(req, res) {
  let idUsuario = req.body.idUsuario;

  registroModel
    .buscarDadosSensor(idUsuario)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro)
      console.log("\nHouve um erro ao buscar os dados do sensor! Erro: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
      return;
    });
}

module.exports = {
  buscarDadosSensor
};
