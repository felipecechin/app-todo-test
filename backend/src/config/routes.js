const express = require('express')
const TodoController = require('../controllers/TodoController')

module.exports = function (server) {
    const router = express.Router()
    server.use('/api', router)

    router.get('/todo', TodoController.index)
}
