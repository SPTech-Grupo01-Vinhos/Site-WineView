function simular_vinho() {
        let producao_litros_mes = Number(input_producao_mensal.value) // 87000
        let custo_litro = Number(input_custo_litro.value) // 15
        let valor_venda_garrafa = Number(input_valor_garrafa.value) // 30

        // Quantidade de garrafas cheias, onde 750 ml = 0,75 litros
        let total_garrafas_mes = producao_litros_mes / 0.75  
        //                               87000      / 0.75

        // Quanto gastou para ter o vinho dentro da garrafa 
        let custo_total_litro_mes = custo_litro * producao_litros_mes 
        //                                15    *  87000

        // Quantidade que ele ganha vendendo todas as garrafas cheias 
        let total_bruto_mes = total_garrafas_mes * valor_venda_garrafa
        //                        (87000/0.75)   *   30
        
        // Quanto ele ganha tirando os custos de produção (total do vinho dentro)
        let lucro_estimado_mes = total_bruto_mes - custo_total_litro_mes
        //                     ((87000/0.75)   *   30) - (15    *  87000)

        //====================================================================================
        
        // Supondo que ao fermentar o vinho, perde 10% 
        let perda_10_porcento = total_bruto_mes * 0.10 
        //               ((87000/0.75)   *   30)  *  0.10
        let perda_10_anual = perda_10_porcento * 12
        //               (((87000/0.75)   *   30)  *  0.10)  * 12  

        // Supondo que usando o monitoramento ele só perde 2%
        let perda_2_porcento = total_bruto_mes * 0.02
        //               ((87000/0.75)   *   30) * 0.02

        let economia_mensal = perda_10_porcento - perda_2_porcento
        //                (((87000/0.75)   *   30)  *  0.10) - (((87000/0.75)   *   30) * 0.02)
        let economia_anual = economia_mensal * 12

        div_mensagem.innerHTML = `
        <div class="card-resultado">
        <h3>Análise de Produção</h3>
        <p>Você produz <span class="destaque">${producao_litros_mes}</span> litros por mês.</p>
        <p>Custo por litro: <b> ${custo_litro.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</b></p>
        <p>Venda da garrafa: <b> ${valor_venda_garrafa.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</b></p>
        <hr>

        <div class="financeiro">
            <p class="custo-total">Custo total mensal da produção: <span> ${custo_total_litro_mes.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span></p>
        </div>

        <div class="lucro-box">
            Lucro bruto estimado: <b> ${lucro_estimado_mes.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</b>
        </div>

        <h3>Solução Wine View</h3>
        <p class="economia">Quanto você perde anualmente sem WV: <span> ${perda_10_anual.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span></p>
        <p class="economia">Economia Anual com solução WV: <span> ${economia_anual.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span></p>
         </div>
`;
    }