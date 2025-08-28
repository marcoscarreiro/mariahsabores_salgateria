let salgadosCardapio = JSON.parse(localStorage.getItem('salgadosCardapio')) || [
    {
        foto: '../img/img_cardapio/',
        nome: 'Coxinha de Frango',
        ingredientes: ['Massa de trigo', 'Frango desfiado', 'Catupiry original', 'Temperos especiais'],
        valor: 6.50
    },
    {
        foto: '../img/img_cardapio/',
        nome: 'Risole de Carne',
        ingredientes: ['Massa de pastel', 'Carne moída refogada', 'Azeitonas', 'Queijo'],
        valor: 6.00
    },
    {
        foto: '../img/img_cardapio/',
        nome: 'Quibe Tradicional',
        ingredientes: ['Carne moída magra', 'Trigo para quibe', 'Hortelã fresca'],
        valor: 5.50
    },
    {
        foto: '../img/img_cardapio/',
        nome: 'Bolinha de Queijo',
        ingredientes: ['Massa de batata', 'Queijo muçarela', 'Orégano'],
        valor: 5.00
    },
    {
        foto: '../img/img_cardapio/',
        nome: 'Empada de Palmito',
        ingredientes: ['Massa de empada', 'Creme de palmito', 'Cheiro-verde'],
        valor: 7.00
    },
    {
        foto: '../img/img_cardapio/',
        nome: 'Esfiha de Calabresa',
        ingredientes: ['Massa fofinha', 'Calabresa moída', 'Queijo', 'Cebola'],
        valor: 7.50
    },
    {
        foto: '../img/img_cardapio/',
        nome: 'Enroladinho de Salsicha',
        ingredientes: ['Massa de pão', 'Salsicha de alta qualidade', 'Toque de molho'],
        valor: 4.50
    },
    {
        foto: '../img/img_cardapio/',
        nome: 'Croquete de Carne',
        ingredientes: ['Massa de batata', 'Carne cozida e desfiada', 'Especiarias'],
        valor: 6.00
    }
];