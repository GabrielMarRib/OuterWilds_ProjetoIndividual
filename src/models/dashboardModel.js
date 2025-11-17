var database = require("../database/config")


 /* ///////////////////// KPIS ////////////////////////////////// */


function MediaCurtidas(idusuario) {
    // console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    var instrucaoSql = `
         select ROUND(avg(qtd_curtidas), 1) as MediaCurtidas from postagem where FkUsuario_idUsuario = ${idusuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function PostagemMaisCurtida(idusuario) {
    // console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    var instrucaoSql = `
           select * from postagem where FkUsuario_idUsuario = ${idusuario} and qtd_curtidas = (select MAX(qtd_curtidas) from postagem where FkUsuario_idUsuario = ${idusuario} );
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function TotalPostagem(idusuario) {
    // console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    var instrucaoSql = `
             select COUNT(*) as TotalPostagem FROM postagem where FkUsuario_idUsuario = ${idusuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function TotalCurtidas(idusuario) {
    // console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    var instrucaoSql = `
             select SUM(qtd_curtidas) as TotalCurtidas FROM postagem where FkUsuario_idUsuario = ${idusuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

/* ///////////////////// GRAFICOS ////////////////////////////////// */


function GraficoLinha(idusuario) {
    console.log("MODELS_IDUSUARIO: " + idusuario)
    var instrucaoSql = `
       select avg(qtd_curtidas) as mediacurtida, DATE_FORMAT(dt_postagem, '%Y-%m-%d') as data from postagem where FkUsuario_idUsuario = ${idusuario} group by DATE_FORMAT(dt_postagem, '%Y-%m-%d');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function GraficoBarras(idusuario) {
    console.log("MODELS_IDUSUARIO: " + idusuario)
    var instrucaoSql = `
       select titulo as titulo, qtd_curtidas as qtdcurtidas from postagem where FkUsuario_idUsuario = ${idusuario} ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function GraficoDonuts(idusuario) {
    console.log("MODELS_IDUSUARIO: " + idusuario)
    var instrucaoSql = `
       select usuario.nome as nome, COUNT(idPostagem) as qtdpostagens from usuario LEFT JOIN postagem ON idusuario = FkUsuario_idUsuario GROUP BY usuario.nome;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    MediaCurtidas,
    PostagemMaisCurtida,
    TotalPostagem,
    TotalCurtidas,
    GraficoLinha,
    GraficoBarras,
    GraficoDonuts
};