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
        console.log(erro);
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
        console.log(erro);
        console.log("Houve um erro ao fazer sua postagem: ", erro.sqlMessage);
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
        console.log(erro);
        console.log("Houve um erro ao fazer sua postagem: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function curtir(req, res) {


    var idpostagem = req.body.idpostagem;

    forumModel.curtir( idpostagem).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao fazer sua curtida: ", erro.sqlMessagje);
        res.status(500).json(erro.sqlMessage);
    });
}
function obtercomentarios(req, res){
    
    forumModel.obtercomentarios().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });

}

function publicarcomentario(req, res){
    var idpostagem = req.body.idPostagem
    var idUsuario =  req.body.idUsuario
    var comentario =  req.body.comentario
    
    forumModel.publicarcomentario(idpostagem, idUsuario, comentario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });

}

module.exports = {
    pegarpostagens,
    postar,
    curtir,
    obtercomentarios,
    publicarcomentario
}

