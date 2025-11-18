
function Alerta(Msg, Cor) {
    if (Msg == '') {
        return
    }
    Opacidade = IDcontaineralerta.style.opacity
    if (Opacidade == 0) {
        IDcontaineralerta.style.opacity = "100";
        mensagem_erro2.style.color = Cor
        mensagem_erro2.innerHTML = Msg
        setInterval(() => { IDcontaineralerta.style.opacity = "0" }, 3000)
    } else {
        IDcontaineralerta.style.opacity = "0";

    }

}
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

    //Limpar postagens 
     var Postagens = document.getElementById('IDcontainer-postagens');
    Postagens.innerHTML = ""
    DadosPostagens = []



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
        console.log(i + "/" + DadosPostagens.length)
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
        
        // Likes
        var plikes = document.createElement('p')
        plikes.textContent = DadosPostagens[i].qtd_curtidas
        plikes.setAttribute('id', `LikeId${i}`)
        containerLikeComentarios.appendChild(plikes)

        // Botão Like
        var divLike = document.createElement('div');
        divLike.classList.add('container-like-comentarios', 'like');
        var imgLike = document.createElement('img');
        imgLike.src = './assets/Forum/Like-blank.png';
        imgLike.alt = 'Like';
        imgLike.setAttribute('id', `ImgLike${i}`)
        imgLike.setAttribute('onclick', `Curtir('LikeId${i}', 'ImgLike${i}')`)
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


function FnPostar(){
    console.log("Entrou na função")
    var Idusuario = sessionStorage.getItem('ID_USUARIO');
    var Ipt_TituloPostagem = document.getElementById("Ipt_titulo");
    var Ipt_ImagemPostagem = document.getElementById("Ipt_imagem");
    var Ipt_DescricaoPostagem = document.getElementById("Ipt_Descricao");

    if(Ipt_TituloPostagem.value == "" || Ipt_ImagemPostagem.value == "" || Ipt_DescricaoPostagem.value == ""){
        Alerta("Algum dos campos não foi preenchido!", '#bdd600')
        return
    }
    
    fetch("/forum/postar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idusuario: Idusuario,
            imagem: Ipt_ImagemPostagem.value,
            titulo: Ipt_TituloPostagem.value,
            descricao: Ipt_DescricaoPostagem.value
        })
    })

        .then(function (ResultadoKPIS) {

            console.log("RESULTADO DA POSTAGEM: " + JSON.stringify(ResultadoKPIS));
            
            Ipt_ImagemPostagem.value = ""
            Ipt_TituloPostagem.value = ""
            Ipt_DescricaoPostagem.value = ""
            Alerta("Postado com sucesso", 'green')
            setTimeout(() => {  window.location.reload()}, 3000)
        
        })
        .catch(function (erro) {

            console.log("Erro na requisição: " + erro);
             Alerta("Erro na postagem", 'red')
                
        });


    }


function Curtir(IdElementoLike, idElementoImagem){
    console.log("Caiu na função" + IdElementoLike)
    Input_QtdCurtidas = document.getElementById(IdElementoLike)
    Input_ImgCurtida = document.getElementById(idElementoImagem)
    QtdCurtidas = Number(Input_QtdCurtidas.innerHTML)

    if((Input_ImgCurtida.src).endsWith('Like-blank.png')) {
        console.log("CAIu no if")
        Input_ImgCurtida.src = './assets/Forum/liked.png'
        Input_QtdCurtidas.innerHTML = (QtdCurtidas + 1)
    }else{
        Input_ImgCurtida.src = './assets/Forum/Like-blank.png'
        Input_QtdCurtidas.innerHTML = (QtdCurtidas - 1)
    }

}