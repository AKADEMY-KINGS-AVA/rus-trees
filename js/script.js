// js/script.js
document.addEventListener('DOMContentLoaded', function() {

    // Проверяем, есть ли уже кнопки на странице (чтобы не создавать дубликаты)
    if (document.querySelector('.buttons')) {
        return; // Кнопки уже есть, ничего не делаем
    }

    // СОЗДАЁМ КНОПКИ АВТОМАТИЧЕСКИ
    const buttonsHTML = `
        <div class="buttons">
            <button id="but_news">
                <img src="assets/news.png" alt="Новости" width="25" height="25">
            </button>
            <button id="but_tree">
                <img src="assets/tree.png" alt="Деревья" width="35" height="35">
            </button>
            <button id="but_prises">
                <img src="assets/prises.png" alt="Цены" width="25" height="25">
            </button>
        </div>
    `;

    // Вставляем кнопки в начало body
    document.body.insertAdjacentHTML('afterbegin', buttonsHTML);

    // Теперь добавляем обработчики на кнопки
    const newsButton = document.getElementById('but_news');
    const treeButton = document.getElementById('but_tree');
    const prisesButton = document.getElementById('but_prises');

    if (newsButton) {
        newsButton.addEventListener('click', function() {
            window.location.href = 'news.html';
        });
    }

    if (treeButton) {
        treeButton.addEventListener('click', function() {
            // Если мы уже на главной - показываем сообщение
            if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/rus-trees/')) {
                alert('🌳 Вы уже на главной странице');
            } else {
                window.location.href = 'index.html';
            }
        });
    }

    if (prisesButton) {
        prisesButton.addEventListener('click', function() {
            window.location.href = 'prices.html';
        });
    }

});