    // dash tanque 1
const ctx1 = document.getElementById('linhaTanque1').getContext('2d');
const linhaTanque1 = new Chart(ctx1, {
      type: 'line',
      data: {
        labels: ['a', 'b', 'c'],
        datasets: [{
          label: 'Temperatura',
          data: [20, 25, 28, 30],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: false,
          tension: 0.0
        }]
      },
      options: {
       responsive: true,
       maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Temperatura'
          },
          legend: {
            position: 'bottom'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // dash tanque 2
const ctx2 = document.getElementById('linhaTanque2').getContext('2d')
const linhaTanque2 = new Chart (ctx2, {
    type: 'line',
    data: {
        labels: ['a', 'b', 'c'],
        datasets: [{
            label: 'Temperatura ',
            data: [20, 25, 28, 30],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: false,
            tension: 0.0
        }]
    },
    options: {
       responsive: true,
       maintainAspectRatio: false,
        plugins:{
            title:{
                display: true,
                text: 'Tanque 2'
            },
            legend: {
                position: 'bottom'
            }
        },
        scales: {
            y:{
                beginAtZero: true
            }
        }
    }
})

// tanque 3

const ctx3 = document.getElementById('linhaTanque3').getContext('2d')
const linhaTanque3 = new Chart (ctx3, {
    type: 'line',
    data: {
        labels: ['a', 'b', 'c'],
        datasets: [{
            label: 'Temperatura ',
            data: [20, 25, 28, 30],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: false,
            tension: 0.0
        }]
    },
    options: {
       responsive: true,
       maintainAspectRatio: false,
        plugins:{
            title:{
                display: true,
                text: 'Tanque 3'
            },
            legend: {
                position: 'bottom'
            }
        },
        scales: {
            y:{
                beginAtZero: true
            }
        }
    }
})

// tanque linha 4

const ctx4 = document.getElementById('linhaTanque4').getContext('2d')
const linhaTanque4 = new Chart (ctx4, {
    type: 'line',
    data: {
        labels: ['a', 'b', 'c'],
        datasets: [{
            label: 'Temperatura ',
            data: [20, 25, 28, 30],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: false,
            tension: 0.0
        }]
    },
    options: {
       responsive: true,
       maintainAspectRatio: false,
        plugins:{
            title:{
                display: true,
                text: 'Tanque 4'
            },
            legend: {
                position: 'bottom'
            }
        },
        scales: {
            y:{
                beginAtZero: true
            }
        }
    }
})