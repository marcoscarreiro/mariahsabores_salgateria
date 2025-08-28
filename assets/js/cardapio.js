document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os links da navegação de categorias
    const navLinks = document.querySelectorAll('#navbar-cardapio a');
    
    // Seleciona todas as seções de cards
    const cardSections = document.querySelectorAll('.card-secao');
    
    // Adiciona um evento de clique para cada link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que a página recarregue
            
            // Obtém o ID da seção do atributo href do link (ex: '#salgados')
            const secaoAlvoId = link.getAttribute('href');
            
            // Oculta todas as seções de cards
            cardSections.forEach(secao => {
                secao.style.display = 'none';
            });
            
            // Exibe a seção correspondente ao link clicado
            const secaoAlvo = document.querySelector(secaoAlvoId);
            if (secaoAlvo) {
                secaoAlvo.style.display = 'flex'; // ou 'block' se preferir
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os links da navegação de categorias
    const navLinks = document.querySelectorAll('#navbar-cardapio a');
    
    // Seleciona todas as seções de cards
    const cardSections = document.querySelectorAll('.card-secao');
    
    // Função para mostrar a seção Salgados por padrão ao carregar a página
    function showDefaultSection() {
        const defaultSection = document.querySelector('#secao-salgados');
        if (defaultSection) {
            defaultSection.style.display = 'flex';
        }
    }

    // Adiciona um evento de clique para cada link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que a página recarregue
            
            // Obtém o ID da seção do atributo href do link
            const secaoAlvoId = link.getAttribute('href');
            
            // Oculta todas as seções de cards
            cardSections.forEach(secao => {
                secao.style.display = 'none';
            });
            
            // Exibe a seção correspondente ao link clicado
            const secaoAlvo = document.querySelector(secaoAlvoId);
            if (secaoAlvo) {
                secaoAlvo.style.display = 'flex';
            }
        });
    });

    // Chama a função para exibir a seção padrão ao carregar a página
    showDefaultSection();

    // Adiciona a funcionalidade de aumentar e diminuir a quantidade nos cards
    const quantidadeContainers = document.querySelectorAll('.card-quantidade');

    quantidadeContainers.forEach(container => {
        const diminuirBtn = container.querySelector('.diminuir-btn');
        const aumentarBtn = container.querySelector('.aumentar-btn');
        const quantidadeSpan = container.querySelector('.quantidade-num');

        diminuirBtn.addEventListener('click', () => {
            let quantidade = parseInt(quantidadeSpan.textContent);
            if (quantidade > 1) {
                quantidade--;
                quantidadeSpan.textContent = quantidade;
            }
        });

        aumentarBtn.addEventListener('click', () => {
            let quantidade = parseInt(quantidadeSpan.textContent);
            quantidade++;
            quantidadeSpan.textContent = quantidade;
        });
    });
});

