
const ctx3 = document.getElementById('myChart3').getContext('2d');
const myLineChart = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
        datasets: [{
            label: '',
            data: [10, 45, 70, 81, 20, 90],
            borderColor: 'rgba(78, 139, 184, 1)',
            backgroundColor: 'rgba(19, 71, 113, 0.2)',
            borderWidth: 2,
            tension: 0.4 // Smooth curve
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: ''
                }
            },
            y: {
                title: {
                    display: true,
                    text: ''
                },
                beginAtZero: true
            }
        }
    }
});