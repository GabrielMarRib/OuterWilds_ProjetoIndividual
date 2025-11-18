var forumModel = require("../models/forumModel");


function pegarpostagens(req, res) {

    console.log("Chegou aqui A")
    forumModel.pegarpostagens().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);autenticar
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function postar(req, res) {

    var idusuario = req.body.idusuario;
    var imagem = req.body.imagem;
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
      

    forumModel.postar(idusuario, imagem, titulo, descricao).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);autenticar
        console.log("Houve um erro ao fazer sua postagem: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    pegarpostagens,
    postar
}

