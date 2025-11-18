
document.addEventListener("DOMContentLoaded", function () {
    //sessionStorage.EMAIL_USUARIO = json.email;
    //sessionStorage.NOME_USUARIO = json.nome;
    //sessionStorage.ID_USUARIO = json.idusuario;
    var NomeUsuario = sessionStorage.getItem('NOME_USUARIO');
    var EmailUsuario = sessionStorage.getItem('EMAIL_USUARIO');
    console.log(NomeUsuario + "/" + EmailUsuario)
    if (NomeUsuario && EmailUsuario) {
        UserName.innerHTML = NomeUsuario
    } else {
        console.log("Teste")
        window.location.assign('./Login.html')
    }


    // OBTER POSTAGENS
    ObterPostagens()


});

var DadosPostagens = []
function ObterPostagens() {


    fetch("/forum/pegarpostagens", {
        method: "GET",

    }).then(function (resposta) {


        if (resposta.ok) {
            return resposta.json();
        } else {
            resposta.text().then(texto => {
                console.error("Erro na resposta do servidor: " + texto);
            });
            throw new Error('Erro na resposta da API');
        }

    }).then(function (resposta) {

        DadosPostagens = resposta
        console.log(DadosPostagens)

        PlotarPostagens()


    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}
function PlotarPostagens(){
    var ElementoPai = document.getElementById('IDcontainer-postagens');

    for (var i = 0; i < DadosPostagens.length; i++) {
        
        var NovaPostagem = document.createElement('div')
        NovaPostagem.setAttribute('id', `Postagem-${i}`)
        NovaPostagem.classList.add('container-postagem');

        // IMG
        var containerImagem = document.createElement('div');
        containerImagem.classList.add('container-imagem-postagem');
        var imgPostagem = document.createElement('img');
        imgPostagem.src = DadosPostagens[i].Imgpostagem;
        containerImagem.appendChild(imgPostagem);

        // BARRA TITULO
        var barraLikeTitulo = document.createElement('div');
        barraLikeTitulo.classList.add('barra-like-titulo');

        // Título
        var containerTitulo = document.createElement('div');
        containerTitulo.classList.add('container-titulo-postagem');
        var titulo = document.createElement('h1');
        titulo.textContent = DadosPostagens[i].titulo; 
        containerTitulo.appendChild(titulo);


        // Likes e Comentários
        var containerLikeComentarios = document.createElement('div');
        containerLikeComentarios.classList.add('container-like-comentarios');

        // Botão Like
        var divLike = document.createElement('div');
        divLike.classList.add('container-like-comentarios', 'like');
        var imgLike = document.createElement('img');
        imgLike.src = './assets/Forum/Like-blank.png';
        imgLike.alt = 'Like';
        divLike.appendChild(imgLike);

        // Botão Comentários
        var divComentarios = document.createElement('div');
        divComentarios.classList.add('container-like-comentarios', 'comentarios');
        var imgComentarios = document.createElement('img');
        imgComentarios.src = './assets/Forum/bater-papo.png';
        imgComentarios.alt = 'Comentários';
        divComentarios.appendChild(imgComentarios);

        // LIKE&COMENTARIO
        containerLikeComentarios.appendChild(divLike);
        containerLikeComentarios.appendChild(divComentarios);

        // Tiulo e a DIVLIKECOMENTARIO
        barraLikeTitulo.appendChild(containerTitulo);
        barraLikeTitulo.appendChild(containerLikeComentarios);

        // Descrição
        var containerDescricao = document.createElement('div');
        containerDescricao.classList.add('container-descricao');
        
        var descricao = document.createElement('p');
        
        descricao.textContent = DadosPostagens[i].descricao 
        
        containerDescricao.appendChild(descricao);

        // Montagem Final
        NovaPostagem.appendChild(containerImagem); 
        NovaPostagem.appendChild(barraLikeTitulo);
        NovaPostagem.appendChild(containerDescricao);
        ElementoPai.appendChild(NovaPostagem);
    }
}