var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.post("/buscar-dados-sensor", function (req, res) {
    dashboardController.buscarDadosSensor(req, res);
})

router.post("/buscar-dados-tanque", function (req, res) {
    dashboardController.buscarDadosTanque(req, res);
})

router.post("/buscar-tanques", function (req, res) {
    dashboardController.buscarTanques(req, res);
})

module.exports = router;