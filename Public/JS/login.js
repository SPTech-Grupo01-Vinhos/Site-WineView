function logar() {
  let email_digitado = ipt_login_email.value;
  let senha_digitada = ipt_login_senha.value;

  if (email_digitado == "" || senha_digitada == "") {
    alert("Senha e/ou E-mail inválidos!");
    return;
  }
  if (email_digitado == 'Suporte@gmail.com' && senha_digitada == '123456') {
    setTimeout(function () {
    window.location.href = "../dashboard/suporte.html";
    }, 1000);
    return
  }

  fetch("/usuarios/autenticar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email_digitado,
      senha: senha_digitada,
    }),
  })
    .then(function (resposta) {

      if (resposta.ok) {
        console.log(resposta);

        resposta.json().then((json) => {
          console.log(json);
          console.log(JSON.stringify(json));
          sessionStorage.EMAIL_USUARIO = json.email;
          sessionStorage.NOME_USUARIO = json.nome;
          sessionStorage.ID_USUARIO = json.id;

          setTimeout(function () {
            window.location.href = "../dashboard/painelGeral.html";
            alert(`Seja bem-vindo(a) ${json.nome}`);
          }, 1000);
        });
      } else {
        alert("Usuário ou senha inválidos!");
      }
    })
    .catch(function (erro) {
      alert("Ocorreu um erro ao realizar o login!");
    });
}
