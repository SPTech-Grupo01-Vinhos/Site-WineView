var usuarioModel = require("../models/usuarioModel");
var vinicolaModel = require("../models/vinicolaModel");
var enderecoModel = require("../models/enderecoModel");

function autenticar(req, res) {
  var email = req.body.email;
  var senha = req.body.senha;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  }

  usuarioModel
    .autenticar(email, senha)
    .then(function (resultadoAutenticar) {
      console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
      console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

      if (resultadoAutenticar.length == 1) {
        console.log("Resultado encontrado");
        console.log(resultadoAutenticar);
        res.json({
          id: resultadoAutenticar[0].idUsuario,
          email: resultadoAutenticar[0].email,
          nome: resultadoAutenticar[0].nomeCompleto,
        });
      } else if (resultadoAutenticar.length == 0) {
        res.status(403).send("Email e/ou senha inválido(s)");
      } else {
        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar o login! Erro: ",
        erro.sqlMessage,
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function cadastrar(req, res) {
  console.log("Controller cadastrar");
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

  let dados_usuario = {
    nome: req.body.prop_nome,
    email: req.body.prop_email,
    senha: req.body.prop_senha,
  };

  let dados_vinicola = {
    nomeVinicola: req.body.prop_nomeVinicola,
    qtdTanques: req.body.prop_qtdTanques,
    cnpj: req.body.prop_cnpj,
    telefone: req.body.prop_telefone,
  };

  let dados_endereco = {
    ruaLogradouro: req.body.prop_ruaLogradouro,
    cidade: req.body.prop_cidade,
    estadoUF: req.body.prop_estadoUF,
    numero: req.body.prop_numero,
    cep: req.body.prop_CEP,
  };

  usuarioModel
    .cadastrar(dados_usuario)
    .then(function (res_usuario) {
      console.log("res_usuario:");
      console.log(res_usuario);

      enderecoModel
        .cadastrar(dados_endereco)
        .then(function (res_endereco) {
          console.log("res_endereco:");
          console.log(res_endereco);

          vinicolaModel
            .cadastrar(
              dados_vinicola,
              res_usuario.insertId,
              res_endereco.insertId,
            )
            .then(function (res_vinicola) {
              console.log("Cadastro realizado com sucesso!");
              res.json(JSON.stringify({ ok: true }));
            })
            .catch(function (erro) {
              console.log(
                "\nHouve um erro ao realizar o cadastro da vinícola! Erro: ",
                erro.sqlMessage,
              );
              res.status(500).json(erro.sqlMessage);
              return;
            });
        })
        .catch(function (erro) {
          console.log(
            "\nHouve um erro ao realizar o cadastro do endereço! Erro: ",
            erro.sqlMessage,
          );
          res.status(500).json(erro.sqlMessage);
          return;
        });
    })
    .catch(function (erro) {
      console.log(
        "\nHouve um erro ao realizar o cadastro do usuário! Erro: ",
        erro.sqlMessage,
      );
      res.status(500).json(erro.sqlMessage);
      return;
    });
}

function buscarUsuario(req, res) {
  let idUsuario = req.body.idUsuario;

  usuarioModel
    .buscarUsuario(idUsuario)
    .then(function (resposta) {
      res.json(resposta);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao buscar o id do usuario! Erro: ",
        erro.sqlMessage,
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function editarUsuario(req, res) {
  let idUsuario = req.body.idUsuario;
  let nome = req.body.nomeCompleto;
  let email = req.body.email;
  let senha = req.body.senha;

  usuarioModel
    .editarUsuario(idUsuario, nome, email, senha)
    .then(function (resposta) {

       usuarioModel
      .buscarUsuario(idUsuario)
      .then(function (res_user) {
        res.json(res_user);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao buscar o id do usuario! Erro: ",
          erro.sqlMessage,
        );
        res.status(500).json(erro.sqlMessage);
      });

    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao buscar o id do usuario! Erro: ",
        erro.sqlMessage,
      );
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  autenticar,
  cadastrar,
  buscarUsuario,
  editarUsuario
};
