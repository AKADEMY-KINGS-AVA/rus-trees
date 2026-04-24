// ========== СПОСОБ 1: Самый правильный и современный ==========
// Ждём полной загрузки HTML перед тем, как искать кнопки
document.addEventListener('DOMContentLoaded', function() {

    // Находим кнопки по их ID
    const newsButton = document.getElementById('but_news');
    const treeButton = document.getElementById('but_tree');
    const prisesButton = document.getElementById('but_prises');

    // Добавляем слушатели событий
    newsButton.addEventListener('click', function() {
        console.log('Нажата кнопка НОВОСТИ');
        alert('Вы открыли новости!');
        // Здесь можно добавить свой код
    });

    treeButton.addEventListener('click', function() {
        console.log('Нажата кнопка ДЕРЕВЬЯ');
        alert('Вы открыли деревья!');
        // Здесь можно добавить свой код
    });

    prisesButton.addEventListener('click', function() {
        console.log('Нажата кнопка ЦЕНЫ');
        alert('Вы открыли цены!');
        // Здесь можно добавить свой код
    });

});