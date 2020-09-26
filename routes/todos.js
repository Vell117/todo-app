// В этом файле будем писать роуты
// Подключаем из библиотеки Express
const {Router} = require('express');

// Создаём переменную router из функции Router
const router = Router();

// Обращаемся к роутеру, чтобы обрабатывать get запросы
router.get('/', (req, res) => {
    // Ответ пользователю
    res.render('index');
})

// экспортируем роутер из этого файла 
module.exports = router;

