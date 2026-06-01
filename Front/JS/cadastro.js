function proximo() {
        let senha = ipt_senha.value
        let email = ipt_email.value
        let posicaoArroba = email.indexOf('@')
        let posicaoCom = email.indexOf('.com')
        let senhaValida = false
        let emailValido = false

        // verificação da senha 
        if (senha.length >= 8 && senha != '' && senha != senha.toUpperCase() && senha != senha.toLowerCase() &&
        senha.includes('!') || senha.includes('@') || senha.includes('#') || senha.includes('$') || senha.includes('%') || senha.includes('&') || senha.includes('_'))
         {senhaValida = true}

        //verificação e-mail
        if(email != '' && email.includes('@') && email.includes('.com') && posicaoArroba < posicaoCom && email.endsWith('.com'))
        {
            emailValido = true
        }
        
    
    if (senhaValida == true && emailValido == true) {
        alert('Senha e E-mail válidos!')
        window.location.href = "cadastro-continuacao.html"
    } else {
        alert('Senha e/ou E-mail inválidos! Tente novamente')
    }
  
    }

    function cadastrar() {
        let nomeVinicola = ipt_nomeVinicola.value
        let qtdTanques = Number(ipt_tanques.value)
        let ruaLogradouro = ipt_rua.value
        let cidade = ipt_cidade.value
        let estadoUF = ipt_uf.value
        let numero = Number(ipt_num.value)
        let CEP = ipt_cep.value

        let mensagem = "";

        if(nomeVinicola != '' && qtdTanques != '' && qtdTanques >= 0 && ruaLogradouro != '' && cidade != '' &&
            estadoUF != '' && numero != '' && numero > 0 && CEP != '')
        {
            window.location.href = "../login/login.html"
            mensagem += 'Cadastro realizado com sucesso!'}
         else {
            alert('Preencha todos os campos corretamente!')
        }

        exibir.innerHTML = mensagem;
    }