

function Alerta(Msg, Cor) {
  Opacidade = IDcontaineralerta.style.opacity
  if (Opacidade == 0) {
    IDcontaineralerta.style.opacity = "100";
    mensagem_erro.style.color = Cor
    mensagem_erro.innerHTML = Msg
    setInterval(() => { IDcontaineralerta.style.opacity = "0" }, 3000)
  } else {
    IDcontaineralerta.style.opacity = "0";

  }

}



let UsuariosCadastrados = [];


function FnCadastrar() {

  var UserName = Input_UserName.value;
  var userEmail = Input_UserEmail.value;
  var UserSenha = Input_UserSenha.value;
  var UserConfirmaSenha = Input_UserConfirmarSenha.value;
  var TermosECondicoes = Input_Termos.checked
  // var MensagemErro = MensagemErros.innerHTML

  if (TermosECondicoes == false) {
    Alerta("Termos&Condições não aceitos!", "#b09000");
    return false;
  }
  if (UserSenha != UserConfirmaSenha) {
    Alerta("As senhas estão diferentes", "#b09000");
    return false
  }
  if (UserName == "" || userEmail == "" || UserSenha == "" || UserConfirmaSenha == "") {
    Alerta("Algum dos campos não foi preenchido!", "#b09000");
    return false;
  }
  if (UserName.length < 3) {
    Alerta("Nome muito pequeno", "#b09000");
  }
  
  // SENHA

    MensagemErros.innerHTML = ""

    if(UserSenha.length < 8){
     MensagemErros.innerHTML = "Senha muito pequena! Minino de 8 caracteres"
     return
    }
    var ListaNumeros = '1234567890'
    var ContemNumero = false

    for (let i = 0; i < UserSenha.length; i++) {
        for (let b = 0; b < ListaNumeros.length; b++) {
            if(UserSenha[i] == ListaNumeros[b]){
              ContemNumero = true
              break
            }        
        }
          if(ContemNumero){
            break
          }
    }
    if(!ContemNumero){
      MensagemErros.innerHTML += "Sua senha precisa conter um numero!"
      return
    }

    var ListaSimbolos = '@#$%&*_'
    var ContemSimbolo = false

    for (let i = 0; i < UserSenha.length; i++) {
        for (let b = 0; b < ListaSimbolos.length; b++) {
            if(UserSenha[i] == ListaSimbolos[b]){
              ContemSimbolo = true
              break
            }        
        }
          if(ContemSimbolo){
            break
          }
    }
    if(!ContemSimbolo){
      MensagemErros.innerHTML += "Sua senha precisa conter um simbolo!"
      return
    }
    

    var contemMaiuscula = UserSenha.toLowerCase() !== UserSenha;
    var contemMinuscula = UserSenha.toUpperCase() !== UserSenha;
    
    if(!contemMaiuscula){
      MensagemErros.innerHTML += "Sua senha precisa conter um caractere maiúsculo<br>";
      return;
    }

    if(!contemMinuscula){
      MensagemErros.innerHTML += "Sua senha precisa conter um caractere minúsculo<br>";
      return;
    }




  for (let i = 0; i < UsuariosCadastrados.length; i++) {
    if (UsuariosCadastrados[i].email == userEmail) {
      Alerta("Email já cadastrado!", "red")
      return
    }
  }

  // Enviando o valor da nova input
  fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
   
      nomeServer: UserName,
      emailServer: userEmail,
      senhaServer: UserSenha
    })
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);
      if (resposta.ok) {
        Alerta("Cadastro realizado com sucesso!", "green");

        setTimeout(() => {
          window.location = "./Login.html";
        }, "2000");

      } else {
        Alerta("Houve um erro ao tentar realizar o cadastro!", 'red')
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);

    });

  return false;
}

// Listando usuarios cadastradas 
function listar() {



  fetch("/usuarios/listar", {
    method: "GET",
  }).then(function (resposta) {

    resposta.json().then((usuario) => {

      usuario.forEach((usuario) => {
        UsuariosCadastrados.push(usuario);

        console.log("UsuariosCadastrados")
        console.log(UsuariosCadastrados);
      });
    });

  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  });



}



function FnEsconderSenha(Btn, inputsenha) {
  var imgolho = document.getElementById(Btn)
  var Input = document.getElementById(inputsenha)
if (Input.type === 'password') {
    Input.type = 'text';
    imgolho.style.opacity = '50%';
    imgolho.style.transform = 'scaleX(1)'; 
  } else {
    Input.type = 'password';
    imgolho.style.opacity = '100%';
    imgolho.style.transform = 'scaleX(-1)'; 
  }
}
