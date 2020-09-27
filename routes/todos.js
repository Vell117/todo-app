// В этом файле будем писать роуты
// Подключаем из библиотеки Express
const {Router} = require('express');

// Подключаем написанную нами подель Todo 
const Todo = require('../models/Todo');

// Создаём переменную router из функции Router
const router = Router();

// Обращаемся к роутеру, чтобы обрабатывать get запросы
// Пишем асинхронно, т.к будем делать запрос к БД
router.get('/', async (req, res) => {
    // Получаем массив всех todos
    const todos = await Todo.find({});

    // Ответ пользователю
    res.render('index', {
        //Название вкладки
        title: 'Todos list',
        //Подсветка 
        isIndex: true,
        // Передаём массив todos как параметр для отображения на странице
        todos
    });
})

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create todo',
        isCreate: true
    });
})

// экспортируем роутер из этого файла 
module.exports = router;

