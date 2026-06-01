let tentativas = 3;

    function logar() {

        let email_digitado = ipt_login_email.value
        let senha_digitada = ipt_login_senha.value
        let email = 'vinho@email.com'
        let senha = 'vinho123'



        if (email_digitado != email || senha_digitada != senha) {
            alert('Senha e/ou E-mail errado!')
            tentativas--;
            div_mensagem.innerHTML = `Você tem mais ${tentativas}`

            if (tentativas == 1) {
                alert('Essa é última tentativa')
            }

            else if (tentativas == 0) {
                alert('Acesso negado!')
                div_mensagem.innerHTML = `<span style="color: red">Você estourou seu limite de tentativas! tente mais tarde.</span>`
                tentativas = 3
            }

        } else { 
            window.location.href = "../dashboard/painel.html"
            alert('Seja bem-vindo(a) Nome do Cliente') 
        }

    }