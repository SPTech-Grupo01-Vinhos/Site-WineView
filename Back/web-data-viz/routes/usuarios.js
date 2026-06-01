var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    console.log("route usuario cadastrar")
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/gravar-quiz", function (req, res) {
    usuarioController.gravarQuiz(req, res);
});

router.post("/buscar-quiz", function (req, res) {
    usuarioController.buscarQuiz(req, res);
});

module.exports = router;