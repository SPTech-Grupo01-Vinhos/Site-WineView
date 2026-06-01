let labelsBarra = ['T1', 'T2', 'T3', 'T4'];

let dadosBarra = [22, 32, 21, 27];

let cores = [];

for (let i = 0; i < dadosBarra.length; i++) {

    let v = dadosBarra[i];

    if (v < 20) {

        cores.push('#E6982B');

    } else if (v > 30) {

        cores.push('#C52A2A');

    } else {

        cores.push('#6BBF61');
    }
}

new Chart(document.getElementById('graficoBarra'), {

    type: 'bar',

    data: {

        labels: labelsBarra,

        datasets: [{

            label: 'Temperatura',

            data: dadosBarra,

            backgroundColor: cores,

            borderRadius: 8
        }]
    },

    plugins: [ChartDataLabels],

    options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {
                display: false
            },

            datalabels: {

                color: '#42090e',

                anchor: 'end',

                align: 'top',

                font: {
                    weight: 'bold',
                    size: 14
                }
            }
        },

        scales: {

            y: {

                beginAtZero: true,

                max: 50
            }
        }
    }
});



// DATA AUTOMÁTICA

let data = new Date();

let dia = data.getDate();

let mes = data.getMonth() + 1;

let ano = data.getFullYear();

if (dia < 10) {
    dia = '0' + dia;
}

if (mes < 10) {
    mes = '0' + mes;
}

let dataFormatada = dia + '/' + mes + '/' + ano;

document.getElementById('dataAtual').innerHTML = dataFormatada;

let criticidadeTanques = ["ALTO", "MODERADO", "BAIXO", "ALTO"];

document.getElementById("t1").innerHTML = criticidadeTanques[0];
document.getElementById("t2").innerHTML = criticidadeTanques[1];
document.getElementById("t3").innerHTML = criticidadeTanques[2];
document.getElementById("t4").innerHTML = criticidadeTanques[3];