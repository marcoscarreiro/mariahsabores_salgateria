document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme');
    const body = document.body;

    // Função para salvar o tema no localStorage
    const saveTheme = (isDark) => {
        localStorage.setItem('dark-mode', isDark);
    };

    // Função para carregar o tema salvo
    const loadTheme = () => {
        const isDark = localStorage.getItem('dark-mode') === 'true';
        if (isDark) {
            body.classList.add('dark-mode');
            themeToggle.checked = true;
        }
    };

    // Carrega o tema ao abrir a página
    loadTheme();

    // Evento para alternar o tema quando o botão é clicado
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.add('dark-mode');
            saveTheme(true);
        } else {
            body.classList.remove('dark-mode');
            saveTheme(false);
        }
    });
});