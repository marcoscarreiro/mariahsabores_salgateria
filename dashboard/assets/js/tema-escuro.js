// Verifica se o tema está salvo no localStorage ao carregar a página
if (localStorage.getItem('tema') === 'escuro') {
    document.body.classList.add('modo-escuro');
}

function alternarTema() {
    const body = document.body;
    body.classList.toggle('modo-escuro');

    // Salva o tema atual no localStorage
    if (body.classList.contains('modo-escuro')) {
        localStorage.setItem('tema', 'escuro');
    } else {
        localStorage.setItem('tema', 'claro');
    }
}