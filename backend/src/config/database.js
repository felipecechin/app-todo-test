const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect('mongodb+srv://felipe:felipe@cluster0-nafag.mongodb.net/todo_test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(function () {
    console.log('Mongo DB Conectado')
});
