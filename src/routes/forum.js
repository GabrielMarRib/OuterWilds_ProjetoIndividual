var express = require("express");
var router = express.Router();

var forumController = require("../controllers/forumController");


router.get("/pegarpostagens", function (req, res) {
    forumController.pegarpostagens(req, res);
})
router.post("/postar", function (req, res) {
    forumController.postar(req, res);
})


module.exports = router;