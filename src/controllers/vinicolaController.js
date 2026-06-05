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
    let idUsuario = req.body.idUsuario;
    let nomeVinicola = req.body.nomeVinicola;
    let telefone = req.body.telefone;
    let cnpj = req.body.cnpj;
    let qtdTanquesSuportados = req.body.qtdTanquesSuportados;

    if (idUsuario == undefined) {
        return res.status(400).send("O ID do usuário está undefined!");
    }

    vinicolaModel
        .editarVinicola(nomeVinicola, telefone, cnpj, qtdTanquesSuportados, idUsuario)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao editar a vinícola! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    buscarVinicola,
    editarVinicola
};
