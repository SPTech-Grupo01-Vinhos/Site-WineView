var express = require("express");
var router = express.Router();

var vinicolaController = require("../controllers/vinicolaController")

router.post("/editarVinicola", function (req, res) {
    console.log("route vinicola cadastrar")
    vinicolaController.editarVinicola(req, res);
})

router.post("/buscarVinicola", function (req, res) {
    console.log("route vinicola buscar")
    vinicolaController.buscarVinicola(req, res);
})

module.exports = router;