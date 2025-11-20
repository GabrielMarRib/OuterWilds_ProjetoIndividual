var dashboardModel = require("../models/dashboardModel");



async function KPIS(req, res) {
    console.log("Chegou aqui DASHBOARD KPI");

    var idusuario = req.body.idusuario;
    if (idusuario == undefined) {
        res.status(400).send("Seu id de usuario está undefined!");
        return; 
    }

    try {
        const [
            mediaResult,
            postagemResult,
            totalPostResult,
            totalCurtidasResult
        ] = await Promise.all([
            dashboardModel.MediaCurtidas(idusuario),
            dashboardModel.PostagemMaisCurtida(idusuario),
            dashboardModel.TotalPostagem(idusuario),
            dashboardModel.TotalCurtidas(idusuario)
        ]);

        // console.log("VALORES DA DASH NO CONTROLLER: "+JSON.stringify(mediaResult) +'/'+ JSON.stringify(postagemResult) +'/'+ JSON.stringify(totalPostResult) +'/'+ JSON.stringify(totalCurtidasResult))
        const ResultadoFinal = {
            MediaCurtidas: mediaResult.length > 0 && mediaResult[0].MediaCurtidas != null ? mediaResult[0].MediaCurtidas : 0,
            PostagemMaisCurtida: postagemResult.length > 0 && postagemResult[0] != null ? postagemResult[0] : 0,
            TotalPostagem: totalPostResult.length > 0 && totalPostResult[0].TotalPostagem != null ? totalPostResult[0].TotalPostagem : 0,
            TotalCurtidas: totalCurtidasResult.length > 0 && totalCurtidasResult[0].TotalCurtidas != null ? totalCurtidasResult[0].TotalCurtidas : 0
        };

     
        console.log("Voltando os dados" + JSON.stringify(ResultadoFinal));
        res.status(200).json(ResultadoFinal); 

    } catch (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as KPIs: ", erro.sqlMessage || erro.message);
        res.status(500).json(erro.sqlMessage || erro.message);
    }
}


function GraficoLinha(req, res) {
       var idusuario = req.body.idusuario;

        dashboardModel.GraficoLinha(idusuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar dados do grafico: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}


function GraficoBarras(req, res) {
       var idusuario = req.body.idusuario;

        dashboardModel.GraficoBarras(idusuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar dados do grafico: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function GraficoDonuts(req, res) {
       var idusuario = req.body.idusuario;

        dashboardModel.GraficoDonuts(idusuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar dados do grafico: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}






function AtualizarGrafico(req, res) {

       var idusuario = req.body.idusuario;
       var tipografico = req.body.tipo_grafico;

       if(tipografico == 'GraficoLinha'){
        
            resultado = GraficoLinha(idusuario)

            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
       }
}



module.exports = {
    KPIS,
    GraficoLinha,
    AtualizarGrafico,
    GraficoDonuts,
    GraficoBarras
}

