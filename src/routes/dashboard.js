var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");


router.post("/KPIS", function (req, res) {
    dashboardController.KPIS(req, res);
})

router.post("/graficolinha", function (req, res) {
    dashboardController.GraficoLinha(req, res);
})

router.post("/graficobarra", function (req, res) {
    dashboardController.GraficoBarras(req, res);
})

router.post("/graficodonuts", function (req, res) {
    dashboardController.GraficoDonuts(req, res);
})

router.post("/atualizargrafico", function (req, res) {
    dashboardController.AtualizarGrafico(req, res);
})

module.exports = router;