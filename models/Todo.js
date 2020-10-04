// Подключаем пакет mongoose, и объект Schema
const {Schema, model} = require('mongoose');

// Передаем в конструктор объект конфигурации для модели
const schema = new Schema({
    // Пишем параметры для каждого todo
    title: {
        type: String, 
        required: true
    }, 
    completed: {
        type: Boolean,
        // Пишем по умолчанию false т.к, если мы только создали todo, то она ещё не завершина
        default: false
    }
})

// Экспортируем функцию model 
module.exports = model('Todo', schema); 