

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




  // Verificando se o código de ativação é de alguma empresa cadastrada
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
      // crie um atributo que recebe o valor recuperado aqui
      // Agora vá para o arquivo routes/usuario.js
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
  if (imgolho.style.transform == 'scaleX(-1)') {
    imgolho.style.opacity = '50%'
    imgolho.style.transform = 'scaleX(1)'
    Input.type = 'text'
  } else {
    Input.type = 'password'
    imgolho.style.transform = 'scaleX(-1)'
    imgolho.style.opacity = '100%'
  }
}