document.addEventListener('DOMContentLoaded', () => {

    const navLinks = document.querySelectorAll('#navbar-cardapio a');
    const cardSections = document.querySelectorAll('.card-secao');

    const quantidadeContainers = document.querySelectorAll('.card-quantidade');

    quantidadeContainers.forEach(container => {
        const diminuirBtn = container.querySelector('.diminuir-btn');
        const aumentarBtn = container.querySelector('.aumentar-btn');
        const quantidadeSpan = container.querySelector('.quantidade-num');

        diminuirBtn.addEventListener('click', () => {
            let quantidade = parseInt(quantidadeSpan.textContent, 10);
            if (quantidade > 1) {
                quantidade--;
                quantidadeSpan.textContent = quantidade;
            }
        });

        aumentarBtn.addEventListener('click', () => {
            let quantidade = parseInt(quantidadeSpan.textContent, 10);
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

    const setActiveLink = (clickedLink) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        clickedLink.classList.add('active');
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('href').replace('#secao-', '');
            showProducts(category);
            setActiveLink(link);
        });
    });

    const defaultLink = document.querySelector('a[href="#secao-todos"]');
    if (defaultLink) {
        defaultLink.click();
    }

    const abrirCarrinhoBtn = document.getElementById('abrir-carrinho');
    const fecharCarrinhoBtn = document.getElementById('fechar-carrinho');
    const carrinhoModal = document.getElementById('carrinho-modal');
    const adicionarBotoes = document.querySelectorAll('.adicionar-carrinho');
    const listaCarrinho = document.getElementById('lista-carrinho');
    const totalCarrinhoSpan = document.getElementById('total-carrinho');

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

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

    renderizarCarrinho();

    function adicionarAoCarrinho(produto, quantidadeAdicionar) {
        const itemExistente = carrinho.find(item => item.nome === produto.nome);
        if (itemExistente) {
            itemExistente.quantidade += quantidadeAdicionar;
        } else {
            carrinho.push({ ...produto, quantidade: quantidadeAdicionar });
        }
        renderizarCarrinho();
    }

    const avisoCompra = document.getElementById('aviso-compra');
    if (avisoCompra) {
        avisoCompra.style.display = 'none';
    }

    // Função reutilizável para mostrar a popup de aviso
    function mostrarAviso(mensagem) {
        if (!avisoCompra) return;
        const p = avisoCompra.querySelector('p');
        if (p) p.textContent = mensagem;
        avisoCompra.style.display = 'flex';
        setTimeout(() => {
            avisoCompra.style.display = 'none';
            if (p) p.textContent = 'Produto inserido com sucesso!';
        }, 2000);
    }

    adicionarBotoes.forEach(botao => {
        botao.addEventListener('click', (evento) => {
            const cardItem = evento.target.closest('.card-item');
            if (!cardItem) return;
            const nomeProduto = cardItem.querySelector('h3').textContent;
            const precoProdutoTexto = cardItem.querySelector('.card-preco').textContent;
            const precoProduto = parseFloat(precoProdutoTexto.replace('R$ ', '').replace(',', '.'));
            const quantidadeSelecionada = parseInt(cardItem.querySelector('.quantidade-num').textContent, 10);
            mostrarAviso('Produto inserido com sucesso!');
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
            if (carrinhoModal) carrinhoModal.classList.remove('carrinho-oculto');
        });
    }

    // Event listener para fechar o modal
    if (fecharCarrinhoBtn) {
        fecharCarrinhoBtn.addEventListener('click', () => {
            if (carrinhoModal) carrinhoModal.classList.add('carrinho-oculto');
        });
    }

    // Evento para fechar o modal clicando fora dele
    window.addEventListener('click', (event) => {
        if (event.target === carrinhoModal) {
            carrinhoModal.classList.add('carrinho-oculto');
        }
    });

    // FINALIZAR COMPRA → ABRIR WHATSAPP
    const finalizarCompraBtn = document.getElementById('finalizar-compra');
if (finalizarCompraBtn) {
    finalizarCompraBtn.addEventListener('click', () => {
        if (carrinho.length > 0) {
            const nomeCliente = document.getElementById('nome-cliente').value.trim();
            const enderecoCliente = document.getElementById('endereco-cliente').value.trim();

            if (!nomeCliente || !enderecoCliente) {
                mostrarAviso("Por favor, preencha nome e endereço para finalizar!");
                return;
            }

            let mensagem = "📦 *Novo pedido - Mariah Sabores* %0A%0A";
            
            carrinho.forEach(item => {
                mensagem += `🍴 ${item.nome} - Quantidade: ${item.quantidade} - Preço un.: R$ ${item.preco.toFixed(2)}%0A`;
            });

            mensagem += `%0A💰 *Total: R$ ${totalCarrinhoSpan.textContent}* %0A%0A`;
            mensagem += `👤 Cliente: ${nomeCliente}%0A`;
            mensagem += `📍 Endereço: ${enderecoCliente}%0A%0A`;
            mensagem += "👉 Por favor, confirme meu pedido.";

            const numeroWhatsApp = "5511999631909"; // altere para o número do seu negócio
            const url = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;

            window.open(url, '_blank');

            // Limpa carrinho após abrir o WhatsApp
            carrinho = [];
            renderizarCarrinho();
            if (carrinhoModal) carrinhoModal.classList.add('carrinho-oculto');

            // Limpa inputs
            document.getElementById('nome-cliente').value = '';
            document.getElementById('endereco-cliente').value = '';
        } else {
            mostrarAviso('Seu carrinho está vazio!');
        }
    });
}

    // Handler opcional para botão "Limpar Carrinho" caso exista no HTML
    const limparCarrinhoBtn = document.getElementById('limpar-carrinho');
    if (limparCarrinhoBtn) {
        limparCarrinhoBtn.addEventListener('click', () => {
            if (carrinho.length > 0) {
                carrinho = [];
                renderizarCarrinho();
                mostrarAviso('Carrinho limpo com sucesso!');
            } else {
                mostrarAviso('Seu carrinho já está vazio!');
            }
        });
    }

}); // fecha DOMContentLoaded
