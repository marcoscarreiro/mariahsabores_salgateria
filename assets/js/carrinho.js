document.addEventListener('DOMContentLoaded', () => {

    const navLinks = document.querySelectorAll('#navbar-cardapio a');
    const cardSections = document.querySelectorAll('.card-secao');


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


    const addTitles = () => {
        const titles = {
            'secao-salgados': 'Salgados',
            'secao-bebidas': 'Bebidas',
            'secao-veganos': 'Veganos'
        };

        cardSections.forEach(secao => {
            const secaoId = secao.id;
            if (!secao.querySelector('h2')) {
                const h2 = document.createElement('h2');
                h2.textContent = titles[secaoId];
                secao.prepend(h2);
            }
        });
    };


    const removeTitles = () => {
        cardSections.forEach(secao => {
            const h2 = secao.querySelector('h2');
            if (h2) {
                h2.remove();
            }
        });
    };


    const showProducts = (category) => {
        cardSections.forEach(secao => {
            secao.style.display = 'none';
        });

        if (category === 'todos') {
            removeTitles();
            addTitles();
            cardSections.forEach(secao => {
                secao.style.display = 'flex';
            });
        } else {
            removeTitles();
            const secaoAlvo = document.querySelector(`#secao-${category}`);
            if (secaoAlvo) {
                secaoAlvo.style.display = 'flex';
            }
        }
    };

    // Define a classe 'active' para o link clicado e remove dos outros
    const setActiveLink = (clickedLink) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        clickedLink.classList.add('active');
    };

    // Adiciona o evento de clique a cada link de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('href').replace('#secao-', '');
            showProducts(category);
            setActiveLink(link);
        });
    });

    // Exibe a aba "Todos os Produtos" por padrão ao carregar a página
    const defaultLink = document.querySelector('a[href="#secao-todos"]');
    if (defaultLink) {
        defaultLink.click();
    }
    // Código do cardapio.js termina aqui

    //--CÓDIGO DO CARRINHO COMEÇA AQUI--
    const abrirCarrinhoBtn = document.getElementById('abrir-carrinho');
    const fecharCarrinhoBtn = document.getElementById('fechar-carrinho');
    const carrinhoModal = document.getElementById('carrinho-modal');
    const adicionarBotoes = document.querySelectorAll('.adicionar-carrinho');
    const listaCarrinho = document.getElementById('lista-carrinho');
    const totalCarrinhoSpan = document.getElementById('total-carrinho');

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    renderizarCarrinho();
    function atualizarTotal() {
        let total = 0;
        carrinho.forEach(item => {
            total += item.preco * item.quantidade;
        });
        totalCarrinhoSpan.textContent = total.toFixed(2);
    }

    function renderizarCarrinho() {
        listaCarrinho.innerHTML = '';
        carrinho.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('carrinho-item');
            li.innerHTML = `
                <div class="carrinho-item-info">
                    <h4>${item.nome}</h4>
                    <p>Preço: R$ ${item.preco.toFixed(2)} - Quantidade: ${item.quantidade}</p>
                </div>
                <div class="carrinho-item-botoes">
                    <button class="aumentar-carrinho-btn" data-nome="${item.nome}">+</button>
                    <button class="diminuir-carrinho-btn" data-nome="${item.nome}">-</button>
                    <button class="remover-carrinho-btn" data-nome="${item.nome}">Remover</button>
                </div>
            `;
            listaCarrinho.appendChild(li);
        });
        atualizarTotal();

        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }

    function adicionarAoCarrinho(produto, quantidadeAdicionar) {
        const itemExistente = carrinho.find(item => item.nome === produto.nome);
        if (itemExistente) {
            // Se o item já existe, adicione a quantidade selecionada.
            itemExistente.quantidade += quantidadeAdicionar;
        } else {
            // Se o item não existe, adicione com a quantidade selecionada.
            carrinho.push({ ...produto, quantidade: quantidadeAdicionar });
        }
        renderizarCarrinho();
    }

    const avisoCompra = document.getElementById('aviso-compra');
    avisoCompra.style.display = "none";


    adicionarBotoes.forEach(botao => {
        botao.addEventListener('click', (evento) => {
            const cardItem = evento.target.closest('.card-item');
            const nomeProduto = cardItem.querySelector('h3').textContent;
            const precoProdutoTexto = cardItem.querySelector('.card-preco').textContent;
            const precoProduto = parseFloat(precoProdutoTexto.replace('R$ ', '').replace(',', '.'));
            const quantidadeSelecionada = parseInt(cardItem.querySelector('.quantidade-num').textContent);
            avisoCompra.style.display = "block";
            setTimeout(() => {                
                avisoCompra.style.display = "none";
            }, 2000);
            const produto = {
                nome: nomeProduto,
                preco: precoProduto
            };
            adicionarAoCarrinho(produto, quantidadeSelecionada);
        });
    });





    listaCarrinho.addEventListener('click', (evento) => {
        const nomeProduto = evento.target.dataset.nome;
        const item = carrinho.find(i => i.nome === nomeProduto);

        if (!item) return;

        if (evento.target.classList.contains('aumentar-carrinho-btn')) {
            item.quantidade++;
        } else if (evento.target.classList.contains('diminuir-carrinho-btn')) {
            item.quantidade--;
            if (item.quantidade <= 0) {
                carrinho = carrinho.filter(i => i.nome !== nomeProduto);
            }
        } else if (evento.target.classList.contains('remover-carrinho-btn')) {
            carrinho = carrinho.filter(i => i.nome !== nomeProduto);
        }

        renderizarCarrinho();
    });

    // Event listener para abrir o modal
    if (abrirCarrinhoBtn) {
        abrirCarrinhoBtn.addEventListener('click', (event) => {
            event.preventDefault();
            carrinhoModal.classList.remove('carrinho-oculto');
        });
    }

    // Event listener para fechar o modal
    if (fecharCarrinhoBtn) {
        fecharCarrinhoBtn.addEventListener('click', () => {
            carrinhoModal.classList.add('carrinho-oculto');
        });
    }

    // Evento para fechar o modal clicando fora dele
    window.addEventListener('click', (event) => {
        if (event.target === carrinhoModal) {
            carrinhoModal.classList.add('carrinho-oculto');
        }
    });

    const finalizarCompraBtn = document.getElementById('finalizar-compra');
    if (finalizarCompraBtn) {
        finalizarCompraBtn.addEventListener('click', () => {
            if (carrinho.length > 0) {
                alert('Compra finalizada! Total: R$ ' + totalCarrinhoSpan.textContent);
                carrinho = [];
                renderizarCarrinho();
                carrinhoModal.classList.add('carrinho-oculto');
            } else {
                alert('Seu carrinho está vazio!');
            }
        });
    }
});

