var express = require("express");
var router = express.Router();

var forumController = require("../controllers/forumController");


router.get("/pegarpostagens", function (req, res) {
    forumController.pegarpostagens(req, res);
})
router.post("/postar", function (req, res) {
    forumController.postar(req, res);
})
router.post("/curtir", function (req, res) {
    forumController.curtir(req, res);
})
router.get("/obtercomentarios", function (req, res) {
    forumController.obtercomentarios(req, res);
})
router.post("/publicarcomentario", function (req, res) {
    forumController.publicarcomentario(req, res);
})



module.exports = router;