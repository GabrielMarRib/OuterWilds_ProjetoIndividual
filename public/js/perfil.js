
document.addEventListener("DOMContentLoaded", function () {
    //sessionStorage.EMAIL_USUARIO = json.email;
    //sessionStorage.NOME_USUARIO = json.nome;
    //sessionStorage.ID_USUARIO = json.idusuario;
    var NomeUsuario = sessionStorage.getItem('NOME_USUARIO');
    var EmailUsuario = sessionStorage.getItem('EMAIL_USUARIO');
    console.log(NomeUsuario + "/" + EmailUsuario)

    if (NomeUsuario && EmailUsuario || NomeUsuario != null || EmailUsuario != null) {
        UserName.innerHTML = NomeUsuario
    } else {
        window.location.assign('./Login.html')
    }



    // ATUALIZAÇÂO das KPIS
    console.log("Atualizando as KPIS..")
    AtualizarKPI()
    setInterval(AtualizarKPI, 2000)


    // RODAR GRAFICOS
    ObterDadosGrafico('graficolinha')
    ObterDadosGrafico('graficobarra')
    ObterDadosGrafico('graficodonuts')

});

function AtualizarKPI() {
    
    var Input_KPIMediaCurt = document.getElementById("KPIMediaCurtidas");
    var Input_KPIPostagemMaisCurtida = document.getElementById("KPIPostagemMaisCurtida");
    var Input_KPITituloPostagemMaisCurtida = document.getElementById("KPITituloPostagemMaisCurtida");
    var Input_KPITotalPostagem = document.getElementById("KPITotalPostagem");
    var Input_KPITotalCurtidas = document.getElementById("KPITotalCurtidas");

    var Idusuario = sessionStorage.getItem('ID_USUARIO');

    fetch("/dashboard/KPIS", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idusuario: Idusuario,
        })
    })
        .then(function (resposta) {

            if (resposta.ok) {
                return resposta.json();
            } else {
                resposta.text().then(texto => {
                    console.error("Erro na resposta do servidor: " + texto);
                });
                throw new Error('Erro na resposta da API');
            }
        })
        .then(function (ResultadoKPIS) {

            console.log("RESULTADO KPIS: " + JSON.stringify(ResultadoKPIS));
          
            Input_KPIMediaCurt.innerHTML = ResultadoKPIS.MediaCurtidas != 0 ? ResultadoKPIS.MediaCurtidas : 'Nenhuma postagem feita!';
            Input_KPITituloPostagemMaisCurtida.innerHTML = ResultadoKPIS.PostagemMaisCurtida.titulo != undefined ? ResultadoKPIS.PostagemMaisCurtida.titulo : 'Nenhuma postagem feita!' ;
            Input_KPIPostagemMaisCurtida.innerHTML = ResultadoKPIS.PostagemMaisCurtida.qtd_curtidas !=  undefined ? ResultadoKPIS.PostagemMaisCurtida.qtd_curtidas : 0;
            Input_KPITotalPostagem.innerHTML = ResultadoKPIS.TotalPostagem !=  0 ? ResultadoKPIS.TotalPostagem : 'Nenhuma postagem feita!';
            Input_KPITotalCurtidas.innerHTML = ResultadoKPIS.TotalCurtidas != 0 ? ResultadoKPIS.TotalCurtidas : 'Nenhuma postagem feita!';

        })
        .catch(function (erro) {

            console.log("Erro na requisição: " + erro);
        });
}

var DadosGraficoLinha = {}
var DadosGraficoBarra = {}
var DadosGraficoDonuts = {}
var GraficoLinha;
var GraficoBarra;
var GraficoDonuts;
var Grafico;


function ObterDadosGrafico(tipografico) {
    var Idusuario = sessionStorage.getItem('ID_USUARIO');
    console.log("IDUSUARIO: " + Idusuario)



    fetch(`/dashboard/${tipografico}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idusuario: Idusuario
        })
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


        console.log(`QUERY GRAFICO ${tipografico}:` + JSON.stringify(resposta))

        if (tipografico == 'graficolinha') {
            DadosGraficoLinha = resposta
        } else if (tipografico == 'graficobarra') {
            DadosGraficoBarra = resposta
        } else if (tipografico == 'graficodonuts') {
            DadosGraficoDonuts = resposta
        } else {
            console.log('TIPO DO GRAFICO NÂO INDENTIFICADO')
        }
        PlotarGrafico(tipografico);

    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta} GRAFICO: ${tipografico}`);
        PlotarGrafico(tipografico);
    });




}

function PlotarGrafico(tipografico) {
    console.log('iniciando plotagem do gráfico...');
    console.log(`GRAFICO (${tipografico})`);
    if (tipografico == 'graficolinha') {


        var datas = []
        var Mediacurtidas = []
        
      
        for (var i = 0; i < DadosGraficoLinha.length; i++) {
            datas.push(DadosGraficoLinha[i].data)
        }
        for (var i = 0; i < DadosGraficoLinha.length; i++) {
            Mediacurtidas.push(DadosGraficoLinha[i].mediacurtida)
        }
        
        const ctx = document.getElementById('MainGraficoLinha');
        Chart.defaults.color = 'black'; 
        
        GraficoLinha = new Chart(ctx, {
            type: 'line',
            data: {
                labels: datas,
                datasets: [{
                    label: 'Média de curtidas nessa data',
                    data: Mediacurtidas,
                    borderWidth: 2,
                    backgroundColor: '#FF7D25',
                    borderColor: 'black',
                    pointBackgroundColor: '#FF7D25'
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true },
                    x: { ticks: { color: 'black' } }
                },
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Media de curtidas por data',
                        color: 'black',
                        font: { size: 20 } 
                    }
                }
            }
        });
        
     
        setTimeout(() => AtualizarGrafico(tipografico, GraficoLinha), 2000);

    } else if (tipografico == 'graficobarra') {
   
        var postagem = []
        var curtidas = []
        for (var i = 0; i < DadosGraficoBarra.length; i++) {
            postagem.push(DadosGraficoBarra[i].titulo)
        }
        for (var i = 0; i < DadosGraficoBarra.length; i++) {
            curtidas.push(DadosGraficoBarra[i].qtdcurtidas)
        }

        const ctx = document.getElementById('IDGraficoBarra');
        Chart.defaults.color = 'black'; 
        
        GraficoBarra = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: postagem,
                datasets: [{
                    label: 'Quantidade curtidas cada postagem',
                    data: curtidas,
                    borderWidth: 2,
                    backgroundColor: '#FF7D25',
                    borderColor: 'black'
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true },
                    x: { ticks: { color: 'black' } }
                },
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Quantidade de curtidas por postagem',
                        color: 'black',
                        font: { size: 20 } 
                    }
                }
            }
        });
        
      
        setTimeout(() => AtualizarGrafico(tipografico, GraficoBarra), 2000);

    } else if (tipografico == 'graficodonuts'){
        var nome = []
        var qtdpostagens = []
        for (var i = 0; i < DadosGraficoDonuts.length; i++) {
            nome.push(DadosGraficoDonuts[i].nome)
        }
        for (var i = 0; i < DadosGraficoDonuts.length; i++) {
            qtdpostagens.push(DadosGraficoDonuts[i].qtdpostagens)
        }

        const ctx = document.getElementById('IDGraficoDonuts');
        Chart.defaults.color = 'white'; 

     
        if (GraficoDonuts) {
            GraficoDonuts.destroy();
        }
        
        GraficoDonuts = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: nome,
                datasets: [{
                    label: 'Quantidade de postagem',
                    data: qtdpostagens,
                    
                 
                    backgroundColor: [
                        '#FF7D25',
                        '#FFA07A',
                        '#FFC0CB',
                        '#B0C4DE',
                        '#FFE4B5'
                    ],
                    borderColor: 'black',
                    borderWidth: 2
                }]
            },
            options: {
                
           
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Usuarios com mais postagens',
                        color: 'white',
                        font: { size: 20 } 
                    }
                }
            }
        });
        
    
        setTimeout(() => AtualizarGrafico(tipografico, GraficoDonuts), 2000);
}
}


function AtualizarGrafico(Tipo, grafico) {
    var Idusuario = sessionStorage.getItem('ID_USUARIO');

    fetch(`/dashboard/${Tipo}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idusuario: Idusuario })
    })
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                var novaslabels = [];
                var novosDados = [];
                var VarivelControle; 

                console.log("NOVO REGISTRO:" + JSON.stringify(novoRegistro));
                
                if (Tipo == 'graficolinha') {
                    for (let i = 0; i < novoRegistro.length; i++) {
                        novaslabels.push(novoRegistro[i].data);
                        novosDados.push(novoRegistro[i].mediacurtida);
                    }
                    VarivelControle = DadosGraficoLinha; 
                
                } else if (Tipo == 'graficobarra') {
                    for (var i = 0; i < novoRegistro.length; i++) {
                        novaslabels.push(novoRegistro[i].titulo);
                        novosDados.push(novoRegistro[i].qtdcurtidas);
                    }
                    VarivelControle = DadosGraficoBarra; 
                } else if(Tipo == 'graficodonuts'){
                     for (var i = 0; i < novoRegistro.length; i++) {
                        novaslabels.push(novoRegistro[i].nome);
                        novosDados.push(novoRegistro[i].qtdpostagens);
                    }
                    VarivelControle = DadosGraficoDonuts;
                }else{
                    console.log("TIPO DE GRÁFICO NÃO RECONHECIDO NA ATUALIZAÇÃO: " + Tipo);
                    return; 

                }
                
                console.log("VARIVEL DE CONTROLE (DADOS ANTIGOS):" + JSON.stringify(VarivelControle));

                if (JSON.stringify(novoRegistro) === JSON.stringify(VarivelControle)) {
                    console.log("---------------------------------------------------------------");
                    console.log("Como não há dados novos para captura, o gráfico não atualizará." + Tipo);
                    console.log("---------------------------------------------------------------");
                } else {
                    console.log("---------------------------------------------------------------");
                    console.log(`Atualizando o gráfico de ${Tipo} com novos dados...`);
                    console.log("---------------------------------------------------------------");
                    grafico.data.labels = novaslabels;
                    grafico.data.datasets[0].data = novosDados;
                    grafico.update();


           
                    if (Tipo == 'graficolinha') {
                        DadosGraficoLinha = novoRegistro;
                    } else if (Tipo == 'graficobarra') {
                        DadosGraficoBarra = novoRegistro;
                    }
                }

                // Agendar a proxima atualização
                var proximaAtualizacao = setTimeout(() => AtualizarGrafico(Tipo, grafico), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            var proximaAtualizacao = setTimeout(() => AtualizarGrafico(Tipo, grafico), 2000);
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}





var btnLogout = document.getElementById('btnLogout');
if (btnLogout) {
    btnLogout.addEventListener('click', FnDeslogar);
}

function FnDeslogar(){
    console.log("Deslogando...")
    sessionStorage.EMAIL_USUARIO = "";
    sessionStorage.NOME_USUARIO = "";
    sessionStorage.ID_USUARIO = "";
    window.location.assign("./")
}
