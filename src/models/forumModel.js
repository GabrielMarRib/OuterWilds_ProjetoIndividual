var database = require("../database/config")

function pegarpostagens() {
    var instrucaoSql = `
        SELECT * FROM vw_pegarpostagens;
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
function curtir(idpostagem) {
    var instrucaoSql = `
        update postagem set qtd_curtidas = qtd_curtidas + 1 where idpostagem = ${idpostagem};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function obtercomentarios(){
    var instrucaoSql = `
        SELECT idcomentario, fk_idpostagem, dt_comentario ,qtd_curtidas, comentario, u.nome as usuario FROM comentario join usuario as u on fk_idusuario = idUsuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function publicarcomentario(idpostagem, idUsuario, comentario){
    var instrucaoSql = `
    insert into comentario (fk_idusuario, fk_idpostagem, dt_comentario, qtd_curtidas, comentario) VALUES 
                            (${idUsuario}, ${idpostagem}, NOW(), 0, "${comentario}");
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    pegarpostagens,
    postar,
    curtir,
    obtercomentarios,
    publicarcomentario
};