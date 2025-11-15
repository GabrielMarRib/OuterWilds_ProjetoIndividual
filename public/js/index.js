const personagens = [
    {
        nome: 'Riebeck',
        descricao: 'O arqueólogo e tocador de banjo do grupo. Riebeck é um pouco medroso e pode ser encontrado no Vale Incerto (Brittle Hollow), estudando as ruínas Nomai. Apesar do medo de altura e de buracos negros, sua paixão pela história Nomai o mantém firme em suas pesquisas.',
        imagem: './assets/Lancamento/Carrosel/Personagens/Riebeck.png'
    },
    {
        nome: 'O Viajante (Você)',
        descricao: 'O mais novo astronauta da Outer Wilds Ventures. Equipado com um detector de sinal e um tradutor Nomai, sua missão é explorar o sistema solar. Você é o único que se conecta a uma estátua Nomai e fica preso no loop temporal, revivendo os últimos 22 minutos antes que o Sol exploda.',
        imagem: './assets/Lancamento/Carrosel/Personagens/ViajanteEU.png'
    },
    {
        nome: 'Chert',
        descricao: 'Um astrônomo e percussionista (toca bateria) que pode ser encontrado observando as estrelas no Cânion da Lareira (Ember Twin). Chert é muito analítico e é o primeiro a notar que o Sol está morrendo mais rápido do que o esperado, ficando visivelmente mais ansioso a cada loop.',
        imagem: './assets/Lancamento/Carrosel/Personagens/Chert.png'
    },
    {
        nome: 'Gabbro',
        descricao: 'Um filósofo e flautista que está relaxando em uma rede nas Profundezas do Gigante (Giant Deep). Gabbro é a única outra pessoa que percebe estar presa no loop temporal. Ele oferece uma perspectiva calma e zen sobre a situação, sugerindo que o melhor a fazer é meditar sobre o assunto.',
        imagem: './assets/Lancamento/Carrosel/Personagens/Gabbro.png'
    },
    {
        nome: 'Feldspar',
        descricao: 'O aventureiro mais ousado e lendário da Outer Wilds Ventures, que toca gaita. Feldspar desapareceu há algum tempo enquanto explorava o local mais perigoso do sistema: o Bruma Sombria (Dark Bramble). Encontrá-lo é um desafio, mas suas anotações são cruciais para navegar pelo Bruma.',
        imagem: './assets/Lancamento/Carrosel/Personagens/Feldspar.png'
    },
    {
        nome: 'Solanum',
        descricao: 'Uma Nomai que você pode encontrar em um local muito específico e difícil de alcançar: a Lua Quântica. Ela é a única Nomai com quem você pode (de certa forma) interagir. O encontro com ela é um dos momentos mais enigmáticos e reveladores do jogo.',
        imagem: './assets/Lancamento/Carrosel/Personagens/Nomai.png'
    }
]
document.addEventListener("DOMContentLoaded", function () { 
    //sessionStorage.EMAIL_USUARIO = json.email;
    //sessionStorage.NOME_USUARIO = json.nome;
    //sessionStorage.ID_USUARIO = json.idusuario;
    var NomeUsuario = sessionStorage.getItem('NOME_USUARIO');
    var EmailUsuario = sessionStorage.getItem('EMAIL_USUARIO');
    console.log(NomeUsuario + "/" + EmailUsuario)
    if(NomeUsuario && EmailUsuario){
        IdProfileLogado.style.display = 'flex'
        IdProfileDesLogado.style.display = 'none'
        UserName.innerHTML = NomeUsuario
    }else{
        console.log("Teste")
        IdProfileDesLogado.style.display = 'flex'
          IdProfileLogado.style.display = 'none'
    }

});
function FnScrollTela(Botao) {
    var Atlas = document.getElementById('container-main-planeta')
    var Historia = document.getElementById('containerHistoria')
    var Exploradores = document.getElementById('container-main-caracters')
    var ME = document.getElementById('container-main-footer')
    
    if (Botao == 'Home') {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // Isso faz a rolagem ser suave!
        });
    } else if (Botao == 'Atlas') {
        Atlas.scrollIntoView({
            behavior: "smooth",
            block: "start" // Alinha o topo do elemento com o topo da tela
        });
    } else if (Botao == 'Historia') {
        Historia.scrollIntoView({
            behavior: "smooth",
            block: "start" // Alinha o topo do elemento com o topo da tela
        });
    } else if (Botao == 'Exploradores') {
        Exploradores.scrollIntoView({
            behavior: "smooth",
            block: "center" // Alinha o topo do elemento com o topo da tela
        });
    }else if(Botao == 'ME'){
         ME.scrollIntoView({
            behavior: "smooth",
            block: "center" // Alinha o topo do elemento com o topo da tela
        });
    }

}





function FnRolarCarrosel(lado) {
    var CardEsquerda_Img = document.getElementById('Imagem_secundaria_E')
    var CardEsquerda_Titulo = document.getElementById('Titulo_secundario_E')
    var CardEsquerda_Descricao = document.getElementById('Descricao_secundaria_E')

    var CardMeio_Img = document.getElementById('Imagem_principal')
    var CardMeio_Descricao = document.getElementById('Descricao_principal')
    var CardMeio_Titulo = document.getElementById('Titulo_principal')

    var CardDireita_Img = document.getElementById('Imagem_secundaria_D')
    var CardDireita_Titulo = document.getElementById('Titulo_secundario_D')
    var CardDireita_Descricao = document.getElementById('Descricao_secundaria_D')


    let IndexCardMeio = 0
    if (lado == 'direita') {
        console.log(personagens)
        for (var i = 0; i < personagens.length; i++) {
            console.log(CardMeio_Titulo.innerHTML)
            if (CardMeio_Titulo.innerHTML == personagens[i].nome) {
                console.log("A" + CardMeio_Titulo.innerHTML)
                console.log("B" + personagens[i].nome)
                IndexCardMeio = i
                break
            }
        }
        CardEsquerda_Titulo.innerHTML = validarCarrosel(IndexCardMeio, 0, 'nome')
        CardEsquerda_Descricao.innerHTML = validarCarrosel(IndexCardMeio, 0, 'descricao')
        CardEsquerda_Img.src = validarCarrosel(IndexCardMeio, 0, 'imagem')

        CardMeio_Titulo.innerHTML = validarCarrosel(IndexCardMeio, 1, 'nome')
        CardMeio_Descricao.innerHTML = validarCarrosel(IndexCardMeio, 1, 'descricao')
        CardMeio_Img.src = validarCarrosel(IndexCardMeio, 1, 'imagem')

        CardDireita_Titulo.innerHTML = validarCarrosel(IndexCardMeio, 2, 'nome')
        CardDireita_Descricao.innerHTML = validarCarrosel(IndexCardMeio, 2, 'descricao')
        CardDireita_Img.src = validarCarrosel(IndexCardMeio, 2, 'imagem')



        function validarCarrosel(IndexCardMeio, I, B) {
            var Local = String(B)
            console.log("PENIS PENIS: " + I + "/" + (IndexCardMeio + I))
            if (IndexCardMeio + I > 5) {
                if (IndexCardMeio + I == 7) {
                    IndexCardMeio = 1
                    var Personagens = personagens[IndexCardMeio]
                    return Personagens[Local]
                }
                IndexCardMeio = 0
                var Personagens = personagens[IndexCardMeio]
                return Personagens[Local]
            } else {
                IndexCardMeio += I
                var Personagens = personagens[IndexCardMeio]
                return Personagens[Local]
            }
        }

    } else {
        console.log(personagens)
        for (var i = 0; i < personagens.length; i++) {
            console.log(CardMeio_Titulo.innerHTML)
            if (CardMeio_Titulo.innerHTML == personagens[i].nome) {
                console.log("A" + CardMeio_Titulo.innerHTML)
                console.log("B" + personagens[i].nome)
                IndexCardMeio = i
                break
            }
        }
        CardEsquerda_Titulo.innerHTML = validarCarrosel(IndexCardMeio, 2, 'nome')
        CardEsquerda_Descricao.innerHTML = validarCarrosel(IndexCardMeio, 2, 'descricao')
        CardEsquerda_Img.src = validarCarrosel(IndexCardMeio, 2, 'imagem')

        CardMeio_Titulo.innerHTML = validarCarrosel(IndexCardMeio, 1, 'nome')
        CardMeio_Descricao.innerHTML = validarCarrosel(IndexCardMeio, 1, 'descricao')
        CardMeio_Img.src = validarCarrosel(IndexCardMeio, 1, 'imagem')

        CardDireita_Titulo.innerHTML = validarCarrosel(IndexCardMeio, 0, 'nome')
        CardDireita_Descricao.innerHTML = validarCarrosel(IndexCardMeio, 0, 'descricao')
        CardDireita_Img.src = validarCarrosel(IndexCardMeio, 0, 'imagem')



        function validarCarrosel(IndexCardMeio, I, B) {
            var Local = String(B)
            console.log("PENIS PENIS: " + I + "/" + (IndexCardMeio + I))
            if (IndexCardMeio - I < 0) {
                if (IndexCardMeio - I == -2) {
                    IndexCardMeio = 4
                    var Personagens = personagens[IndexCardMeio]
                    return Personagens[Local]
                }
                IndexCardMeio = 5
                var Personagens = personagens[IndexCardMeio]
                return Personagens[Local]
            } else {
                IndexCardMeio -= I
                var Personagens = personagens[IndexCardMeio]
                return Personagens[Local]
            }
        }
    }

}