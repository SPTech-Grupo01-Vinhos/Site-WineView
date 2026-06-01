var database = require("../database/config")

function cadastrar(dados_endereco) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", dados_endereco);
    
    var instrucaoSql = `
        INSERT INTO endereco (logradouro, numero, cep, cidade, estado) VALUES ('${dados_endereco.ruaLogradouro}', '${dados_endereco.numero}', '${dados_endereco.cep}',  '${dados_endereco.cidade}',  '${dados_endereco.estadoUF}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar
};