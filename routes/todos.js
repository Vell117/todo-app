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
    //const todos = await Todo.find({});
    const todos = await Todo.find({}).lean()
    
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

// Пишем обработку Post запроса для нажатия кнопки Create (для создания todo)
router.post('/create', async(req, res) =>{
    // Создаём новый объект todo
    const todo = new Todo({
        // Передаём поле, которое получаем с введенного в браузере
        title: req.body.title
    })

    // Сохраняем написанную модель
    await todo.save();
    // Пишем редирект на главную страницу
    res.redirect('/');
})

// Пишем новый обработик для изменений состояния выполнения задач
router.post('/complete', async(req, res) =>{
    // Создаём переменную для определения Id todo с которым работаем
    const todo = await Todo.findById(req.body.id);

    // Указываем, что меняем в конкретном todo, преобразовываем к bool с пом. !!
    todo.completed = !!req.body.completed;
    // Сохраняем изменения
    await todo.save();
    // Обмновляем страницу
    res.redirect('/');
})
// экспортируем роутер из этого файла 
module.exports = router;

