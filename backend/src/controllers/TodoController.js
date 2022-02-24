const Todo = require('../models/todo')
const {handleTodoErrors, setWorkTime} = require('../config/utils')

const create = async (req, res, next) => {
    try {
        const todo = {...req.body}
        await Todo.create(todo);
        return res.status(200).json({message: 'Tarefa cadastrada com sucesso'})
    } catch (e) {
        return handleTodoErrors(e, req, res)
    }
}

const edit = async (req, res, next) => {
    const {id} = req.params;

    try {
        let todoEdit = await Todo.findById(id)
        let todo = {...req.body}
        if (todoEdit) {
            if (todoEdit.workTime) {
                todo.workTime = todoEdit.workTime
            }
            todo.createdAt = todoEdit.createdAt
            if (todoEdit.startedAt !== undefined && todo.done) {
                setWorkTime(todo, todoEdit.startedAt)
            }
            await Todo.findOneAndUpdate({_id: id}, todo, {overwrite: true})
            return res.status(200).json({message: 'Tarefa editada com sucesso'})
        } else {
            return res.status(404).json({message: 'Tarefa não existe'})
        }
    } catch (e) {
        if (e.path === '_id') {
            return res.status(404).json({message: 'Tarefa não existe'})
        }
        return handleTodoErrors(e, req, res)
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
        return res.json(todos)
    } catch (e) {
        return res.status(400).json({message: 'Ocorreu algum erro ao buscar as tarefas'})
    }
}

const getById = async (req, res, next) => {
    const {id} = req.params;

    try {
        const todo = await Todo.findById(id);
        if (todo) {
            return res.json(todo)
        } else {
            return res.status(404).json({message: 'Tarefa não existe'})
        }
    } catch (e) {
        return res.status(400).json({message: 'Não foi possível buscar tarefa'})
    }
}

const remove = async (req, res, next) => {
    const {id} = req.params;

    try {
        if (await Todo.findById(id)) {
            await Todo.findByIdAndRemove(id)
            return res.status(200).json({message: 'Tarefa excluída do sistema'})
        } else {
            return res.status(404).send({message: 'Tarefa não existe'});
        }
    } catch (e) {
        return res.status(400).send({message: 'Não foi possível remover a tarefa'});
    }
}

const startDoing = async (req, res, next) => {
    const {id} = req.params;

    try {
        const todo = await Todo.findById(id)
        if (!todo) {
            return res.status(404).send({message: 'Tarefa não existe'});
        }
        if (todo.done) {
            return res.status(400).json({message: 'Tarefa concluída. Não é possível iniciar'})
        }
        if (todo.startedAt !== undefined) {
            return res.status(400).json({message: 'Tarefa já está em execução'})
        } else {
            todo.startedAt = Date.now()
            todo.save();
            return res.status(200).json({message: 'Tarefa iniciada. Tempo está sendo contabilizado'})
        }
    } catch (e) {
        return res.status(400).json({message: 'Não foi possível iniciar execução de tarefa'})
    }
}

const finishDoing = async (req, res, next) => {
    const {id} = req.params;

    try {
        const todo = await Todo.findById(id)
        if (!todo) {
            return res.status(404).send({message: 'Tarefa não existe'});
        }
        if (todo.startedAt !== undefined) {
            setWorkTime(todo, todo.startedAt)
            todo.save()
            return res.status(200).json({message: 'Tarefa com execução finalizada'})
        } else {
            return res.status(400).json({message: 'Tarefa não está em execução'})
        }
    } catch (e) {
        return res.status(400).json({message: 'Não foi possível finalizar execução de tarefa'})
    }
}

const done = async (req, res, next) => {
    const {id} = req.params;

    try {
        const todo = await Todo.findById(id)
        if (!todo) {
            return res.status(404).send({message: 'Tarefa não existe'});
        }
        todo.done = !todo.done
        if (todo.startedAt !== undefined && todo.done) {
            setWorkTime(todo, todo.startedAt)
        }
        todo.save()
        return res.status(200).json({message: 'Tarefa marcada como ' + (todo.done ? 'concluída' : 'pendente')})
    } catch (e) {
        return res.status(400).json({message: 'Não foi possível mudar status da tarefa'})
    }
}

module.exports = {create, index, remove, edit, getById, startDoing, finishDoing, done}
