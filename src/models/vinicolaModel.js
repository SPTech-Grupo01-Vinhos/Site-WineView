var database = require("../database/config");

function cadastrar(dados_vinicola,idUsuario) {
  console.log("ACESSEI O VINICOLA MODEL \n\n function cadastrar():");

  var nomeVinicola = dados_vinicola.nomeVinicola;
  var telefone = dados_vinicola.telefone;
  var cnpj = dados_vinicola.cnpj;
  var qtdTanquesSuportados = dados_vinicola.qtdTanques;

  var instrucaoSql = `
      INSERT INTO vinicola (nomeVinicola, telefone, cnpj, qtdTanquesSuportados, fkUsuario, fkEndereco) 
      VALUES ('${nomeVinicola}', '${telefone}', '${cnpj}', ${qtdTanquesSuportados}, ${idUsuario}, ${idEndereco});
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarVinicola(idUsuario) {
  console.log("ACESSEI O VINICOLA MODEL \n\n function buscarVinicola():");
  
  var instrucaoSql = `SELECT * FROM vinicola WHERE fkUsuario = ${idUsuario};`;
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
  editarVinicola
};
