var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

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
          nome: resultadoAutenticar[0].nome,
          senha: resultadoAutenticar[0].senha,
          perfil: resultadoAutenticar[0].perfil,
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
  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var perfil = req.body.perfilServer;

  // Faça as validações dos valores
  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (perfil == undefined) {
    res.status(400).send("O campo da pergunta está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .cadastrar(nome, email, senha, perfil)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage,
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function gravarQuiz(req, res) {

  console.log(req.body)

  let resultado = {
    pontuacao: req.body.pontuacao,
    numeroQuiz: req.body.numeroQuiz,
    idUsuario: req.body.idUsuario,
    q1: req.body.q1,
    q2: req.body.q2,
    q3: req.body.q3,
    q4: req.body.q4,
    q5: req.body.q5,
  }

  if (resultado.idUsuario == undefined) {
    res.status(400).send("Usuário inválido!");
    return
  }

  usuarioModel
  .gravarResultado(resultado)
  .then(function (res) {
    console.log(res);
  })
  .catch(function (erro) {
    console.log(erro);
    console.log("\nHouve um erro ao gravar o resultado! Erro: ", erro.sqlMessage,);
    res.status(500).json(erro.sqlMessage);
    return
  });
}

function buscarQuiz(req, res) {
  let numeroQuiz = req.body.numeroQuiz;

  usuarioModel
  .buscarQuiz(numeroQuiz)
  .then(function (resultado) {
    console.log(resultado)
    res.json(resultado);
  })
  .catch(function (erro) {
    console.log(erro);
    console.log("\nHouve um erro ao buscar o quiz! Erro: ", erro.sqlMessage,);
    res.status(500).json(erro.sqlMessage);
    return
  });

}

module.exports = {
  autenticar,
  cadastrar,
  gravarQuiz,
  buscarQuiz
};
