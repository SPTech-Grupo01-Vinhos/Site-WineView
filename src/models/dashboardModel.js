var database = require("../database/config")

function buscarDadosSensor(idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", idUsuario)
    var instrucaoSql = `
        SELECT r.*, t.codigoTanque, s.statusSensor
        FROM registro r 
        JOIN sensor s ON s.idSensor = r.fkSensor 
        JOIN tanque t ON t.idTanque = s.fkTanque
        JOIN vinicola v ON v.idVinicola = t.fkVinicola
        JOIN usuario u ON u.idUsuario = v.fkUsuario
        WHERE u.idUsuario = ${idUsuario}
        AND r.dtHora = (
            SELECT MAX(sub_r.dtHora) 
            FROM registro sub_r 
            WHERE sub_r.fkSensor = s.idSensor
        );
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
};

function buscarDadosTanque(idUsuario, idTanque) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", idUsuario, idTanque)
    var instrucaoSql = `SELECT * FROM vw_resumo_tanques_atual WHERE idUsuario = ${idUsuario} AND idTanque = ${idTanque};` //  A VIEW ESTÁ AQUI

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    buscarDadosSensor,
    buscarDadosTanque
};