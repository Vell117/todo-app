// Создание package.json. npm init
// Установка express и mongoose. npm install express mongoose
// Установка nodemon. npm i -D nodemon
// Для запуска сервера. npm run dev 
// Подключаем кастомный движок для HTML. npm i express-handlebars 

// Входной файл в приложение 
// Подключаем express
const express = require('express');

// Подключаем базу MongoDB (пакет mongoose)
const mongoose = require('mongoose');

// Модуль для работы с путями к файлам
const path = require('path');

// Подключаем движок для HTML 
const exphbs = require('express-handlebars');

// Подключаем написанные роуты
const todoRoutes = require('./routes/todos');

// Создаем константу для порта
// Если есть системная переменная порт, то используем её
// если нет, то ставим порт 3000
const PORT = process.env.PORT || 3000;

// Создаем объект приложения
const app = express();

// Настраиваем пакет express-handlebars
// Создаем метод для настройки конфигурации "шаблонизатора"
const hbs = exphbs.create({
    // Пишем опции
    defaultLayout: 'main',
    extname: 'hbs'
})

// Регистрируем ключ engine от переменной hbs в express,
// первый параметр - название, второй - значение
app.engine('hbs', hbs.engine);

// Переходим к использованию и установке по умолчанию hbs
app.set('view engine', 'hbs');

// Регистрируем папку, где буду храниться все виды сайта
app.set('views', 'views');

// Задаем логику для парсинга введенной инфы пользователем
// используем urlencoded, чтобы считывать body 
app.use(express.urlencoded({extended: true}))

// Для распознавания пути к файлу с стилями
app.use(express.static(path.join(__dirname, 'public')));

// Регистрируем роут из нашего файла todos
app.use(todoRoutes);

// Создаем асинхронную функцию 
async function start() {
    // Отлавливаем ошибки
    try {
        // Подключаемся к БД
        // первый параметр пукт к БД, второй - объект конфигурации
        // по идее лучше путь поместить в конфиг, чтобы не показывать пароль к БД
        await mongoose.connect('mongodb+srv://vell:090302@cluster0.abi20.mongodb.net/todos', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        // Если подключиться БД, запускаем сервер 
        // Начинаем слушать и пишем колбэк
            app.listen(PORT, () => {
            console.log('Server has been started');
})
    } catch (e) {
      // Вывод ошибки
      console.log(e);
    }
}

// Чтобы всё работало вызываем функцию start
start();
