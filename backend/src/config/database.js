const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect('BANCO MONGO', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(function () {
    console.log('Mongo DB Conectado')
});
