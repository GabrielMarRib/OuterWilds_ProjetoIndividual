const { text } = require("express");

function Alerta(Msg, Cor){
    if(Msg == ''){
        return
    }
    Opacidade = IDcontaineralerta.style.opacity
    if(Opacidade == 0){
        IDcontaineralerta.style.opacity = "100";
        mensagem_erro2.style.color = Cor
        mensagem_erro2.innerHTML = Msg
        setInterval(() => {IDcontaineralerta.style.opacity = "0"}, 3000)
    }else{
        IDcontaineralerta.style.opacity = "0";

    }

}


    function entrar() {
       

        var emailVar = input_email.value;
        var senhaVar = input_senha.value;
        var Checkbox = Input_checkbox.checked

        if (emailVar == "" || senhaVar == "") {
             Alerta("Algum dos campos não está preenchido!", "red");    
            return false;
        }
    
        

        console.log("FORM LOGIN: ", emailVar);
        console.log("FORM SENHA: ", senhaVar);

        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: emailVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {
           

            if (resposta.ok) {
                
                
                if(Checkbox == true){
                    
                    resposta.json().then(json => {
                        console.log(json);
                        console.log(JSON.stringify(json));
                        sessionStorage.EMAIL_USUARIO = json.email;
                        sessionStorage.NOME_USUARIO = json.nome;
                        sessionStorage.ID_USUARIO = json.idusuario;
                        
                        
                        
                    });
                    
                }
                console.log("Teste1");
                
                setTimeout(function () {
                    window.location = "./index.html";
                }, 1000); // apenas para exibir o loading
                

            } else {

                // Alerta("Houve um erro ao tentar realizar o login!", 'red');

                resposta.text().then(texto => {
                    console.error(texto);
                    Alerta(texto, 'red')
                    
                });
            }

        }).catch(function (erro) {
            console.log(erro);
            
        })

        return false;
    }




    function FnEsconderSenha(Btn, inputsenha){
        var imgolho = document.getElementById(Btn)
        var Input = document.getElementById(inputsenha)
        if( imgolho.style.transform == 'scaleX(-1)'){
            imgolho.style.opacity = '50%'
            imgolho.style.transform = 'scaleX(1)'
            Input.type = 'text'
        }else{
             Input.type = 'password'
             imgolho.style.transform = 'scaleX(-1)'
             imgolho.style.opacity = '100%'
        }
    }