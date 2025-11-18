var database = require("../database/config")

function pegarpostagens() {
    var instrucaoSql = `
        SELECT * FROM postagem;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function postar(idusuario, imagem, titulo, descricao) {
    var instrucaoSql = `
       INSERT INTO postagem (FkUsuario_idUsuario, titulo, dt_postagem, Imgpostagem, qtd_curtidas, descricao) 
        VALUES (${idusuario}, "${titulo}", NOW(), "${imagem}", 0, "${descricao}");
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}





module.exports = {
    pegarpostagens,
    postar
};