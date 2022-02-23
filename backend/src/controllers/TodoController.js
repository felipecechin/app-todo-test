const Todo = require('../models/todo')

const create = async (req, res, next) => {
    try {
        const todo = {...req.body}
        await Todo.create(todo);
        res.status(200).json({message: 'Tarefa cadastrada com sucesso.'})
    } catch (e) {
        res.status(400).json({message: e})
    }
}

const edit = async (req, res, next) => {
    const {id} = req.params;

    try {
        let todo = {...req.body}
        await Todo.findOneAndUpdate({_id: id}, todo)
        res.status(200).json({message: 'Tarefa editada com sucesso.'})
    } catch (e) {
        res.status(400).json({message: e})
    }
}

const index = async (req, res, next) => {
    const resPerPage = 10;
    const page = req.query.page || 1;
    try {
        const todos = await Todo.find()
            .sort({"createdAt": 'desc'})
            .skip((resPerPage * page) - resPerPage)
            .limit(resPerPage);
        const numOfRecords = await Todo.count();
        res.set("x-total-count", numOfRecords);
        res.json(todos)
    } catch (e) {
        res.status(400).json({message: e})
    }
}

const getById = async (req, res, next) => {
    const {id} = req.params;

    try {
        const todo = await Todo.findById(id);
        return res.json(todo)
    } catch (e) {
        res.status(400).json({message: e})
    }
}

const remove = async (req, res, next) => {
    const {id} = req.params;

    Todo.deleteOne({_id: id}, function (err) {
        if (err) {
            return res.status(400).send({message: err});
        } else {
            return res.status(200).json({message: 'Tarefa excluída do sistema.'})
        }
    })
}

const startDoing = async (req, res, next) => {
    const {id} = req.params;

    try {
        let todo = {...req.body}
        await Todo.findOneAndUpdate({_id: id}, todo)
        res.status(200).json({message: 'Tarefa editada com sucesso.'})
    } catch (e) {
        res.status(400).json({message: e})
    }
}

const finishDoing = async (req, res, next) => {
    const {id} = req.params;

    try {
        let todo = {...req.body}
        await Todo.findOneAndUpdate({_id: id}, todo)
        res.status(200).json({message: 'Tarefa editada com sucesso.'})
    } catch (e) {
        res.status(400).json({message: e})
    }
}

module.exports = {create, index, remove, edit, getById, startDoing, finishDoing}
