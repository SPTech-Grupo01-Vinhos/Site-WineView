var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.post("/buscar-dados-sensor", function (req, res) {
    dashboardController.buscarDadosSensor(req, res);
})

module.exports = router;