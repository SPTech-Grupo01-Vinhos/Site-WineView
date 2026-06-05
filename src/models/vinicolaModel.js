var database = require("../database/config");

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(dados_vinicola, idUsuario, idEndereco) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
  );

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucaoSql = `
        INSERT INTO vinicola (nomeVinicola, telefone, cnpj, qtdTanquesSuportados, fkUsuario) VALUES ('${nomeVinicola}', '${telefone}', '${cnpj}', '${qtdTanquesSuportados}', '${idUsuario}');
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarVinicola(idUsuario) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarVinicola():",
  );

  var instrucaoSql = `
        SELECT * FROM vinicola WHERE fkUsuario = ${idUsuario};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function editarVinicola(dados_vinicola, idUsuario) {

  var nomeVinicola = dados_vinicola.nomeVinicola;
  var telefone = dados_vinicola.telefone;
  var cnpj = dados_vinicola.cnpj;
  var qtdTanquesSuportados = dados_vinicola.qtdTanquesSuportados;

  var instrucaoSql = `
        UPDATE vinicola 
        SET nomeVinicola = '${nomeVinicola}', 
            telefone = '${telefone}', 
            cnpj = '${cnpj}', 
            qtdTanquesSuportados = ${qtdTanquesSuportados} 
        WHERE fkUsuario = ${idUsuario};
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  cadastrar,
  buscarVinicola,
  editarVinicola,
};
