import express from 'express'
import controller from '../controllers/todos'

const router = express.Router()

router.get('/todos', controller.getTodos)
router.get('/todos/:id', controller.getTodo)
router.patch('/todos/:id', controller.updateTodo)
router.delete('/todos/:id', controller.deleteTodo)
router.post('/todos', controller.createTodo)

export = router