document.addEventListener('DOMContentLoaded', function() {

    const newsButton = document.getElementById('but_news');
    const treeButton = document.getElementById('but_tree');
    const prisesButton = document.getElementById('but_prises');

    // Переход на страницу новостей
    if (newsButton) {
        newsButton.addEventListener('click', function() {
            window.location.href = 'pages/news.html';
        });
    }

    // Деревья — оставляем на главной (или может быть своя страница)
    if (treeButton) {
        treeButton.addEventListener('click', function() {
            // Показываем "Секция в разработке"
            alert('🌳 Секция "Деревья" в разработке');
        });
    }

    // Переход на страницу цен
    if (prisesButton) {
        prisesButton.addEventListener('click', function() {
            window.location.href = 'pages/prices.html';
        });
    }

});