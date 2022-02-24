const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    description: {type: String, required: [true, 'Por favor, informe a descrição da tarefa']},
    done: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},
    startedAt: {type: Date},
    workTime: {type: Number}
}, {
    versionKey: false
})

todoSchema.pre('findOneAndUpdate', function (next) {
    this.options.runValidators = true;
    next();
});

module.exports = mongoose.model('Todo', todoSchema)
