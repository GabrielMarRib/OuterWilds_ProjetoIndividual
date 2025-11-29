// const { createElement } = require("react");

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
    // ObterPostagens()

    // OBTER COMENTARIOS
    ObterComentario()


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
    ElementoPai.innerHTML = "";

    for (var i = DadosPostagens.length -1; i >= 0; i--) {
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
        
        // NOME
        var nome = document.createElement('p')
        nome.textContent = DadosPostagens[i].nome
        nome.style.marginRight = '10px'
        containerLikeComentarios.appendChild(nome)

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
        imgLike.setAttribute('onclick', `Curtir('LikeId${i}',  ${DadosPostagens[i].idpostagem}, 'ImgLike${i}')`)
            
        divLike.appendChild(imgLike);

        // Botão Comentários
        var divComentarios = document.createElement('div');
        divComentarios.classList.add('container-like-comentarios', 'comentarios');
        var imgComentarios = document.createElement('img');
        imgComentarios.src = './assets/Forum/bater-papo.png';
        imgComentarios.alt = 'Comentários';
        divComentarios.setAttribute('onclick', `FnBarraComentario('IDcontainercomentario${i}')`)
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
        
        
        // COMENTARIO
        var containermaincomentarios = document.createElement('div')
        containermaincomentarios.classList.add('container-main-comentarios')
         containermaincomentarios.setAttribute('id', `IDcontainercomentario${i}`)

            var containercomentarios = document.createElement('div');
            containercomentarios.classList.add('container-comentarios');
        

            var comentariosDoPost = [];

            for (let j = 0; j < Dadoscomentarios.length; j++) {
                const filter = Dadoscomentarios[j];

                if (filter.fk_idpostagem == DadosPostagens[i].idpostagem) {
                    comentariosDoPost.push(filter);
                }
            }


            console.log("Comentarios da postagem: " + JSON.stringify(comentariosDoPost))
            if(comentariosDoPost == 0 || comentariosDoPost == ""){
                    var divcomentario = document.createElement('div')
                        var h5 = document.createElement('h5')
                        h5.innerHTML = 'NÂO TEM COMENTARIOS'
                        /**/divcomentario.appendChild(h5);
                    /**/containercomentarios.appendChild(divcomentario);
            }else{

                for (var b = 0; b < comentariosDoPost.length; b++) {
                    var divcomentario = document.createElement('div')
                    divcomentario.classList.add('div-comentario')
                    divcomentario.setAttribute('id', `cometario-${b}-postagem-${comentariosDoPost[b].idPostagem}`)
                    var h5 = document.createElement('h5')
                    var p = document.createElement('p')
                    h5.innerHTML = comentariosDoPost[b].usuario
                    p.innerHTML = comentariosDoPost[b].comentario
                    /**/divcomentario.appendChild(h5);
                    /**/divcomentario.appendChild(p);
                    
                    //Dadoscomentarios
                    /**/containercomentarios.appendChild(divcomentario);
                    
                }
            }

            var containercomentar = document.createElement('div');
            containercomentar.classList.add('container-comentar');
                var inputcomentario = document.createElement('input')
                inputcomentario.type = 'text'
                inputcomentario.placeholder = 'Que poste bacana!'
                inputcomentario.setAttribute('id', `input-comentario-${DadosPostagens[i].idpostagem}`)
                inputcomentario.maxLength = '30'
                var botaopostar = document.createElement('button')
                botaopostar.innerText = "POSTAR";
                botaopostar.setAttribute('onclick', `FnPostarComentario(${DadosPostagens[i].idpostagem})`);
                /**/containercomentar.appendChild(inputcomentario);
                /**/containercomentar.appendChild(botaopostar);



            /**/containermaincomentarios.appendChild(containercomentarios);
            /**/containermaincomentarios.appendChild(containercomentar);
            




        // Montagem Final
        NovaPostagem.appendChild(containerImagem); 
        NovaPostagem.appendChild(barraLikeTitulo);
        NovaPostagem.appendChild(containerDescricao);
        NovaPostagem.appendChild(containermaincomentarios); 
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

// IMAGEM DO INPUT
function Curtir(IdElementoLike, idpostagem, idElementoImagem){
    FnCurtirBanco(IdElementoLike, idpostagem)


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
// NO BANCO DE DADOS
function FnCurtirBanco(Idlike, Idpostagem){
    var IDlike = document.getElementById(Idlike)
    

     fetch("/forum/curtir", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idpostagem: Idpostagem
        })
    })

        .then(function (Resultado) {

            console.log("RESULTADO DA curtida: " + JSON.stringify(Resultado));
            
        })
        .catch(function (erro) {

            console.log("Erro na requisição: " + erro);
             Alerta("Erro em curtir", 'red')
                
        });

}
var Dadoscomentarios = []
function ObterComentario(){

    console.log("TESTE")
    fetch('/forum/obtercomentarios').then(function (resultado) {
        console.log(resultado)
        resultado.json().then(function (resultado) {

            Dadoscomentarios = resultado; 
            console.log("Comentários carregados:", Dadoscomentarios);
           

            ObterPostagens()

        }).catch(function (erro){
            console.error(erro)
    });


    }).catch(function (erro) {
        console.error(erro)
    });

}
function FnPostarComentario(idPostagem) {
    
    var idUsuario = sessionStorage.getItem('ID_USUARIO');
    
    var input = document.getElementById(`input-comentario-${idPostagem}`);
    var textoComentario = input.value;

    if (textoComentario == "") {
        Alerta("Escreva algo para comentar!", 'grey');
        return;
    }

    fetch("/forum/publicarcomentario", { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idPostagem: idPostagem,
            idUsuario: idUsuario,
            comentario: textoComentario
        })
    })
    .then(resposta => {
        if (resposta.ok) {
            console.log("Comentário realizado!");
            input.value = ""; 
            
            ObterComentario(); 
        } else {
            Alerta("Erro ao comentar!", 'red');
        }
    })
    .catch(erro => {
        console.error("Erro na requisição:", erro);
    });
}
function FnBarraComentario(IDCONTAINERCOMENTARIO){
    IDcontainer = document.getElementById(IDCONTAINERCOMENTARIO)

    IDcontainer.classList.toggle('aberto');
}