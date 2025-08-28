let veganoCardapio = JSON.parse(localStorage.getItem('veganoCardapio')) || [
    {
        foto: 'coxinha-jaca-vegana.jpg',
        nome: 'Coxinha de Jaca',
        ingredientes: ['Massa de mandioca', 'Jaca verde desfiada', 'Tempero caseiro'],
        valor: 7.00
    },
    {
        foto: 'esfiha-lentilha-vegana.jpg',
        nome: 'Esfiha de Lentilha',
        ingredientes: ['Massa fofinha', 'Lentilha refogada', 'Tomate', 'Pimentão'],
        valor: 6.50
    },
    {
        foto: 'quibe-vegano.jpg',
        nome: 'Quibe Vegano de PTS',
        ingredientes: ['Trigo para quibe', 'Proteína de soja', 'Hortelã', 'Limão'],
        valor: 6.00
    },
    {
        foto: 'enroladinho-salsicha-vegana.jpg',
        nome: 'Enroladinho de Salsicha Vegana',
        ingredientes: ['Massa de pão', 'Salsicha de proteína vegetal'],
        valor: 5.50
    },
    {
        foto: 'empada-palmito-vegana.jpg',
        nome: 'Empada de Palmito Vegana',
        ingredientes: ['Massa de empada sem ovo', 'Recheio cremoso de palmito'],
        valor: 7.50
    },
    {
        foto: 'bolinha-queijo-vegano.jpg',
        nome: 'Bolinha de "Queijo" Vegano',
        ingredientes: ['Massa de batata', 'Queijo de castanha', 'Orégano'],
        valor: 6.00
    }
];