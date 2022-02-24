const express = require('express')
const TodoController = require('../controllers/TodoController')

module.exports = function (server) {
    const router = express.Router()
    server.use('/api', router)

    router.get('/todo', TodoController.index)
    router.post('/todo', TodoController.create)
    router.put('/todo/:id', TodoController.edit)
    router.get('/todo/:id', TodoController.getById)
    router.delete('/todo/:id', TodoController.remove)
    router.patch('/todo/start/:id', TodoController.startDoing)
    router.patch('/todo/finish/:id', TodoController.finishDoing)
    router.patch('/todo/done/:id', TodoController.done)
}
