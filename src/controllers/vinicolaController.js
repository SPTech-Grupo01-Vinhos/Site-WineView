var vinicolaModel = require("../models/vinicolaModel");

function buscarVinicola(req, res) {
  let idUsuario = req.body.idUsuario;

  vinicolaModel
    .buscarVinicola(idUsuario)
    .then(function (resposta) {
      res.json(resposta);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao buscar o id da vinicola! Erro: ",
        erro.sqlMessage,
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function editarVinicola(req, res) {
  var nomeVinicola = req.body.nomeVinicola;
  var telefone = req.body.telefone;
  var cnpj = req.body.cnpj;
  var qtdTanquesSuportados = req.body.qtdTanquesSuportados;
  let idUsuario = req.body.idUsuario;

  let dados_vinicola = {
    nomeVinicola: nomeVinicola,
    telefone: telefone,
    cnpj: cnpj,
    qtdTanquesSuportados: qtdTanquesSuportados,
  };

  if (idUsuario == undefined) {
    return res.status(400).send("O ID do usuário está undefined!");
  }

  vinicolaModel
    .editarVinicola(dados_vinicola, idUsuario)
    .then(function (resultado) {
      
      vinicolaModel
      .buscarVinicola(idUsuario)
      .then(function (res_vinicola) {
        res.json(res_vinicola);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao buscar o id da vinicola! Erro: ",
          erro.sqlMessage,
        );
        res.status(500).json(erro.sqlMessage);
      });
      
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao editar a vinícola! Erro: ",
        erro.sqlMessage,
      );
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  buscarVinicola,
  editarVinicola
};
