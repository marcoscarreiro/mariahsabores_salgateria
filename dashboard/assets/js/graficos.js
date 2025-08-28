const ctx = document.getElementById('myChart');

new Chart(
    ctx, {
    type: 'bar',
    data: {
        labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'],
        datasets: [{
            label: '',
            data: [12, 19, 3, 5, 2, 3, 18],
            backgroundColor: 'rgba(78, 139, 184, 0.8)',
            borderColor: 'rgba(110, 173, 209, 1)',
            borderWidth: 1,

        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const ctx2 = document.getElementById('myChart2');
new Chart(
    ctx2, {
    type: 'doughnut',
    data: {
        labels: [
            'Coxinha',
            'Bauru',
            'Kibe',
            'Kibe1'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100, 60],
            borderColor: 'rgba(78, 139, 184, 0.5)',
            backgroundColor: [
                'rgb(0, 36, 64)',
                'rgb(19, 71, 113)',
                'rgb(51, 110, 166)',
                'rgb(78, 139, 184)',
                'rgb(110, 173, 209)',
                'rgb(159, 202, 228)'
            ],
            hoverOffset: 4,
            borderWidth: 2
        }]
    }
}
)